import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function isAdminRequest() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("isAdmin");
  return isAdmin?.value === "true";
}

export async function PUT(req, context) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const contentType = req.headers.get("content-type");

  try {
    const updates = {};

    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const name = formData.get("name")?.toString().trim();
      const message = formData.get("message")?.toString().trim();
      const approved = formData.get("approved")?.toString().trim();
      const imageFile = formData.get("image");

      if (name) updates.name = name;
      if (message) updates.message = message;
      if (approved !== undefined) updates.approved = approved === "true";

      if (imageFile instanceof File && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${imageFile.type};base64,${base64}`;

        const uploadRes = await cloudinary.uploader.upload(dataUrl, {
          folder: "testimonials",
          format: "webp",
        });

        updates.image = uploadRes.secure_url;
      }
    } else if (contentType?.includes("application/json")) {
      const body = await req.json();
      const { name, message, approved } = body;
      if (name) updates.name = name;
      if (message) updates.message = message;
      if (approved !== undefined) updates.approved = approved === true;
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const docRef = db.collection("testimonials").doc(id);
    await docRef.update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await docRef.get();
    return NextResponse.json({ id: docRef.id, ...updatedDoc.data() });
  } catch (err) {
    console.error("Update testimonial error:", err);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const docRef = db.collection("testimonials").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = docSnap.data();

    if (data?.image) {
      const publicId = data.image.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await docRef.delete();
    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (err) {
    console.error("Delete testimonial error:", err);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

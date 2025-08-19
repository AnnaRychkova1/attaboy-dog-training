import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { v2 as cloudinary } from "cloudinary";
import admin from "firebase-admin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const snapshot = await db
      .collection("testimonials")
      .orderBy("createdAt", "desc")
      .get();

    const testimonials = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error("GET testimonials error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim() || "Grateful Customer";
    const message = formData.get("message")?.toString().trim() || "";
    const imageFile = formData.get("image");

    let image =
      "https://res.cloudinary.com/dmzsusenh/image/upload/v1749933067/testimonials/kovryquxwf54srf9d6ix.webp";

    if (
      imageFile instanceof File &&
      imageFile.size > 0 &&
      imageFile.type.startsWith("image/")
    ) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${imageFile.type};base64,${base64}`;

      try {
        const uploadRes = await cloudinary.uploader.upload(dataUrl, {
          folder: "testimonials",
          format: "webp",
          transformation: [{ width: 600, height: 600, crop: "limit" }],
        });

        image = uploadRes.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
      }
    }

    const docRef = await db.collection("testimonials").add({
      name,
      message,
      image,
      approved: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const newTestimonial = await docRef.get();
    return NextResponse.json({ id: docRef.id, ...newTestimonial.data() });
  } catch (err) {
    console.error("POST testimonial error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";

// Supabase client with service role
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Cloudinary config
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
  const { params } = context;
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const contentType = req.headers.get("content-type");
    let updates = {};
    let newImageUrl;

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

        const uploadRes = await cloudinary.uploader.upload(
          `data:${imageFile.type};base64,${base64}`,
          { folder: "testimonials", format: "webp" }
        );

        newImageUrl = uploadRes.secure_url;
        updates.image = newImageUrl;
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

    const { data, error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update/Approve testimonial error", error);
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
  const { params } = context;
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const { data: testimonial, error: fetchError } = await supabase
      .from("testimonials")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    if (testimonial?.image) {
      const publicId = testimonial.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    const { error: deleteError } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

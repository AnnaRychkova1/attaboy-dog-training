import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

// const supabaseUrl = process.env.SUPABASE_URL || "";
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
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

// export async function GET() {
//   try {
//     const { data: testimonials, error } = await supabase
//       .from("testimonials")
//       .select("*")
//       .order("createdAt", { ascending: false });

//     if (error) {
//       console.error("GET testimonials error:", error);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     return NextResponse.json(testimonials);
//   } catch (error) {
//     console.error("GET testimonials error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    console.log("Starting GET /api/testimonials");

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables!");
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      );
    }

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET testimonials Supabase error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    console.log("GET testimonials success:", testimonials.length, "items");
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET testimonials unexpected error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim() || "Grateful Customer";
    const message = formData.get("message")?.toString().trim() || "";
    const imageFile = formData.get("image");

    let image = "https://res.cloudinary.com/demo/image/upload/sample.webp";

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

    const { data: newTestimonial, error } = await supabase
      .from("testimonials")
      .insert({
        name,
        message,
        image,
        approved: false,
      })
      .select()
      .single();

    if (error) {
      console.error("POST testimonial error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function GET() {
  try {
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET contacts error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET contacts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, location, message } = body;

  const { error: dbError } = await supabase
    .from("contacts")
    .insert([{ name, email, phone, location, message, contacted: false }]);

  if (dbError) {
    console.error("Supabase DB error:", dbError.message);
    return NextResponse.json(
      { error: "Failed to save contact form data" },
      { status: 500 }
    );
  }

  try {
    await sendgrid.send({
      to: process.env.SENDGRID_TO,
      from: process.env.SENDGRID_FROM,
      replyTo: email,
      subject: `New message from ${name || "Grateful Customer"}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Location:</strong> ${location || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function GET() {
  try {
    const snapshot = await db
      .collection("contacts")
      .orderBy("createdAt", "desc")
      .get();

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET contacts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, location, message } = body;

  try {
    await db.collection("contacts").add({
      name,
      email,
      phone,
      location,
      message,
      contacted: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New message from Attaboy Dog Training`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" 
                style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <tr style="background:#5f83a6;">
              <td style="padding:20px; width:70px; vertical-align:middle;">
                <img src="https://attaboy-dog-training.vercel.app/logo.png" 
                    alt="Attaboy Dog Training" 
                    width="50" 
                    style="display:block; margin:auto;" />
              </td>
              <td style="padding:20px; text-align:left; vertical-align:middle;">
                <h2 style="color:#fffdee; margin:0; font-size:18px; font-weight:500; text-align:center;">
                  New Message from ${name}
                </h2>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:20px 20px 0 20px; color:#334155; font-size:15px; line-height:1.6;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Location:</strong> ${location || "..."}</p>
                <p><strong>Message:</strong></p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:0 20px 20px 20px;">
                <div style="background:#f1f5f9; padding: 15px; border-radius:8px; font-style:italic; font-size:15px; line-height:1.6; color:#334155;">
                ${message || "..."}
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="background:#f9fafb; padding:15px; text-align:center; color:#64748b; font-size:12px;">
                &copy; ${new Date().getFullYear()} Attaboy Dog Training · 
                <a href="https://attaboy-dog-training.vercel.app" style="color:#1e40af; text-decoration:none;">Visit our website</a>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Thank you for contacting Attaboy Dog Training!`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" 
                style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <tr style="background:#5f83a6;">
              <td style="padding:20px; width:70px; vertical-align:middle;">
                <img src="https://attaboy-dog-training.vercel.app/logo.png" 
                    alt="Attaboy Dog Training" 
                    width="50" 
                    style="display:block; margin:auto;" />
              </td>
              <td style="padding:20px; text-align:left; vertical-align:middle;">
                <h2 style="color:#fffdee; margin:0; font-size:18px; font-weight:500; text-align:center;">
                  We&apos;ve received your message!
                </h2>
              </td>
            </tr>
            <tr >
              <td colspan="2" style="padding:0 20px 20px 20px; color:#334155; font-size:15px; line-height:1.6;">
                <p>Hi ${name || "there"},</p>
                <p>Thank you for reaching out to <strong>Attaboy Dog Training</strong>!</p>
                <p>We&apos;ll get back to you as soon as possible.</p>
                <p>Here&apos;s a copy of your message:</p>
                <blockquote style="border-left:3px solid #ccc; padding-left:10px; margin:15px 0; color:#475569;">
                  ${message}
                </blockquote>
                <p style="margin-top:20px;">Best regards,<br/>Attaboy Dog Training Team 🐾</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="background:#f9fafb; padding:15px; text-align:center; color:#64748b; font-size:12px;">
                &copy; ${new Date().getFullYear()} Attaboy Dog Training · 
                <a href="https://attaboy-dog-training.vercel.app" style="color:#1e40af; text-decoration:none;">Visit our website</a>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json(
      { error: "Failed to save or send emails" },
      { status: 500 }
    );
  }
}

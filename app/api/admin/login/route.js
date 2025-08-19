// import { cookies } from "next/headers";

// export async function POST(req) {
//   const body = await req.json();
//   const { password } = body;

//   if (password === process.env.ADMIN_PASSWORD) {
//     const cookieStore = await cookies();
//     cookieStore.set("isAdmin", "true", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24,
//     });

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   }

//   return new Response(JSON.stringify({ success: false }), { status: 401 });
// }

import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { password } = body;

    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = cookies();
      cookieStore.set("isAdmin", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false }), { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}

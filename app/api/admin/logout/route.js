// import { cookies } from "next/headers";

// export async function POST() {
//   const cookieStore = await cookies();
//   cookieStore.delete("isAdmin");
//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }

import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("isAdmin", { path: "/" });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Logout error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}

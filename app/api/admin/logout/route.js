import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("isAdmin", { path: "/" });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("isAdmin");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

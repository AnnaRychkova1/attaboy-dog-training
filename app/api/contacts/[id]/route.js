import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
    const updates = await req.json();

    const { data, error } = await supabase
      .from("contacts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
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
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = createClient();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    let q = supabase.from("sell_orders").select("*").order("created_at", { ascending: false });
    if (status) q = q.eq("status", status);

    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const body = await req.json();
    const { millet_type, volume_kg, price_per_kg, total_price, image_url } = body;

    // ensure authenticated user from cookies
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const { data, error } = await supabase
      .from("sell_orders")
      .insert([
        {
          millet_type,
          volume_kg,
          price_per_kg,
          total_price,
          user_id: user.id,
          image_url: image_url ?? null,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    // unexpected
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

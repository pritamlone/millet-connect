import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { id } = params;
    const body = await req.json();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    // refuse updates to completed orders
    const { data: existing, error: fetchErr } = await supabase.from('sell_orders').select('status').eq('id', id).single();
    if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    if (existing?.status === 'completed') return NextResponse.json({ error: 'Cannot modify a completed order' }, { status: 400 });

    // Map incoming fields to sell_orders columns
    const updatePayload: any = {};
    if (body.millet_type !== undefined) updatePayload.millet_type = body.millet_type;
    if (body.volume_kg !== undefined) updatePayload.volume_kg = body.volume_kg;
    if (body.price_per_kg !== undefined) updatePayload.price_per_kg = body.price_per_kg;
    if (body.total_price !== undefined) updatePayload.total_price = body.total_price;
    if (body.status !== undefined) updatePayload.status = body.status;

    const { data, error } = await supabase
      .from("sell_orders")
      .update(updatePayload)
      .eq("id", id)
      .eq("user_id", user.id)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient();
    const { id } = params;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    // prevent deleting completed orders
    const { data: existing, error: fetchErr } = await supabase.from('sell_orders').select('status').eq('id', id).single();
    if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    if (existing?.status === 'completed') return NextResponse.json({ error: 'Cannot delete a completed order' }, { status: 400 });

    const { error } = await supabase
      .from("sell_orders")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

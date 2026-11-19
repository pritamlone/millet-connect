"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Package, Tag, Scale, DollarSign, ArrowRight, ShoppingBag, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  product_name: string;
  quantity_kg: number;
  price_per_kg: number;
  total_price: number;
  user_id: string;
  created_at: string;
  status: "pending" | "ongoing" | "completed"; // Assuming a status field
  type: "buy" | "sell"; // To differentiate between buy and sell orders
  delivery_address?: string; // Optional for sell orders, required for buy orders
  payment_method?: "cod" | "upi"; // Optional for sell orders, required for buy orders
}

export default function OrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  const [buyOrders, setBuyOrders] = useState<Order[]>([]); // Placeholder for buy orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

    const normalize = (o: any, kind: "buy" | "sell") => ({
      id: o.id,
      product_name: o.product_name ?? o.millet_type ?? o.name ?? "Untitled Product",
      quantity_kg: Number(o.quantity_kg ?? o.volume_kg ?? 0),
      price_per_kg: Number(o.price_per_kg ?? o.price ?? 0),
      total_price: Number(o.total_price ?? 0),
      user_id: o.user_id,
      created_at: o.created_at ?? new Date().toISOString(),
      status: o.status ?? "pending",
      type: kind,
      delivery_address: o.delivery_address,
      payment_method: o.payment_method,
    } as Order);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      // Fetch sell orders placed by the current user
      const { data: sellData, error: sellError } = await supabase
        .from("sell_orders")
        .select("*")
        .eq("user_id", user.id);

      if (sellError) {
        console.error("Error fetching sell orders:", sellError);
        setError(sellError.message);
      } else if (sellData) {
        setSellOrders(sellData.map((o: any) => normalize(o, "sell")));
      }

      // Fetch buy orders placed by the current user
      const { data: buyData, error: buyError } = await supabase
        .from("buy_orders")
        .select("*")
        .eq("user_id", user.id);

      if (buyError) {
        console.error("Error fetching buy orders:", buyError);
        setError(buyError.message);
      } else if (buyData) {
        setBuyOrders(buyData.map((o: any) => normalize(o, "buy")));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pendingOrders = [...sellOrders, ...buyOrders].filter(order => order.status === "pending");
  const completedOrders = [...sellOrders, ...buyOrders].filter(order => order.status === "completed");
  const activeSellOrders = sellOrders.filter(o => o.status !== "completed");
  const activeBuyOrders = buyOrders.filter(o => o.status !== "completed");

  if (loading) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-primary text-xl">Loading orders...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-primary text-xl text-center">
          Please{' '}
          <Link href="/login" className="font-extrabold text-white bg-primary px-3 py-1 rounded-md underline decoration-white/30">log in</Link>
          {' '}to view your orders, or{' '}
          <Link href="/register" className="font-semibold text-primary underline bg-primary/10 px-2 py-1 rounded-md">create an account</Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
            Your Orders
          </h1>

          {/* Sell Orders Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <span>Your Sell Orders</span>
            </h2>
            {activeSellOrders.length === 0 ? (
              <p className="text-primary/70">You have no active sell orders.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSellOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdated={fetchOrders} currentUserId={user?.id} />
                ))}
              </div>
            )}
          </section>

          {/* Buy Orders Section (Placeholder) */}
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center space-x-3">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span>Your Buy Orders</span>
            </h2>
            {activeBuyOrders.length === 0 ? (
              <p className="text-primary/70">You have no active buy orders.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBuyOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdated={fetchOrders} currentUserId={user?.id} />
                ))}
              </div>
            )}
          </section>

          {/* Ongoing Orders Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center space-x-3">
                <Truck className="h-8 w-8 text-primary" />
                <span>Pending Orders</span>
              </h2>
              {pendingOrders.length === 0 ? (
                <p className="text-primary/70">No orders are currently pending.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onUpdated={fetchOrders} currentUserId={user?.id} />
                  ))}
                </div>
              )}
          </section>

          {/* Completed Orders Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <span>Completed Orders</span>
            </h2>
            {completedOrders.length === 0 ? (
              <p className="text-primary/70">No orders have been completed yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdated={fetchOrders} currentUserId={user?.id} />
                ))}
              </div>
            )}
          </section>

        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

// Basic Order Card Component (can be expanded later)
function OrderCard({ order, onUpdated, currentUserId }: { order: Order; onUpdated?: () => void; currentUserId?: string | null }) {
  const qty = Number(order.quantity_kg) || 0;
  const price = Number(order.price_per_kg) || 0;
  const total = Number(order.total_price) || price * qty;
  const created = order.created_at ? new Date(order.created_at) : new Date();
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(order.product_name);
  const [editQty, setEditQty] = useState<number | string>(order.quantity_kg);
  const [editPrice, setEditPrice] = useState<number | string>(order.price_per_kg);
  const [saving, setSaving] = useState(false);

  const apiBase = order.type === "sell" ? "/api/sell" : "/api/buy";

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: any = {};
      // map common fields
      if (order.type === "sell") {
        payload.millet_type = editProduct;
        payload.volume_kg = parseFloat(String(editQty));
        payload.price_per_kg = parseFloat(String(editPrice));
        payload.total_price = (parseFloat(String(editQty)) || 0) * (parseFloat(String(editPrice)) || 0);
      } else {
        // buy orders mapping
        payload.product_name = editProduct;
        payload.quantity_kg = parseFloat(String(editQty));
        payload.price_per_kg = parseFloat(String(editPrice));
        payload.total_price = (parseFloat(String(editQty)) || 0) * (parseFloat(String(editPrice)) || 0);
      }

      const resp = await fetch(`${apiBase}/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || "Update failed");
      setIsEditing(false);
      onUpdated?.();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update order: " + String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const resp = await fetch(`${apiBase}/${order.id}`, { method: "DELETE", credentials: "same-origin" });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || "Delete failed");
      onUpdated?.();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete order: " + String(err));
    }
  };
  const isCompleted = order.status === 'completed';

  const sellerLabel = order.user_id === currentUserId ? "You" : (order.user_id ? `${order.user_id.slice(0,8)}...` : "Unknown");
  const displayName = order.product_name || (order.type === "sell" ? (order as any).millet_type : "Untitled Product");

  return (
    <div className="bg-oatmeal rounded-3xl overflow-hidden border border-primary/5 shadow-sm p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-primary">{displayName}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          order.type === "sell" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
        }`}>
          {order.type === "sell" ? "Sell Order" : "Buy Order"}
        </span>
      </div>
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full px-3 py-2 rounded-md border"
            value={editProduct}
            onChange={(e) => setEditProduct(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="number"
              className="w-1/2 px-3 py-2 rounded-md border"
              value={String(editQty)}
              onChange={(e) => setEditQty(e.target.value)}
            />
            <input
              type="number"
              className="w-1/2 px-3 py-2 rounded-md border"
              value={String(editPrice)}
              onChange={(e) => setEditPrice(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="px-3 py-2 bg-green-600 text-white rounded-md">{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-2 bg-gray-200 rounded-md">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-primary/70 text-sm mb-2">Volume: {qty} kg</p>
          <p className="text-primary/70 text-sm mb-2">Price/kg: ₹{price.toFixed(2)}</p>
          <p className="text-primary/70 text-sm mb-4">Total: ₹{total.toFixed(2)}</p>
          <div className="flex justify-between items-center text-xs text-primary/60">
            <span>Status: <span className="font-medium capitalize">{order.status}</span></span>
            <span>{created.toLocaleDateString()}</span>
          </div>
          <div className="mt-4 flex gap-2">
            {!isCompleted && (
              <>
                <button onClick={() => setIsEditing(true)} className="px-3 py-2 bg-primary text-oatmeal rounded-md">Edit</button>
                <button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white rounded-md">Cancel Order</button>
              </>
            )}
          </div>
          <div className="mt-3 text-xs text-primary/60">Sold by: <span className="font-medium text-primary">{sellerLabel}</span></div>
        </>
      )}
    </div>
  );
}
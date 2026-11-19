"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Package, Tag, Scale, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function SellPage() {
  const [milletType, setMilletType] = useState("");
  const [customMillet, setCustomMillet] = useState("");
  const [volume, setVolume] = useState<number | string>("");
  const [pricePerKg, setPricePerKg] = useState<number | string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };
    getUser();
  }, [supabase.auth, router]);

  // Revoke object URL when preview changes/unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        try {
          URL.revokeObjectURL(imagePreview);
        } catch (e) {
          // ignore
        }
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const vol = typeof volume === 'string' ? parseFloat(volume) : volume;
    const price = typeof pricePerKg === 'string' ? parseFloat(pricePerKg) : pricePerKg;

    if (!isNaN(vol) && !isNaN(price)) {
      setTotalPrice(vol * price);
    } else {
      setTotalPrice(0);
    }
  }, [volume, pricePerKg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!user) {
      setMessage({ type: "error", text: "You must be logged in to place a sell order." });
      setLoading(false);
      return;
    }

    let imageUrl: string | null = null;

    // Use custom millet value if provided
    const millet_value = milletType === "Other" ? customMillet.trim() : milletType;

      // POST to our server API so the server (cookie-bound Supabase client)
      // performs the insert. This avoids client-side RLS WITH CHECK failures.
      const payload = {
        millet_type: millet_value,
        volume_kg: parseFloat(volume as string),
        price_per_kg: parseFloat(pricePerKg as string),
        total_price: totalPrice,
        image_url: imageUrl,
      };

      // ensure cookies are sent so the server can read the Supabase session
      console.log("posting sell order, user id:", user?.id);

      const resp = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });

      const respJson = await resp.json();
      if (!resp.ok) {
        console.error("Server insert error:", respJson);
        setMessage({ type: "error", text: respJson.error || "Order creation failed" });
        setUploadingImage(false);
        setLoading(false);
        return;
      }

      setMessage({ type: "success", text: "Sell order created successfully." });
  };

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />

      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-oatmeal rounded-3xl shadow-xl border border-primary/10 p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">
            Place Your Sell Order
          </h1>
          <p className="text-center text-primary/70 mb-10 max-w-md mx-auto">
            List your millets for sale on the marketplace. Fill in the details below.
          </p>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-6 text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="milletType" className="block text-sm font-medium text-primary mb-2">
                Millet Type
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                <select
                  id="milletType"
                  className="w-full pl-12 pr-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={milletType}
                  onChange={(e) => setMilletType(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>Select millet type</option>
                  <option value="Pearl Millet (Bajra)">Pearl Millet (Bajra)</option>
                  <option value="Finger Millet (Ragi)">Finger Millet (Ragi)</option>
                  <option value="Foxtail Millet (Kangni)">Foxtail Millet (Kangni)</option>
                  <option value="Barnyard Millet (Sanwa)">Barnyard Millet (Sanwa)</option>
                  <option value="Kodo Millet (Kodua)">Kodo Millet (Kodua)</option>
                  <option value="Little Millet (Kutki)">Little Millet (Kutki)</option>
                  <option value="Proso Millet (Cheena)">Proso Millet (Cheena)</option>
                  <option value="Sorghum (Jowar)">Sorghum (Jowar)</option>
                  <option value="Browntop Millet (Korale)">Browntop Millet (Korale)</option>
                  <option value="Foxtail Millet - Small">Foxtail Millet - Small</option>
                  <option value="Other">Other (specify)</option>
                </select>
              </div>

              {milletType === "Other" && (
                <div className="mt-3">
                  <label htmlFor="customMillet" className="block text-sm font-medium text-primary mb-2">
                    Specify Millet
                  </label>
                  <input
                    id="customMillet"
                    type="text"
                    className="w-full pl-4 pr-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="e.g., Little Finger Millet"
                    value={customMillet}
                    onChange={(e) => setCustomMillet(e.target.value)}
                    required={milletType === "Other"}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="volume" className="block text-sm font-medium text-primary mb-2">
                Volume (in kg)
              </label>
              <div className="relative">
                <Scale className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                <input
                  type="number"
                  id="volume"
                  className="w-full pl-12 pr-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., 100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pricePerKg" className="block text-sm font-medium text-primary mb-2">
                Price per kg (₹)
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                <input
                  type="number"
                  id="pricePerKg"
                  className="w-full pl-12 pr-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., 45"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-primary">Total Price:</span>
              <span className="text-2xl font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* Image upload removed */}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-oatmeal rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-oatmeal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <DollarSign className="h-5 w-5" />
                  <span>Place Sell Order</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

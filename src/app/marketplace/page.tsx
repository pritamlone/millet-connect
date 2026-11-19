"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import { Search, Filter, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const categories = ["All", "Raw Millets", "Processed Flour", "Millet Snacks", "Seeds", "Organic"];

export default function MarketplacePage() {
  const [sellOrders, setSellOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSellOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("sell_orders").select("*");
      if (error) {
        console.error("Error fetching sell orders:", error);
        setError(error.message);
      } else {
        setSellOrders(data || []);
      }
      setLoading(false);
    };
    fetchSellOrders();
  }, [supabase]);

  // Use only sell orders from the database (no demo/static products)
  const allProducts = (sellOrders || []).map((order) => {
    const priceNum = Number(order.price_per_kg ?? order.price ?? 0);
    return {
      id: order.id,
      name: order.millet_type ?? order.name ?? "Untitled Product",
      category: order.category ?? "Sell Order",
      price: isFinite(priceNum) ? priceNum.toFixed(2) : "0.00",
      farmer: order.farmer_name ?? "User",
      location: order.location ?? "",
      rating: 0,
      image: order.image_url ?? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    };
  });

  const handleBuy = (product: any) => {
    const productString = encodeURIComponent(JSON.stringify(product));
    router.push(`/buy/${productString}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-primary text-xl">Loading marketplace...</p>
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
  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Millet Marketplace
          </h1>
          <p className="text-primary/60 max-w-2xl">
            Sourced directly from farmers across India. Authentic, transparent, and nutritious.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
            <input 
              type="text" 
              placeholder="Search for millets, farmers, or locations..."
              className="w-full pl-12 pr-4 py-4 bg-oatmeal rounded-2xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-oatmeal rounded-2xl border border-primary/10 hover:bg-primary/5 transition-colors text-primary font-medium">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-oatmeal rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors font-medium">
            <ShoppingCart className="h-5 w-5" />
            <span>Sell Millets</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                cat === "All" 
                ? "bg-primary text-oatmeal shadow-lg shadow-primary/20" 
                : "bg-oatmeal text-primary/60 border border-primary/10 hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, i) => (
            <ProductCard key={i} {...product} onBuy={() => handleBuy(product)} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 bg-oatmeal border border-primary/10 rounded-full text-primary font-bold hover:bg-primary/5 transition-all">
            Load More Products
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

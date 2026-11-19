"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";
import { Package, Tag, Scale, DollarSign, MapPin, Star, ShoppingCart, ArrowRight } from "lucide-react";

interface Product {
  id: string; // Made required
  name: string;
  category: string;
  price: string;
  farmer: string;
  location: string;
  image: string;
  rating: number;
}

export default function BuyOrderSummaryPage() {
  const router = useRouter();
  const params = useParams();
  const { productId } = params; // This will be the product ID or a serialized product object

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // New state for quantity
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState<number>(0); // New state for calculated total price
  const [deliveryAddress, setDeliveryAddress] = useState(""); // New state for delivery address
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod"); // New state for payment method
  const [step, setStep] = useState(1); // New state for multi-step form
  const supabase = createClient();

  useEffect(() => {
    const fetchProductAndUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const decodedProduct = JSON.parse(decodeURIComponent(productId as string));
        setProduct(decodedProduct);
      } catch (e) {
        setError("Invalid product data.");
        console.error("Error parsing product data:", e);
      }
      setLoading(false);
    };

    fetchProductAndUser();
  }, [productId, router, supabase]);

  useEffect(() => {
    if (product && product.price) {
      setCalculatedTotalPrice(parseFloat(product.price) * quantity);
    }
  }, [quantity, product]);

  const handleNextStep = () => {
    if (step === 1 && quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (step === 2 && !deliveryAddress.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

    const handlePlaceBuyOrder = async () => {
    if (!user) {
      alert("You must be logged in to place a buy order.");
      router.push("/login");
      return;
    }
    if (!product) {
      alert("Product details are missing.");
      return;
    }
    if (quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (!deliveryAddress.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    try {
      console.log("Attempting to place buy order with data:", {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        quantity_kg: quantity,
        price_per_kg: parseFloat(product.price),
        total_price: calculatedTotalPrice,
        user_id: user.id,
        status: "pending",
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
      });

      const { data, error } = await supabase.from("buy_orders").insert([
        {
          product_id: product.id,
          product_name: product.name,
          product_category: product.category,
          quantity_kg: quantity,
          price_per_kg: parseFloat(product.price),
          total_price: calculatedTotalPrice,
          user_id: user.id,
          status: "pending", // Initial status for a new buy order
          delivery_address: deliveryAddress,
          payment_method: paymentMethod,
        },
      ]);

      if (error) {
        console.error("Error placing buy order:", error);
        alert("Failed to place buy order: " + error.message);
      } else {
        console.log("Buy order placed successfully:", data);

        // Update the quantity in the sell_orders table
        const { data: sellOrderData, error: fetchError } = await supabase
          .from("sell_orders")
          .select("volume_kg")
          .eq("id", product.id)
          .single();

        if (fetchError) {
          console.error("Error fetching sell order for quantity update:", fetchError);
          // Continue without updating quantity if fetch fails, but log the error
        } else if (sellOrderData) {
          const newVolume = sellOrderData.volume_kg - quantity;
          const { error: updateError } = await supabase
            .from("sell_orders")
            .update({ volume_kg: newVolume })
            .eq("id", product.id);

          if (updateError) {
            console.error("Error updating sell order quantity:", updateError);
            // Log error but don't block the user from seeing their order
          } else {
            console.log(`Sell order quantity updated for product ${product.id}. New volume: ${newVolume}`);
          }
        }

        alert("Buy order placed successfully!");
        router.push("/orders"); // Redirect to orders page after successful placement
      }
    } catch (err) {
      console.error("Unexpected error placing buy order:", err);
      alert("An unexpected error occurred while placing your order.");
    }
  };


  if (loading) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-primary text-xl">Loading product summary...</p>
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

  if (!product) {
    return (
      <main className="min-h-screen bg-oatmeal/30 flex items-center justify-center">
        <p className="text-primary text-xl">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-oatmeal rounded-3xl shadow-xl border border-primary/10 p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
            Order Summary
          </h1>

          {/* Product Details (always visible) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{product.name}</h2>
              <p className="text-primary/70 text-lg">{product.category}</p>
              <div className="flex items-center text-secondary">
                <Star className="h-5 w-5 fill-secondary" />
                <span className="ml-1 text-base font-bold">{product.rating}</span>
              </div>
              <div className="flex items-center text-primary/60">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{product.farmer}, {product.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-primary/60" />
                <span className="text-2xl font-bold text-primary">₹{product.price} / kg</span>
              </div>
            </div>
          </div>

          {/* Multi-step Form */}
          <div className="mt-8 pt-8 border-t border-primary/10">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">1. Select Quantity</h3>
                {/* Quantity Selection */}
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-primary mb-2">
                    Quantity (in kg)
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                    <input
                      type="number"
                      id="quantity"
                      className="w-full pl-12 pr-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value))}
                      min="1"
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="bg-primary/5 rounded-xl p-4 flex items-center justify-between mb-8">
                  <span className="text-lg font-semibold text-primary">Total Price:</span>
                  <span className="text-2xl font-bold text-primary">₹{calculatedTotalPrice.toFixed(2)}</span>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">2. Delivery Address</h3>
                {/* Delivery Address Input */}
                <div className="mb-6">
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-primary mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    rows={3}
                    className="w-full px-4 py-3 bg-oatmeal-light rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your full delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">3. Payment Method</h3>
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Payment Method
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary h-4 w-4"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <span className="ml-2 text-primary">Cash on Delivery (COD)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-primary h-4 w-4"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                      />
                      <span className="ml-2 text-primary">Prepaid (UPI)</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-oatmeal border border-primary/10 rounded-xl text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                  <span>Previous</span>
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-oatmeal rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors ml-auto"
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={handlePlaceBuyOrder}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-oatmeal rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Place Buy Order</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
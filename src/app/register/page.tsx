"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [village, setVillage] = useState("");
  const [state, setState] = useState("Rajasthan");
  const [primaryCrop, setPrimaryCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone_number: phoneNumber,
          village: village,
          state: state,
          primary_crop: primaryCrop,
          role: "farmer", // Default role for registration
        },
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Registration successful! Please check your email to confirm your account." });
      // Optionally redirect after a short delay
      // setTimeout(() => router.push("/login"), 3000);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      
      <div className="pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-oatmeal p-8 md:p-12 rounded-[3rem] border border-primary/10 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
              <div>
                <h1 className="text-4xl font-serif font-bold text-primary mb-2">Join the Ecosystem</h1>
                <p className="text-primary/60 text-lg">Create your farmer account today</p>
              </div>
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s ? "bg-primary text-oatmeal" : "bg-oatmeal-dark/20 text-primary/30"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 text-center font-medium ${
                  message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </motion.div>
            )}

            <form onSubmit={handleSignUp} className="space-y-8">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Village / Town</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="text" 
                        placeholder="Bikaner" 
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">State</label>
                    <select 
                      className="w-full px-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all appearance-none"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option>Rajasthan</option>
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Andhra Pradesh</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Primary Crop</label>
                    <div className="relative">
                      <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="text" 
                        placeholder="Pearl Millet (Bajra)" 
                        value={primaryCrop}
                        onChange={(e) => setPrimaryCrop(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Identity Verification (Aadhaar / Voter ID)</label>
                    <div className="p-8 border-2 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center text-primary/40 hover:border-primary/30 transition-all cursor-pointer">
                      <ShieldCheck className="h-10 w-10 mb-2" />
                      <p className="font-bold">Click to upload or drag & drop</p>
                      <p className="text-xs">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/70 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col md:flex-row gap-4 pt-8">
                {step > 1 && (
                  <button 
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-5 border-2 border-primary/20 text-primary rounded-2xl font-bold text-lg hover:bg-primary/5 transition-all"
                    disabled={loading}
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button 
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex-[2] py-5 bg-primary text-oatmeal rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 group"
                    disabled={loading}
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="flex-[2] py-5 bg-secondary text-oatmeal rounded-2xl font-bold text-lg hover:bg-secondary-dark transition-all shadow-xl shadow-secondary/20"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Complete Registration"}
                  </button>
                )}
              </div>
            </form>

            <p className="mt-8 text-center text-primary/60">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:text-accent transition-colors underline decoration-primary/20 underline-offset-4">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

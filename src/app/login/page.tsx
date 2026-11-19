"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Role = "farmer" | "buyer" | "admin" | "transporter";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const roles = [
    { id: "farmer", label: "Farmer", icon: Leaf, desc: "Sell your crops & track earnings" },
    { id: "buyer", label: "Buyer", icon: User, desc: "Source authentic millet products" },
    { id: "transporter", label: "Transporter", icon: ShieldCheck, desc: "Manage logistics & deliveries" },
    { id: "admin", label: "Admin", icon: Lock, desc: "Ecosystem management" },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Login successful! Redirecting to dashboard..." });
      // Optionally redirect after a short delay
      // setTimeout(() => router.push("/dashboard"), 3000);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      
      <div className="pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-serif font-bold text-primary mb-8 leading-tight">
                Empowering India's <br />
                <span className="text-accent italic">Millet Economy</span>
              </h1>
              <div className="space-y-6">
                {[
                  "Direct access to national markets",
                  "Transparent and secure transactions",
                  "Farm-to-table traceability tracking",
                  "Data-driven agricultural insights"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-primary/70">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-oatmeal p-8 md:p-12 rounded-[3rem] border border-primary/10 shadow-2xl"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Welcome Back</h2>
              <p className="text-primary/60">Select your role to continue to your dashboard</p>
            </div>

            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as Role)}
                  className={`p-4 rounded-2xl border transition-all text-left ${
                    role === r.id 
                    ? "bg-primary border-primary text-oatmeal shadow-lg" 
                    : "bg-transparent border-primary/10 text-primary hover:border-primary/30"
                  }`}
                  disabled={loading}
                >
                  <r.icon className={`h-6 w-6 mb-2 ${role === r.id ? "text-secondary" : "text-primary"}`} />
                  <p className="font-bold text-sm">{r.label}</p>
                  <p className={`text-[10px] leading-tight ${role === r.id ? "text-oatmeal/60" : "text-primary/40"}`}>{r.desc}</p>
                </button>
              ))}
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

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-oatmeal-dark/20 rounded-2xl border border-transparent focus:bg-oatmeal focus:border-primary/20 focus:outline-none transition-all"
                    required
                  />
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-primary/60 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary" />
                  <span>Remember me</span>
                </label>
                <Link href="#" className="text-primary font-bold hover:text-accent transition-colors">Forgot Password?</Link>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-primary text-oatmeal rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 group"
                disabled={loading}
              >
                {loading ? "Signing In..." : `Sign In as ${roles.find(r => r.id === role)?.label}`}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="mt-8 text-center text-primary/60">
              Don't have an account? <Link href="/register" className="text-primary font-bold hover:text-accent transition-colors underline decoration-primary/20 underline-offset-4">Register as a Farmer</Link>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

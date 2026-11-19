"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { QrCode, Search, MapPin, Calendar, ShieldCheck, Truck, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function TraceabilityPage() {
  const [trackingId, setTrackingId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setShowResult(true);
    }
  };

  const steps = [
    {
      icon: Sprout,
      title: "Cultivation",
      date: "Oct 15, 2023",
      location: "Bikaner, Rajasthan",
      details: "Grown using organic practices by Farmer Ramesh Singh. Soil health certified.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Check",
      date: "Jan 20, 2024",
      location: "AgriLab Jaipur",
      details: "Passed multi-point pesticide and moisture tests. Grade A certification.",
    },
    {
      icon: Truck,
      title: "Processing & Packaging",
      date: "Feb 05, 2024",
      location: "Jaipur Processing Unit",
      details: "De-stoned and vacuum packed to maintain freshness and nutritional value.",
    },
    {
      icon: MapPin,
      title: "Distribution",
      date: "Feb 12, 2024",
      location: "Regional Hub, Delhi",
      details: "Stored in temperature-controlled warehouse before final dispatch.",
    },
  ];

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Farm-to-Table <span className="text-accent italic">Traceability</span>
          </h1>
          <p className="text-primary/60 text-lg">
            Scan the QR code on your package or enter the tracking ID to discover the story behind your millet.
          </p>
        </div>

        {/* Tracking Input */}
        <div className="max-w-2xl mx-auto mb-20">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 p-2 bg-oatmeal rounded-3xl border border-primary/10 shadow-lg">
            <div className="flex-1 relative">
              <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary/40" />
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID (e.g., MIL-RAJ-1024)"
                className="w-full pl-14 pr-4 py-4 bg-transparent focus:outline-none text-primary font-medium"
              />
            </div>
            <button 
              type="submit"
              className="px-10 py-4 bg-primary text-oatmeal rounded-2xl font-bold hover:bg-primary-dark transition-all"
            >
              Verify Journey
            </button>
          </form>
        </div>

        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Product Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-primary text-oatmeal p-8 rounded-[2.5rem] sticky top-32">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
                  <Image 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600" 
                    alt="Pearl Millet" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">Organic Pearl Millet</h3>
                <p className="text-oatmeal/60 text-sm mb-6">Batch ID: {trackingId}</p>
                
                <div className="space-y-4 pt-6 border-t border-oatmeal/10">
                  <div className="flex justify-between items-center">
                    <span className="text-oatmeal/60 text-sm">Farmer</span>
                    <span className="font-bold">Ramesh Singh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-oatmeal/60 text-sm">Variety</span>
                    <span className="font-bold">Hybrid MH-179</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-oatmeal/60 text-sm">Nutritional Grade</span>
                    <span className="font-bold text-secondary">Premium A+</span>
                  </div>
                </div>
                
                <div className="mt-10 p-4 bg-oatmeal/10 rounded-2xl border border-oatmeal/20">
                  <p className="text-xs text-center text-oatmeal/50">Verified by MilletConnect Blockchain Protocol</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-primary mb-10">Product Journey</h3>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/10" />
                
                <div className="space-y-12">
                  {steps.map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-0 w-12 h-12 bg-oatmeal border-4 border-primary/5 rounded-full flex items-center justify-center z-10">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="bg-oatmeal p-8 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <h4 className="text-xl font-bold text-primary">{step.title}</h4>
                          <div className="flex items-center text-xs font-bold text-primary/40">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{step.date}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{step.location}</span>
                          </div>
                        </div>
                        <p className="text-primary/60 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}

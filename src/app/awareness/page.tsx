import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/awareness/BlogCard";
import { Search, Play, BookOpen, Utensils, HeartPulse } from "lucide-react";
import Image from "next/image";

const blogs = [
  {
    title: "Why Millets are the Superfood of the Future",
    category: "Nutrition",
    excerpt: "Discover the incredible health benefits of millets, from gluten-free properties to high fiber content that aids digestion and heart health.",
    author: "Dr. Ananya Sharma",
    date: "May 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sustainable Farming: The Case for Millet Cultivation",
    category: "Farming",
    excerpt: "Learn how millets require 70% less water than rice and can grow in poor soil conditions, making them the ultimate crop for a changing climate.",
    author: "Rajesh Kumar",
    date: "May 08, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "10 Traditional Millet Recipes You Can Make at Home",
    category: "Recipes",
    excerpt: "From Ragi Dosa to Bajra Khichdi, explore these easy-to-make traditional recipes that are both delicious and highly nutritious.",
    author: "Chef Meera",
    date: "May 05, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1501265976582-c1e1b0bbaf63?auto=format&fit=crop&q=80&w=800",
  },
];

export default function AwarenessPage() {
  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-primary text-oatmeal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">
            The <span className="text-secondary italic">Millet</span> Awareness Hub
          </h1>
          <p className="text-oatmeal/70 text-xl max-w-2xl mx-auto mb-12">
            Your comprehensive guide to understanding, growing, and cooking with the world's most resilient grains.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 px-6 py-3 bg-oatmeal/10 rounded-full border border-oatmeal/20">
              <BookOpen className="h-5 w-5 text-secondary" />
              <span className="font-bold">50+ Articles</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-oatmeal/10 rounded-full border border-oatmeal/20">
              <Utensils className="h-5 w-5 text-secondary" />
              <span className="font-bold">100+ Recipes</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-oatmeal/10 rounded-full border border-oatmeal/20">
              <HeartPulse className="h-5 w-5 text-secondary" />
              <span className="font-bold">Nutrition Guides</span>
            </div>
          </div>
        </div>
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full -ml-48 -mb-48 blur-3xl" />
      </section>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Video Section */}
        <div className="mb-24">
          <div className="bg-oatmeal rounded-[3rem] overflow-hidden border border-primary/5 shadow-2xl grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto group">
              <Image 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Millet Documentary" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-oatmeal flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary fill-primary" />
                </button>
              </div>
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                Featured Video
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">The Journey of a Thousand Grains: India's Millet Mission</h2>
              <p className="text-primary/60 leading-relaxed mb-8">
                Explore the deep-rooted history of millets in Indian culture and how the government's new initiatives are bringing them back to the mainstream.
              </p>
              <button className="text-primary font-bold underline decoration-primary/20 underline-offset-8 hover:text-accent hover:decoration-accent transition-all text-left">
                Learn more about the mission
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Latest Insights</h2>
            <p className="text-primary/60">Explore our latest articles and research on millets.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
              <input 
                type="text" 
                placeholder="Search topics..."
                className="pl-10 pr-4 py-2 bg-oatmeal rounded-full border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <BlogCard key={i} {...blog} />
          ))}
        </div>

        {/* Recipe Teaser */}
        <div className="mt-32 p-12 md:p-20 bg-secondary rounded-[4rem] text-oatmeal relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Cook with Millets</h2>
              <p className="text-oatmeal/80 text-lg mb-12">
                Get access to our exclusive library of millet-based recipes curated by top chefs and nutritionists.
              </p>
              <button className="px-10 py-4 bg-primary text-oatmeal rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Explore Recipes
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden h-48 relative">
                <Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" alt="Recipe 1" fill className="object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden h-48 relative mt-8">
                <Image src="https://images.unsplash.com/photo-1501265976582-c1e1b0bbaf63?auto=format&fit=crop&q=80&w=400" alt="Recipe 2" fill className="object-cover" />
              </div>
            </div>
          </div>
          {/* Decorative Leaf */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" alt="Leaf Decor" width={600} height={600} className="object-contain" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

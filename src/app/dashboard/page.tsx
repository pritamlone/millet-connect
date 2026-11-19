import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { UserCircle } from "lucide-react";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="min-h-screen bg-oatmeal/30">
      <Navbar />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
          Welcome to your Dashboard, {user.user_metadata?.full_name || user.email}!
        </h1>
        <div className="bg-oatmeal p-8 rounded-[2rem] border border-primary/10 shadow-lg">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary/80">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            {user.user_metadata?.full_name && <p><strong>Full Name:</strong> {user.user_metadata.full_name}</p>}
            {user.user_metadata?.phone_number && <p><strong>Phone:</strong> {user.user_metadata.phone_number}</p>}
            {user.user_metadata?.role && <p><strong>Role:</strong> {user.user_metadata.role}</p>}
            {user.user_metadata?.village && <p><strong>Village:</strong> {user.user_metadata.village}</p>}
            {user.user_metadata?.state && <p><strong>State:</strong> {user.user_metadata.state}</p>}
            {user.user_metadata?.primary_crop && <p><strong>Primary Crop:</strong> {user.user_metadata.primary_crop}</p>}
          </div>
          <div className="mt-8">
            <form action="/auth/sign-out" method="post">
              <button className="px-6 py-3 bg-accent text-oatmeal rounded-full font-bold hover:bg-accent-dark transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

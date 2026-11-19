"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

const navLinkKeys = [
  { key: "nav.home" as const, href: "/" },
  { key: "nav.marketplace" as const, href: "/marketplace" },
  { key: "nav.sell" as const, href: "/sell" },
  { key: "nav.orders" as const, href: "/orders" },
  { key: "nav.traceability" as const, href: "/traceability" },
  { key: "nav.awareness" as const, href: "/awareness" },
];

export default function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-oatmeal/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">
              MilletConnect
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary/80 hover:text-primary transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-primary text-oatmeal rounded-full text-sm font-semibold hover:bg-primary-dark transition-all"
                >
                  {t("nav.dashboard")}
                </Link>
                <form action="/auth/sign-out" method="post">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-accent text-oatmeal rounded-full text-sm font-semibold hover:bg-accent-dark transition-all"
                  >
                    {t("nav.signOut")}
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-primary text-oatmeal rounded-full text-sm font-semibold hover:bg-primary-dark transition-all"
              >
                {t("nav.signIn")}
              </Link>
            )}
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-oatmeal border-t border-primary/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinkKeys.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-primary/80 hover:text-primary hover:bg-primary/5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block w-full text-center px-3 py-4 mt-4 bg-primary text-oatmeal rounded-lg text-base font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <form action="/auth/sign-out" method="post">
                    <button
                      type="submit"
                      className="block w-full text-center px-3 py-4 mt-2 bg-accent text-oatmeal rounded-lg text-base font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.signOut")}
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block w-full text-center px-3 py-4 mt-4 bg-primary text-oatmeal rounded-lg text-base font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.signIn")}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

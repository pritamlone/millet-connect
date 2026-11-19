"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function HomeCtaSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-oatmeal-dark/50 border border-primary/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
              {t("home.ctaHeading")}
            </h2>
            <p className="text-lg text-primary/70 mb-12 max-w-2xl mx-auto">
              {t("home.ctaBody")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/register"
                className="w-full sm:w-auto px-10 py-4 bg-primary text-oatmeal rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                {t("home.ctaGetStarted")}
              </Link>
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-primary/20 text-primary rounded-full font-bold hover:bg-primary/5 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{t("home.ctaBrowse")}</span>
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

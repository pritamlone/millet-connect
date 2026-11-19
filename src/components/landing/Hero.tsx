"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span>{t("hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-[1.1] mb-8">
              {t("hero.title")}{" "}
              <span className="text-accent italic">{t("hero.titleAccent")}</span>{" "}
              {t("hero.titleSuffix")}
            </h1>
            <p className="text-lg text-primary/70 leading-relaxed mb-10 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-oatmeal rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-primary-dark transition-all group shadow-lg shadow-primary/20"
              >
                <span>{t("hero.exploreMarketplace")}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center space-x-3 text-primary font-bold group">
                <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-all">
                  <Play className="h-5 w-5 fill-primary" />
                </div>
                <span>{t("hero.watchImpact")}</span>
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-primary/10 pt-8">
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary">12k+</h3>
                <p className="text-sm text-primary/60">{t("hero.statFarmers")}</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary">850+</h3>
                <p className="text-sm text-primary/60">{t("hero.statVillages")}</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary">50k+</h3>
                <p className="text-sm text-primary/60">{t("hero.statOrders")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 aspect-[4/5] lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
                alt="Farmer in millet field"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 w-64 h-64 border-[1px] border-primary/10 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -z-0 opacity-20">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="200" r="200" fill="#2D4B37" />
        </svg>
      </div>
    </section>
  );
}

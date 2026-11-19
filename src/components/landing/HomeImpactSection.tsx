"use client";

import Image from "next/image";
import { Leaf, Search, Sprout } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/I18nProvider";

const impactItems: { icon: typeof Sprout; textKey: TranslationKey }[] = [
  { icon: Sprout, textKey: "home.impactItem1" },
  { icon: Search, textKey: "home.impactItem2" },
  { icon: Leaf, textKey: "home.impactItem3" },
];

export default function HomeImpactSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-primary text-oatmeal overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">
              {t("home.impactHeading")} <br />
              <span className="text-secondary">{t("home.impactHeadingAccent")}</span>
            </h2>
            <div className="space-y-6">
              {impactItems.map((item) => (
                <div key={item.textKey} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-oatmeal/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <p className="text-lg text-oatmeal/80">{t(item.textKey)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="h-64 rounded-3xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600"
                    alt={t("home.imageFieldAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-40 rounded-3xl bg-secondary p-6 flex flex-col justify-end">
                  <p className="text-4xl font-bold">25%</p>
                  <p className="text-sm font-medium opacity-80">{t("home.statIncome")}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-40 rounded-3xl bg-accent p-6 flex flex-col justify-end">
                  <p className="text-4xl font-bold">4.8/5</p>
                  <p className="text-sm font-medium opacity-80">{t("home.statSatisfaction")}</p>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600"
                    alt={t("home.imageProductsAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

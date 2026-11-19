"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, BarChart3, Users, Leaf, QrCode } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/I18nProvider";

const featureItems: {
  icon: typeof Users;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
}[] = [
  {
    icon: Users,
    titleKey: "features.farmerTitle",
    descKey: "features.farmerDesc",
    color: "bg-primary",
  },
  {
    icon: QrCode,
    titleKey: "features.blockchainTitle",
    descKey: "features.blockchainDesc",
    color: "bg-secondary",
  },
  {
    icon: BarChart3,
    titleKey: "features.marketTitle",
    descKey: "features.marketDesc",
    color: "bg-accent",
  },
  {
    icon: ShieldCheck,
    titleKey: "features.qualityTitle",
    descKey: "features.qualityDesc",
    color: "bg-primary",
  },
  {
    icon: Truck,
    titleKey: "features.logisticsTitle",
    descKey: "features.logisticsDesc",
    color: "bg-secondary",
  },
  {
    icon: Leaf,
    titleKey: "features.sustainableTitle",
    descKey: "features.sustainableDesc",
    color: "bg-accent",
  },
];

export default function Features() {
  const { t } = useI18n();

  return (
    <section className="py-24 bg-oatmeal-dark/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6"
          >
            {t("features.heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary/60 max-w-2xl mx-auto"
          >
            {t("features.subheading")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-oatmeal rounded-[2rem] border border-primary/5 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-oatmeal group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t(feature.titleKey)}
              </h3>
              <p className="text-primary/60 text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

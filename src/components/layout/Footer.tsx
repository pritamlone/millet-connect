"use client";

import Link from "next/link";
import { Leaf, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-oatmeal pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-serif font-bold text-oatmeal tracking-tight">
                MilletConnect
              </span>
            </Link>
            <p className="text-oatmeal/70 text-sm leading-relaxed mb-8">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">{t("footer.ecosystem")}</h4>
            <ul className="space-y-4 text-sm text-oatmeal/70">
              <li>
                <Link href="/marketplace" className="hover:text-oatmeal transition-colors">
                  {t("nav.marketplace")}
                </Link>
              </li>
              <li>
                <Link href="/farmers" className="hover:text-oatmeal transition-colors">
                  {t("footer.farmerNetwork")}
                </Link>
              </li>
              <li>
                <Link href="/traceability" className="hover:text-oatmeal transition-colors">
                  {t("nav.traceability")}
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="hover:text-oatmeal transition-colors">
                  {t("footer.logistics")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">{t("footer.resources")}</h4>
            <ul className="space-y-4 text-sm text-oatmeal/70">
              <li>
                <Link href="/awareness" className="hover:text-oatmeal transition-colors">
                  {t("nav.awareness")}
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-oatmeal transition-colors">
                  {t("footer.milletRecipes")}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-oatmeal transition-colors">
                  {t("footer.govtSchemes")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-oatmeal transition-colors">
                  {t("footer.agriculturalBlog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-sm text-oatmeal/70">
              <li>1800-MILLET-HUB</li>
              <li>support@milletconnect.in</li>
              <li>{t("footer.location")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-oatmeal/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-oatmeal/50">
          <p>{t("footer.copyright")}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-oatmeal transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="hover:text-oatmeal transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 py-8 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <span className="font-sans font-medium text-text-primary tracking-widest text-sm">
          {t.nav_name}
        </span>
        <span className="font-sans text-text-secondary text-sm">
          {t.footer_copy}
        </span>
      </div>
    </footer>
  );
}

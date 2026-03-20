"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/10 py-8 px-5 md:px-10 bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <span className="font-sans font-medium text-text-primary tracking-widest text-sm">
          {t.nav_name}
        </span>
        <span className="font-sans text-xs text-[#3d2a5a]/60">
          © 2026 Duda. All rights reserved.
        </span>
        <span className="font-sans text-xs text-[#3d2a5a]/60 opacity-60">
          Made by Terninha
        </span>
      </div>
    </footer>
  );
}

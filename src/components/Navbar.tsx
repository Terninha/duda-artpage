"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const languages = [
    { code: "en" as const, label: t.lang_en },
    { code: "pt" as const, label: t.lang_pt },
    { code: "fr" as const, label: t.lang_fr },
  ];

  const menuLinks = [
    { href: "#works", label: t.hero_cta_works },
    { href: "#manifesto", label: t.hero_cta_manifesto },
    { href: "#about", label: t.about_title },
  ];

  return (
    <>
      {/* Floating Pill Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 mt-6 flex justify-center px-5">
        <div className="flex items-center gap-6 h-[60px] rounded-full bg-white/60 backdrop-blur-md border border-black/8 px-6 w-max">
          {/* Left: Name */}
          <a
            href="#"
            className="font-sans font-medium text-text-primary tracking-widest text-sm whitespace-nowrap"
          >
            {t.nav_name}
          </a>

          {/* Center: Language Switcher — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {languages.map((l, i) => (
              <React.Fragment key={l.code}>
                {i > 0 && (
                  <span className="text-text-secondary text-xs mx-1">|</span>
                )}
                <button
                  onClick={() => setLang(l.code)}
                  className={`text-xs font-sans font-medium tracking-wide px-1 py-0.5 transition-colors duration-300 ease-expo ${
                    lang === l.code
                      ? "text-text-primary border-b border-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l.label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Right: Instagram link — hidden on mobile */}
          <a
            href="#instagram"
            className="hidden md:flex items-center gap-2 text-xs font-sans font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 ease-expo whitespace-nowrap"
          >
            <span>{t.nav_instagram}</span>
            <span className="w-6 h-6 rounded-full bg-black/8 flex items-center justify-center">
              <ArrowUpRight size={12} weight="light" />
            </span>
          </a>

          {/* Hamburger — visible on mobile only */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-6 h-6 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.span
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 0 : -3,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? 0 : 3,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 backdrop-blur-3xl bg-[#FAFAF8]/90 flex flex-col items-center justify-center gap-8"
          >
            {/* Language switcher in mobile overlay */}
            <div className="flex items-center gap-3 mb-8">
              {languages.map((l, i) => (
                <React.Fragment key={l.code}>
                  {i > 0 && (
                    <span className="text-text-secondary text-sm">|</span>
                  )}
                  <button
                    onClick={() => setLang(l.code)}
                    className={`text-sm font-sans font-medium tracking-wide px-2 py-1 transition-colors duration-300 ease-expo ${
                      lang === l.code
                        ? "text-text-primary border-b border-accent"
                        : "text-text-secondary"
                    }`}
                  >
                    {l.label}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Nav Links with stagger reveal */}
            {menuLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  delay: 0.1 + i * 0.05,
                }}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-text-primary"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Instagram link in mobile overlay */}
            <motion.a
              href="#instagram"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.25,
              }}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-text-secondary font-sans text-sm mt-4"
            >
              <span>{t.nav_instagram}</span>
              <span className="w-7 h-7 rounded-full bg-black/8 flex items-center justify-center">
                <ArrowUpRight size={14} weight="light" />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

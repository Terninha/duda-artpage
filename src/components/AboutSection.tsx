"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-5 md:px-10 bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Decorative number */}
            <span className="absolute -top-10 -left-4 font-serif font-bold text-[200px] leading-none text-text-primary opacity-[0.04] select-none pointer-events-none">
              04
            </span>

            <motion.h2
              variants={itemVariants}
              className="font-serif font-bold text-text-primary tracking-tighter relative z-10"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {t.about_title}
            </motion.h2>

            <div className="mt-10 space-y-6 relative z-10">
              <motion.p
                variants={itemVariants}
                className="font-sans text-text-secondary leading-relaxed max-w-[65ch]"
              >
                {t.about_p1}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-sans text-text-secondary leading-relaxed max-w-[65ch]"
              >
                {t.about_p2}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-sans text-text-secondary leading-relaxed max-w-[65ch]"
              >
                {t.about_p3}
              </motion.p>
            </div>
          </motion.div>

          {/* Right column: vertical thin rule — breathing space */}
          <div className="hidden md:flex justify-start">
            <div className="border-l border-black/10 h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

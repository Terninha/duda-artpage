"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

function DirectionalButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("left");
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    if (Math.abs(x) > Math.abs(y)) {
      setDirection(x > 0 ? "right" : "left");
    } else {
      setDirection(y > 0 ? "bottom" : "top");
    }
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const transforms: Record<
    string,
    { initial: string; final: string }
  > = {
    left: { initial: "translateX(-100%)", final: "translateX(0%)" },
    right: { initial: "translateX(100%)", final: "translateX(0%)" },
    top: { initial: "translateY(-100%)", final: "translateY(0%)" },
    bottom: { initial: "translateY(100%)", final: "translateY(0%)" },
  };

  const transform = transforms[direction];

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center gap-3 rounded-full px-6 py-3 border border-white/25 font-sans text-sm text-text-primary overflow-hidden active:scale-[0.97] transition-transform duration-150"
    >
      {/* Directional fill overlay */}
      <span
        className="absolute inset-0 bg-text-primary rounded-full"
        style={{
          transform: hovered ? transform.final : transform.initial,
          transition: "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />
      <span
        className={`relative z-10 transition-colors duration-500 ease-expo ${
          hovered ? "text-bg" : "text-text-primary"
        }`}
      >
        {children}
      </span>
      <span
        className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-500 ease-expo ${
          hovered ? "bg-bg/20" : "bg-white/10"
        }`}
      >
        <ArrowUpRight
          size={14}
          weight="light"
          className={`transition-colors duration-500 ease-expo ${
            hovered ? "text-bg" : "text-text-primary"
          }`}
        />
      </span>
    </a>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Absolutely positioned hero image — bleeds off right edge */}
      <motion.div
        className="absolute top-0 right-0 h-full hidden md:block"
        style={{ width: "52vw", zIndex: 0 }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1], delay: 0.5 }}
      >
        {/* Left fade — image dissolves into background */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0c0c0b 0%, transparent 45%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0c0c0b 0%, transparent 35%)",
          }}
        />

        {/* Top fade — subtle, no hard top edge */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #0c0c0b 0%, transparent 20%)",
          }}
        />

        <Image
          src="/book.jpg"
          alt=""
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </motion.div>

      {/* Grid — text content only, z-10 above image */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[55fr_45fr] min-h-[100dvh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center gap-8 pl-5 pr-5 md:pl-16 lg:pl-24 md:pr-0 py-32"
        >
          {/* Eyebrow pill badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-text-secondary border border-white/[0.15] rounded-full px-3 py-1">
              {t.hero_tag}
            </span>
          </motion.div>

          {/* Headline — line 1 bold upright, line 2 light italic */}
          <motion.h1 variants={itemVariants} className="flex flex-col">
            <span
              className="font-serif font-bold text-text-primary tracking-tighter leading-none"
              style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
            >
              {t.hero_h1}
            </span>
            <span
              className="font-serif font-light italic text-text-primary tracking-tighter leading-none"
              style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
            >
              {t.hero_h2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-text-secondary text-base md:text-lg max-w-[65ch]"
          >
            {t.hero_sub}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <DirectionalButton href="#works">
              {t.hero_cta_works}
            </DirectionalButton>
            <a
              href="#manifesto"
              className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 ease-expo px-4 py-3 active:scale-[0.97]"
            >
              {t.hero_cta_manifesto}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

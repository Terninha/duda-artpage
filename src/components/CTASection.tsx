"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [3, -3]);
  const rotateY = useTransform(x, [-50, 50], [-3, 3]);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section className="min-h-[40vh] flex items-center justify-center px-5 py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="text-center"
      >
        <h2
          className="font-serif font-bold text-text-primary tracking-tighter mb-10"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          {t.cta_headline}
        </h2>

        {/* Magnetic Button-in-Button */}
        <motion.a
          ref={buttonRef}
          href="#"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: springX,
            y: springY,
            rotateX: springRotateX,
            rotateY: springRotateY,
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group/cta inline-flex items-center gap-3 rounded-full px-8 py-4 border border-text-primary font-sans text-sm text-text-primary hover:bg-text-primary hover:text-bg transition-colors duration-500 ease-expo"
        >
          <span>{t.cta_button}</span>
          <span className="w-7 h-7 rounded-full bg-white/10 group-hover/cta:bg-bg/20 flex items-center justify-center transition-colors duration-500 ease-expo">
            <ArrowUpRight size={14} weight="light" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}

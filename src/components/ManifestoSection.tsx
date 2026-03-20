"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ManifestoSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="py-40 flex items-center justify-center px-5 bg-[#E4CAFF]"
    >
      <div className="max-w-[900px] mx-auto text-center">
        {/* Label */}
        <span
          className="inline-block font-sans font-medium text-[10px] uppercase tracking-[0.25em] text-[#0f0f0e] mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {t.manifesto_label}
        </span>

        {/* Quote */}
        <p
          className="font-serif font-light italic text-text-primary leading-snug"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          {t.manifesto_quote}
        </p>
      </div>
    </section>
  );
}

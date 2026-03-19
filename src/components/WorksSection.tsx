"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

interface WorkItem {
  seed: string;
  titleKey: string;
  catKey: string;
  year: string;
  aspect: string;
}

const works: WorkItem[] = [
  {
    seed: "velvet-archive",
    titleKey: "card_1_title",
    catKey: "cat_music",
    year: "2024",
    aspect: "3/2",
  },
  {
    seed: "nocturne-study",
    titleKey: "card_2_title",
    catKey: "cat_music",
    year: "2023",
    aspect: "3/4",
  },
  {
    seed: "margin-notes",
    titleKey: "card_3_title",
    catKey: "cat_lit",
    year: "2024",
    aspect: "4/5",
  },
  {
    seed: "silent-chapter",
    titleKey: "card_4_title",
    catKey: "cat_lit",
    year: "2022",
    aspect: "16/10",
  },
  {
    seed: "void-construct",
    titleKey: "card_5_title",
    catKey: "cat_art",
    year: "2024",
    aspect: "3/4",
  },
  {
    seed: "weight-of-form",
    titleKey: "card_6_title",
    catKey: "cat_art",
    year: "2023",
    aspect: "4/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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

const WorkCard = memo(function WorkCard({
  seed,
  title,
  category,
  year,
  aspect,
}: {
  seed: string;
  title: string;
  category: string;
  year: string;
  aspect: string;
}) {
  return (
    <motion.a
      href="#instagram"
      variants={itemVariants}
      className="group block"
    >
      {/* Double-Bezel: Outer Shell */}
      <div className="bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-[2rem]">
        {/* Double-Bezel: Inner Core */}
        <div className="bg-surface-elevated shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] rounded-[calc(2rem-0.375rem)] overflow-hidden">
          {/* Image container with variable aspect ratio */}
          <div
            className="relative overflow-hidden rounded-[4px]"
            style={{ aspectRatio: aspect }}
          >
            <img
              src={`https://picsum.photos/seed/${seed}/800/1000`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"
              style={{
                transition: "opacity 500ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              <span
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                style={{
                  transition:
                    "transform 600ms cubic-bezier(0.32, 0.72, 0, 1) 100ms, opacity 400ms cubic-bezier(0.32, 0.72, 0, 1) 100ms",
                }}
              >
                <ArrowUpRight
                  size={20}
                  weight="light"
                  className="text-text-primary"
                />
              </span>
            </div>
          </div>

          {/* Card info */}
          <div className="p-5 flex items-baseline justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-text-primary">{title}</h3>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                {category}
              </span>
            </div>
            <span className="font-sans text-xs text-text-secondary">
              {year}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
});

export default function WorksSection() {
  const { t } = useLanguage();

  const tRecord = t as Record<string, string>;

  return (
    <section id="works" className="py-32 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <h2
            className="font-serif font-bold text-text-primary tracking-tighter"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t.works_title}
          </h2>
          <p className="font-sans text-text-secondary text-sm mt-3 max-w-[65ch]">
            {t.works_sub}
          </p>
        </div>

        {/* Asymmetric grid — 2fr 1fr 1fr */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4"
        >
          {works.map((work) => (
            <WorkCard
              key={work.seed}
              seed={work.seed}
              title={tRecord[work.titleKey]}
              category={tRecord[work.catKey]}
              year={work.year}
              aspect={work.aspect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

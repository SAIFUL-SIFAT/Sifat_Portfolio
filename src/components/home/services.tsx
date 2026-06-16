"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const services = [
  { title: "Brand Identity", desc: "Logos, systems, and brand worlds with soul." },
  { title: "UI / UX Design", desc: "Product surfaces that feel inevitable to use." },
  { title: "Design Systems", desc: "Scalable tokens, components, and guidelines." },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-32"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 max-w-xl"
      >
        <motion.span
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          What I do
        </motion.span>
        <motion.h3
          variants={fadeUp}
          className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl"
        >
          Crafted with intent.
        </motion.h3>
        <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
          A small set of services, each delivered with depth and care.
        </motion.p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
            <h4 className="font-display mt-6 text-2xl">{s.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

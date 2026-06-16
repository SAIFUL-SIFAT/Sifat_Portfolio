"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    institution: "American International University-Bangladesh",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 - Present",
  },
  {
    institution: "Ideal College, Dhanmondi",
    degree: "Higher Secondary Certificate",
    period: "2018 - 2020",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // Cards animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-32"
    >
      <div ref={headerRef} className="mb-12 max-w-xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Academic Path
        </span>
        <h3 className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl">Education.</h3>
        <p className="mt-4 text-muted-foreground">
          My academic foundation and ongoing learning journey.
        </p>
      </div>

      <div ref={cardsRef} className="grid gap-6 md:grid-cols-2">
        {educationData.map((edu) => (
          <motion.div
            key={edu.institution}
            whileHover={{ y: -6, backgroundColor: "rgba(var(--accent), 0.05)" }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="corner-frame group relative overflow-hidden bg-card/40 p-8 backdrop-blur-sm cursor-default"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
            <h4 className="font-display mt-6 text-3xl text-foreground/90">{edu.institution}</h4>
            <p className="mt-2 text-base text-accent font-medium">{edu.degree}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

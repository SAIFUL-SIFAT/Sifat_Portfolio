"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    company: "Polygon Technology",
    role: "Software Engineering Intern",
    period: "Oct 2025 - Jan 2026",
    description:
      "Contributing to core infrastructure and protocol development in a high-growth blockchain environment.",
  },
];

export function Experience() {
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
          x: -30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
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
      id="experience"
      ref={sectionRef}
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-32"
    >
      <div ref={headerRef} className="mb-12 max-w-xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Professional Career
        </span>
        <h3 className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl">Experience.</h3>
        <p className="mt-4 text-muted-foreground">
          My professional background and industry impact.
        </p>
      </div>

      <div ref={cardsRef} className="space-y-6">
        {experienceData.map((exp) => (
          <motion.div
            key={exp.company}
            whileHover={{ scale: 1.01, backgroundColor: "rgba(var(--accent), 0.05)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="corner-frame group relative flex flex-col gap-6 overflow-hidden bg-card/40 p-8 backdrop-blur-sm md:flex-row md:items-center md:justify-between cursor-default"
          >
            <div className="flex items-center gap-6">
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-accent/10 text-accent">
                <Briefcase className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                <h4 className="font-display mt-1 text-3xl text-foreground/90 leading-tight">
                  {exp.role}
                </h4>
                <p className="text-lg text-accent font-medium">{exp.company}</p>
              </div>
            </div>
            <div className="max-w-md md:text-right">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

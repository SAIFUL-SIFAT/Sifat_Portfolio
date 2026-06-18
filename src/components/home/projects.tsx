"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  links: {
    demo?: string;
    github: string;
  };
  color: string;
}

const projects: Project[] = [
  {
    title: "Petal & Pearl",
    description:
      "A production-ready full-stack e-commerce platform for a beauty/cosmetics brand. Includes product catalog, shopping cart with real-time state, user authentication, order management, and a full admin dashboard for inventory and order tracking.",
    tech: ["React", "NestJS", "PostgreSQL", "Tailwind CSS", "TypeORM"],
    features: [
      "Real-time cart and checkout flow",
      "REST API backend built with NestJS",
      "Admin dashboard for product and order management",
      "Responsive storefront with product detail pages",
    ],
    links: {
      demo: "https://petalpearl.netlify.app",
      github: "https://github.com/SAIFUL-SIFAT/Petal_-_Pearl",
    },
    color: "from-rose-500/10 via-purple-500/5 to-transparent",
  },
  {
    title: "Sentin",
    description:
      "A privacy-first, browser-only office suite. All document processing happens client-side — no files are uploaded to a server. Includes tools for PDF manipulation (merge, split, rotate, compress) and document conversion with .docx export, designed for users who want quick document utilities without sacrificing privacy.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "100% client-side processing — no file leaves the browser",
      "PDF tools: merge, split, rotate, and other manipulations",
      "Export to .docx format",
      "Clean, minimal utility-first UI",
    ],
    links: {
      demo: "https://sentin-tools.vercel.app/",
      github: "https://github.com/SAIFUL-SIFAT/Sentin",
    },
    color: "from-blue-500/10 via-cyan-500/5 to-transparent",
  },
  {
    title: "Online Art Store",
    description:
      "A full-stack art marketplace where users can browse, search, and purchase artwork. Includes authentication, product listings, and a checkout flow, built with a modern type-safe stack.",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Product catalog with search and filtering",
      "User authentication",
      "Checkout flow",
      "Type-safe full-stack architecture with Next.js + PostgreSQL",
    ],
    links: {
      github: "https://github.com/SAIFUL-SIFAT/Online_Art_Store",
    },
    color: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- CARD 0 (Petal & Pearl) — enters from LEFT, settles center, then recedes ---
  const x0 = useTransform(scrollYProgress, [0, 0.18], ["-120vw", "0vw"]);
  const y0 = 0; // Removed translation to prevent layout shifts/movement before fitting
  const scale0 = useTransform(scrollYProgress, [0, 0.18, 0.4, 0.7], [0.9, 1, 1, 0.95]);
  const rotate0 = useTransform(scrollYProgress, [0, 0.18, 0.4, 0.7], [-10, 0, 0, -2]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.04, 1], [0, 1, 1]);
  const filter0 = "none"; // Removed blur filter to keep contents perfectly sharp

  // --- CARD 1 (Sentin) — enters from RIGHT at ~33% scroll, stacks above card 0 ---
  const x1 = useTransform(scrollYProgress, [0.28, 0.46], ["120vw", "0vw"]);
  const y1 = 0; // Removed translation to prevent movement before fitting
  const scale1 = useTransform(scrollYProgress, [0.28, 0.46, 0.7], [0.9, 1, 0.97]);
  const rotate1 = useTransform(scrollYProgress, [0.28, 0.46, 0.7], [10, 0, 1]);
  const opacity1 = useTransform(scrollYProgress, [0.28, 0.32, 1], [0, 1, 1]);
  const filter1 = "none"; // Removed blur filter to keep contents perfectly sharp

  // --- CARD 2 (Online Art Store) — enters from BOTTOM at ~62%, stacks on top, fully settled by 0.92 ---
  const y2 = useTransform(scrollYProgress, [0.62, 0.92], ["120vh", "0vh"]);
  const scale2 = useTransform(scrollYProgress, [0.62, 0.92], [0.9, 1]);
  const rotate2 = useTransform(scrollYProgress, [0.62, 0.92], [5, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.62, 0.66, 1], [0, 1, 1]);

  // If user prefers reduced motion: render statically stacked, no scroll-driven transforms
  if (reduceMotion) {
    return (
      <section id="projects" className="relative z-10 w-full bg-background py-20">
        <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
          <div className="max-w-xl mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
              Selected Works
            </span>
            <h3 className="font-display mt-2 text-5xl leading-[0.95] md:text-6xl text-foreground">
              Projects.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground md:text-base leading-relaxed">
              A summary of selected projects by Saiful Sifat — Full-Stack Engineer.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {projects.map((p) => (
              <div key={p.title} className="h-[440px] md:h-[480px]">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 h-[400vh] w-full bg-background"
    >
      {/* Sticky/pinned viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-5 py-8 md:px-8">
        {/* Section Heading */}
        <div className="mx-auto w-full max-w-5xl mb-8 md:mb-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.3em] text-accent font-semibold"
            >
              Selected Works
            </motion.span>
            <motion.h3
              variants={fadeUp}
              className="font-display mt-2 text-5xl leading-[0.95] md:text-6xl text-foreground"
            >
              Projects.
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-sm text-muted-foreground md:text-base leading-relaxed"
            >
              A summary of selected projects by Saiful Sifat — Full-Stack Engineer.
            </motion.p>
          </motion.div>
        </div>

        {/* Project Cards Stack Container */}
        <div className="relative mx-auto h-[60vh] min-h-[440px] max-h-[580px] w-full max-w-5xl">
          {/* Card 1: Petal & Pearl — enters from left */}
          <motion.div
            style={{
              x: x0,
              y: y0,
              scale: scale0,
              rotate: rotate0,
              opacity: opacity0,
              filter: filter0,
              zIndex: 10,
            }}
            className="absolute inset-0 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <ProjectCard project={projects[0]} />
          </motion.div>

          {/* Card 2: Sentin — enters from right, stacks above card 1 */}
          <motion.div
            style={{
              x: x1,
              y: y1,
              scale: scale1,
              rotate: rotate1,
              opacity: opacity1,
              filter: filter1,
              zIndex: 20,
            }}
            className="absolute inset-0 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <ProjectCard project={projects[1]} />
          </motion.div>

          {/* Card 3: Online Art Store — enters from bottom, stacks on top */}
          <motion.div
            style={{ y: y2, scale: scale2, rotate: rotate2, opacity: opacity2, zIndex: 30 }}
            className="absolute inset-0 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <ProjectCard project={projects[2]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="corner-frame group relative flex h-full w-full flex-col justify-between overflow-hidden bg-card border border-border/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-300 hover:border-accent/40">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.color} opacity-70 transition-opacity duration-500 group-hover:opacity-90`}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-none md:grid md:grid-cols-12 md:gap-8 md:overflow-visible h-full justify-between">
        {/* Left: metadata + features */}
        <div className={`flex flex-col justify-between h-full ${
          (project.title === "Online Art Store" || (!project.links.demo && project.title !== "Sentin" && project.title !== "Petal & Pearl")) 
            ? "md:col-span-12" 
            : "md:col-span-7"
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                Case Study
              </span>
              <span className="h-1 w-1 rounded-full bg-accent/40" />
              <span className="text-[10px] font-mono text-muted-foreground">Featured Project</span>
            </div>

            <h4 className="font-display mt-2 text-3xl md:text-4xl text-foreground leading-none tracking-tight">
              {project.title}
            </h4>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-accent/5 px-2 py-0.5 text-[10px] font-semibold text-accent border border-accent/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
              {project.description}
            </p>
          </div>

          <div className="border-t border-border/30 pt-4 mt-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-accent/80 font-bold block mb-2">
              Key Highlights
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[11px] text-foreground/80 md:text-xs"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-tight">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: screenshot placeholder (only shown if the project has a screenshot or demo) */}
        {project.title !== "Online Art Store" && (project.links.demo || project.title === "Sentin" || project.title === "Petal & Pearl") && (
          <div className="hidden md:flex md:col-span-5 h-full items-center justify-center">
            <div className="w-full h-full min-h-[200px] border border-white/10 rounded-xl overflow-hidden bg-black/40 shadow-inner transition-colors duration-300 group-hover:border-accent/30 flex flex-col">
              {/* Browser top bar */}
              <div className="bg-white/5 h-6 w-full flex items-center px-3 gap-1.5 border-b border-white/5 shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                <div className="h-3 w-1/3 bg-white/5 rounded mx-auto border border-white/5" />
              </div>
              {/* Image placeholder / actual image */}
              <div className="relative flex-1 w-full bg-white/[0.02] overflow-hidden">
                {project.title === "Sentin" ? (
                  <img
                    src="/Sentin.png"
                    alt="Sentin Screenshot"
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : project.title === "Petal & Pearl" ? (
                  <img
                    src="/petal.png"
                    alt="Petal & Pearl Screenshot"
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                      Screenshot Placeholder
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions row */}
      <div className="flex items-center gap-4 mt-6 border-t border-border/20 pt-4 w-full justify-between">
        <div className="flex items-center gap-4">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:translate-y-[-1px] transition-all duration-200"
          >
            <Github className="h-4 w-4" />
            <span>Source Code</span>
          </a>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent-foreground hover:translate-y-[-1px] transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/40 hidden sm:inline">
          SHAIFUL ALAM{" "}
        </span>
      </div>
    </div>
  );
}

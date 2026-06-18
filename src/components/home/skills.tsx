"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const DevIcon = ({ name }: { name: string }) => (
  <img
    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}.svg`}
    alt={name}
    className="h-6 w-6 object-contain drop-shadow-sm"
  />
);

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative z-10 w-full py-4">
      <div className="relative mx-4 md:mx-6 lg:mx-8 rounded-3xl overflow-hidden">
        <img
          src="/tools.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-32">
          <div ref={headerRef} className="mb-16 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Tech Stack</span>
            <h3 className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl text-white">
              Tools of the trade.
            </h3>
            <p className="mt-4 text-white/50">
              Languages, frameworks, and platforms I work with daily.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            <SkillCategoryBlock
              title="PROGRAMMING LANGUAGES"
              items={[
                { name: "C++", icon: <DevIcon name="cplusplus/cplusplus-original" /> },
                { name: "Python", icon: <DevIcon name="python/python-original" /> },
                { name: "HTML", icon: <DevIcon name="html5/html5-original" /> },
                { name: "CSS", icon: <DevIcon name="css3/css3-original" /> },
                { name: "JavaScript", icon: <DevIcon name="javascript/javascript-original" /> },
                { name: "PHP", icon: <DevIcon name="php/php-original" /> },
                { name: "Java", icon: <DevIcon name="java/java-original" /> },
                { name: "Bootstrap", icon: <DevIcon name="bootstrap/bootstrap-original" /> },
              ]}
            />
            <SkillCategoryBlock
              title="LIBRARIES / FRAMEWORKS"
              items={[
                { name: "ASP.NET", icon: <DevIcon name="dotnetcore/dotnetcore-original" /> },
                { name: "NestJS", icon: <DevIcon name="nestjs/nestjs-original" /> },
                { name: "Next.js", icon: <DevIcon name="nextjs/nextjs-original" /> },
              ]}
            />
            <SkillCategoryBlock
              title="TOOLS / PLATFORMS"
              items={[
                { name: "Git", icon: <DevIcon name="git/git-original" /> },
                { name: "Bash", icon: <DevIcon name="bash/bash-original" /> },
                { name: "Linux", icon: <DevIcon name="linux/linux-original" /> },
                { name: "Figma", icon: <DevIcon name="figma/figma-original" /> },
              ]}
            />
            <SkillCategoryBlock
              title="DATABASES"
              items={[
                { name: "MySQL", icon: <DevIcon name="mysql/mysql-original" /> },
                { name: "PostgreSQL", icon: <DevIcon name="postgresql/postgresql-original" /> },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCategoryBlock({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: React.ReactNode }[];
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(titleRef.current, {
        x: -50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      }).from(
        itemsRef.current?.children ?? [],
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
          filter: "blur(5px)",
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      );
    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={blockRef}>
      <h3
        ref={titleRef}
        className="font-display text-[10vw] leading-[0.9] tracking-tight text-white md:text-[5rem] lg:text-[6rem]"
      >
        {title}
      </h3>

      <div
        ref={itemsRef}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="corner-frame flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-3.5 rounded-xl cursor-default"
          >
            <span>{item.icon}</span>
            <span className="text-sm font-medium tracking-wide text-white/80">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { motion, type Variants } from "motion/react";
import { Code2, Braces, Terminal, Database, Globe, Cpu, FileCode, Paintbrush, LayoutGrid, Box, Server, GitBranch, Monitor, PenTool, Coffee, Zap, HardDrive } from "lucide-react";

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

export function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16 max-w-xl"
      >
        <motion.span variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Tech Stack
        </motion.span>
        <motion.h3 variants={fadeUp} className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl">
          Tools of the trade.
        </motion.h3>
        <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
          Languages, frameworks, and platforms I work with daily.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-20">
        <SkillCategoryBlock
          title="PROGRAMMING LANGUAGES"
          items={[
            { name: "C++", icon: <Cpu className="h-5 w-5" /> },
            { name: "Python", icon: <FileCode className="h-5 w-5" /> },
            { name: "HTML", icon: <Globe className="h-5 w-5" /> },
            { name: "CSS", icon: <Paintbrush className="h-5 w-5" /> },
            { name: "JavaScript", icon: <Braces className="h-5 w-5" /> },
            { name: "PHP", icon: <Code2 className="h-5 w-5" /> },
            { name: "Java", icon: <Coffee className="h-5 w-5" /> },
            { name: "Bootstrap", icon: <LayoutGrid className="h-5 w-5" /> },
          ]}
        />
        <SkillCategoryBlock
          title="LIBRARIES / FRAMEWORKS"
          items={[
            { name: "ASP.NET", icon: <Server className="h-5 w-5" /> },
            { name: "NestJS", icon: <Box className="h-5 w-5" /> },
            { name: "Next.js", icon: <Zap className="h-5 w-5" /> },
          ]}
        />
        <SkillCategoryBlock
          title="TOOLS / PLATFORMS"
          items={[
            { name: "Git", icon: <GitBranch className="h-5 w-5" /> },
            { name: "Bash", icon: <Terminal className="h-5 w-5" /> },
            { name: "Linux", icon: <Monitor className="h-5 w-5" /> },
            { name: "Figma", icon: <PenTool className="h-5 w-5" /> },
          ]}
        />
        <SkillCategoryBlock
          title="DATABASES"
          items={[
            { name: "MySQL", icon: <Database className="h-5 w-5" /> },
            { name: "PostgreSQL", icon: <HardDrive className="h-5 w-5" /> },
          ]}
        />
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
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h3
        variants={fadeUp}
        className="font-display text-[10vw] leading-[0.9] tracking-tight text-foreground md:text-[5rem] lg:text-[6rem]"
      >
        {title}
      </motion.h3>

      <motion.div
        variants={fadeUp}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="corner-frame flex items-center gap-3 bg-card/40 px-4 py-3.5 backdrop-blur-sm"
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span className="text-sm font-medium tracking-wide text-foreground/90">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

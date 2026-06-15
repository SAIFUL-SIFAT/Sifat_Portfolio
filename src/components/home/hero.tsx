import { motion, type Variants } from "motion/react";
import { User, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function Hero() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-6 md:px-8 md:pb-32 md:pt-10">
      <div className="relative">
        {/* Title */}
        <div className="relative">
          <HeroTitle text="JAMES LUX" />
          <div className="mt-2 flex items-center justify-between gap-6 md:mt-4">
            <HeroSubtitle text="PRODUCT" delay={0.4} />
            <HeroSubtitle text="DESIGNER" delay={0.55} className="text-right" />
          </div>
        </div>

        {/* Portrait placeholder centered behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-[3/4] w-[70%] max-w-md -translate-x-1/2 -translate-y-[42%] md:w-[42%]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-b from-secondary to-card shadow-2xl">
            <div className="absolute inset-0 grid place-items-center">
              <User className="h-24 w-24 text-muted-foreground/40" strokeWidth={1} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </div>
        </motion.div>

        {/* Bottom row: status + bio + cta */}
        <div className="relative z-10 mt-10 grid gap-10 md:mt-20 md:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 0.8 }}
            className="max-w-md"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <Circle className="h-2 w-2 fill-accent text-accent" />
              </span>
              Open for freelance works.
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Hey there! I&apos;m a Brand &amp; UI &amp; UX Designer working in the global marketplace.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6">
              <Button className="h-12 rounded-full bg-primary px-7 text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_oklch(0.78_0.16_142/0.6)]">
                Schedule Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroTitle({ text }: { text: string }) {
  return (
    <h1 className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[10.5rem] lg:text-[13rem]">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex justify-between gap-1">
        {text.split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.06 * i, duration: 1, ease: EASE }}
            className="inline-block"
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

function HeroSubtitle({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 1, ease: EASE }}
      className={`font-display text-[8vw] leading-none tracking-wide text-foreground/90 md:text-6xl lg:text-7xl ${className}`}
    >
      {text}
    </motion.h2>
  );
}

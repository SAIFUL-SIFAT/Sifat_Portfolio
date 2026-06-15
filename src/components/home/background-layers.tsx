import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BackgroundLayers() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* base vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.18_0.01_285)_0%,oklch(0.1_0.005_285)_70%)]" aria-hidden />
      {/* big sphere on the right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="pointer-events-none absolute -right-[20%] top-[6%] h-[80vw] w-[80vw] max-h-[900px] max-w-[900px] md:-right-[10%] md:top-[8%] md:h-[60vw] md:w-[60vw]"
      >
        <div className={`relative h-full w-full ${reduce ? "" : "animate-float-slow"}`}>
          <div className="absolute inset-0 rounded-full sphere-glow" />
          <div className={`absolute inset-0 sphere-ring ${reduce ? "" : "animate-spin-slow"}`} />
        </div>
      </motion.div>
      {/* soft top-left glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[40vw] w-[40vw] rounded-full bg-accent/10 blur-3xl" aria-hidden />
      {/* grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden />
    </>
  );
}

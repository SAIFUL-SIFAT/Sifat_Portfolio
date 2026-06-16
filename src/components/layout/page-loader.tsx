"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const COLUMN_COUNT = 10;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<HTMLDivElement[]>([]);

  const addColRef = (el: HTMLDivElement | null, i: number) => {
    if (el) colRefs.current[i] = el;
  };

  useEffect(() => {
    if (!loaderRef.current) return;

    const cols = colRefs.current.filter(Boolean);
    const name = nameRef.current;

    // Prevent scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    // 1. Start: everything in place, columns cover full screen
    gsap.set(cols, { yPercent: 0 });
    gsap.set(name, { opacity: 0, y: 20 });

    // 2. Fade in the name
    tl.to(name, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // 3. Hold for a beat
    tl.to({}, { duration: 0.6 });

    // 4. Fade name out
    tl.to(name, {
      opacity: 0,
      y: -16,
      duration: 0.45,
      ease: "power2.in",
    });

    // 5. Columns slide up at random speeds — revealing the page
    tl.to(
      cols,
      {
        yPercent: -100,
        duration: () => gsap.utils.random(0.55, 1.0),
        stagger: {
          each: 0.06,
          from: "random",
        },
        ease: "power4.inOut",
      },
      "+=0.05",
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Black columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => addColRef(el, i)}
            className="h-full flex-1 bg-zinc-950"
          />
        ))}
      </div>

      {/* Name centred above the columns */}
      <div
        ref={nameRef}
        className="relative z-10 select-none text-center"
      >
        <p className="font-display text-[clamp(2rem,8vw,5rem)] font-bold uppercase tracking-[0.25em] text-white">
          Shaiful Alam
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-zinc-400">
          Software Engineer
        </p>
      </div>
    </div>
  );
}

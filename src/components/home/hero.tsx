"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <section id="top" className="relative z-10 w-full min-h-screen overflow-x-clip">
      {/* Animated neon shader background — full viewport width/height */}
      <NeonShaderBackground />

      {/* Content container — constrained width, sits above the shader.
          On mobile, the layout is a vertical flow (title → portrait → bio).
          On md+, the portrait is absolutely centered over the title. */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-6 md:min-h-screen md:px-8 md:pb-32 md:pt-10">
        {/* Title — sits behind the image on desktop */}
        <div className="relative z-0">
          <HeroTitle text="SHAIFUL ALAM" />
          <div className="mt-3 flex items-center justify-between gap-3 md:mt-4 md:gap-6">
            <HeroSubtitle text="SOFTWARE" delay={0.4} />
            <HeroSubtitle text="ENGINEER" delay={0.55} className="text-right" />
          </div>
        </div>

        {/* Portrait image.
            - Mobile: static, sits in normal flow right under the title.
            - Desktop: absolutely centered over the title text. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="relative z-10 mx-auto mt-6 aspect-[3/4] w-[55%] max-w-[260px] md:absolute md:left-1/2 md:top-1/2 md:mx-0 md:mt-0 md:w-[36%] md:max-w-sm md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <img
            src="/assets/me.png"
            alt="Shaiful Alam"
            className="h-full w-full object-cover [mask-image:radial-gradient(ellipse_55%_60%_at_center,white_55%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
          />
        </motion.div>

        {/* Bottom row: bio + cta.
            On mobile, sits below the portrait in normal flow with a small
            top gap. On md+, sits in a 2-col grid pinned to the bottom. */}
        <div className="relative z-10 mt-8 grid gap-8 md:mt-20 md:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 0.8 }}
            className="max-w-md"
          >
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg"
            >
              Hey there! I&apos;m a Full-stack engineer specializing in React, TypeScript, NestJS,
              and PostgreSQL — building fast, scalable, and user-focused web applications.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6">
              <Button
                asChild
                className="h-12 rounded-full bg-primary px-7 text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_oklch(0.78_0.16_142/0.6)]"
              >
                <Link href="/contact">Connect</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Animated neon shader background — flowing lines in #7F6F46            */
/* ---------------------------------------------------------------------- */

function NeonShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    const glContext = gl as WebGLRenderingContext;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Recolored to #7F6F46 (warm bronze/gold) instead of teal,
    // and background made transparent-friendly (very dark, near black)
    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float time = u_time * 0.2;

          // Background: near-transparent dark base
          vec3 color = vec3(0.02, 0.02, 0.03);

          // Flowing energy pattern
          float mask = 0.0;
          for (float i = 1.0; i < 4.0; i++) {
              uv.x += 0.3 / i * sin(i * 3.0 * uv.y + time + i * 0.5);
              uv.y += 0.2 / i * cos(i * 2.0 * uv.x + time + i * 0.8);
              mask += abs(0.01 / (uv.x + uv.y - 1.0));
          }

          // Neon glow color: #7F6F46 -> normalized (0.498, 0.435, 0.275)
          vec3 glowColor = vec3(0.498, 0.435, 0.275);
          color += glowColor * mask * 0.6;

          // Vignette
          float d = length(gl_FragCoord.xy / u_resolution.xy - 0.5);
          color *= 1.0 - d * 0.5;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const s = glContext.createShader(type)!;
      glContext.shaderSource(s, src);
      glContext.compileShader(s);
      return s;
    }

    const prog = glContext.createProgram()!;
    glContext.attachShader(prog, compileShader(glContext.VERTEX_SHADER, vs));
    glContext.attachShader(prog, compileShader(glContext.FRAGMENT_SHADER, fs));
    glContext.linkProgram(prog);
    glContext.useProgram(prog);

    const buf = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, buf);
    glContext.bufferData(
      glContext.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      glContext.STATIC_DRAW,
    );

    const posLoc = glContext.getAttribLocation(prog, "a_position");
    glContext.enableVertexAttribArray(posLoc);
    glContext.vertexAttribPointer(posLoc, 2, glContext.FLOAT, false, 0, 0);

    const uTime = glContext.getUniformLocation(prog, "u_time");
    const uRes = glContext.getUniformLocation(prog, "u_resolution");

    let rafId: number;
    function render(t: number) {
      if (!canvas) return;
      if (typeof ResizeObserver === "undefined") syncSize();
      glContext.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) glContext.uniform1f(uTime, t * 0.001);
      if (uRes) glContext.uniform2f(uRes, canvas.width, canvas.height);
      glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-50"
    />
  );
}

/* ---------------------------------------------------------------------- */

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
      className={`font-display text-[10vw] leading-none tracking-wide text-foreground/90 md:text-6xl lg:text-7xl ${className}`}
    >
      {text}
    </motion.h2>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import gsap from "gsap";

const navItems = ["Services", "Skills", "Experience", "Education", "Projects"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() as string;
  const isHomePage = pathname === "/";

  // Refs for GSAP targets
  const overlayRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const initialized = useRef(false);

  // Initialize GSAP state once elements are mounted
  useEffect(() => {
    if (!overlayRef.current || initialized.current) return;
    initialized.current = true;

    const rows = rowRefs.current.filter(Boolean);
    const contents = contentRefs.current.filter(Boolean);

    // Set initial state — completely hidden
    gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(rows, { scaleX: 0, transformOrigin: "right center" });
    gsap.set(contents, { opacity: 0, y: 24 });

    // Build timeline (paused)
    tlRef.current = gsap
      .timeline({ paused: true })
      // 1. Make overlay visible & interactive
      .set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" })
      // 2. Rows sweep in from right → left, staggered
      .to(rows, {
        scaleX: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power4.inOut",
      })
      // 3. Links + content fade + slide up
      .to(
        contents,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.25",
      );
  }, []);

  // Play / reverse when open state changes
  useEffect(() => {
    if (!tlRef.current) return;
    if (open) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNavClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 80;
          const offsetPosition =
            el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 50);
    };

  const addRowRef = (el: HTMLDivElement | null, i: number) => {
    if (el) rowRefs.current[i] = el;
  };

  const addContentRef = (el: HTMLDivElement | null, i: number) => {
    if (el) contentRefs.current[i] = el;
  };

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between bg-background/70 px-5 py-5 backdrop-blur-md md:relative md:bg-transparent md:px-8 md:py-6 md:backdrop-blur-0"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
            <span className="block h-3 w-3 rotate-45 border-2 border-current" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Shaiful Alam
          </span>
        </Link>

        {isHomePage && (
          <>
            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={handleNavClick(item.toLowerCase())}
                  className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/contact"
                className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                asChild
                className="hidden rounded-full border-border/60 bg-transparent px-5 hover:bg-secondary md:inline-flex"
              >
                <a
                  href="/assets/Md_Shaiful_Alam.pdf"
                  download="Md_Shaiful_Alam_Resume.pdf"
                >
                  View Resume
                </a>
              </Button>

              {/* Hamburger — hides when overlay is open (overlay has its own X) */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`relative z-50 grid h-10 w-10 place-items-center rounded-full border border-border/60 md:hidden transition-opacity duration-200 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </motion.header>

      {/* ── Mobile overlay (always in DOM, shown/hidden via GSAP) ── */}
      {isHomePage && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{ visibility: "hidden" }} // initial — GSAP will manage this
        >
          {/* 5 black rows that sweep from right → left */}
          <div className="pointer-events-none absolute inset-0 flex flex-col">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => addRowRef(el, i)}
                className="w-full flex-1 bg-zinc-950"
              />
            ))}
          </div>

          {/* Content layer */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Header row inside overlay */}
            <div
              ref={(el) => addContentRef(el, 0)}
              className="flex items-center justify-between px-5 py-5"
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-white"
                onClick={() => setOpen(false)}
              >
                <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
                  <span className="block h-3 w-3 rotate-45 border-2 border-current" />
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  Shaiful Alam
                </span>
              </Link>
              {/* X close button inside overlay */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-zinc-700 text-white transition-colors hover:border-zinc-400"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
              {navItems.map((item, i) => (
                <div key={item} ref={(el) => addContentRef(el, i + 1)}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={handleNavClick(item.toLowerCase())}
                    className="font-display text-4xl tracking-tight text-zinc-100 transition-colors hover:text-accent"
                  >
                    {item}
                  </a>
                </div>
              ))}

              <div
                ref={(el) => addContentRef(el, navItems.length + 1)}
              >
                <Link
                  href="/contact"
                  className="font-display text-4xl tracking-tight text-zinc-100 transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <div
                ref={(el) => addContentRef(el, navItems.length + 2)}
                className="mt-4"
              >
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full border-zinc-700 bg-transparent px-8 py-6 text-xl text-white hover:bg-zinc-800"
                >
                  <a
                    href="/assets/Md_Shaiful_Alam.pdf"
                    download="Md_Shaiful_Alam_Resume.pdf"
                  >
                    View Resume
                  </a>
                </Button>
              </div>
            </nav>

            <div
              ref={(el) => addContentRef(el, navItems.length + 3)}
              className="px-6 pb-10 pt-4 text-center text-xs uppercase tracking-[0.3em] text-zinc-400"
            >
              © Shaiful Alam
            </div>
          </div>
        </div>
      )}
    </>
  );
}

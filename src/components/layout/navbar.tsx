"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["Services", "Skills", "Experience", "Education", "Projects"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNavClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between bg-background/70 px-5 py-5 backdrop-blur-md md:relative md:bg-transparent md:px-8 md:py-6 md:backdrop-blur-0"
    >
      <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
        <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
          <span className="block h-3 w-3 rotate-45 border-2 border-current" />
        </span>
        <span className="text-lg font-semibold tracking-tight">Shaiful Alam</span>
      </Link>

      {isHomePage && (
        <>
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
              <a href="/assets/Md_Shaiful_Alam.pdf" download="Md_Shaiful_Alam_Resume.pdf">
                View Resume
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </>
      )}

      <AnimatePresence>
        {open && isHomePage && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
                  <span className="block h-3 w-3 rotate-45 border-2 border-current" />
                </span>
                <span className="text-lg font-semibold tracking-tight">Shaiful Alam</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={handleNavClick(item.toLowerCase())}
                    className="font-display text-4xl tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navItems.length, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="font-display text-4xl tracking-tight text-foreground transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            </nav>

            <div className="px-6 pb-10 pt-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              © Shaiful Alam
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

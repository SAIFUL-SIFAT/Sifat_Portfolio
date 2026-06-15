import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["Services", "Portfolio", "Contact"];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-6"
    >
      <a href="/" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
          <span className="block h-3 w-3 rotate-45 border-2 border-current" />
        </span>
        <span className="text-lg font-semibold tracking-tight">James Lux</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden rounded-full border-border/60 bg-transparent px-5 hover:bg-secondary md:inline-flex">
          View Resume
        </Button>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-border/60 md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </motion.header>
  );
}

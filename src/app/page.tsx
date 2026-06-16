"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayers } from "@/components/home/background-layers";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Services } from "@/components/home/services";
import { Experience } from "@/components/home/experience";
import { Education } from "@/components/home/education";
import { Skills } from "@/components/home/skills";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { Button } from "@/components/ui/button";

export default function Index() {
  // Honor deep-linked / refreshed hash routes (e.g. /#skills).
  useHashScroll();

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <BackgroundLayers />
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Experience />
      <Education />
      <Projects />

      {/* CTA section linking to the separate contact page. */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-16 text-center md:px-8 md:pb-32 md:pt-24">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Get in touch
        </span>
        <h3 className="font-display mt-3 text-5xl leading-[0.95] md:text-6xl">
          Let&apos;s build <span className="text-primary">something together.</span>
        </h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Currently open for freelance projects and full-time roles.
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-full bg-primary px-7 text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          <Link href="/contact">Start a conversation</Link>
        </Button>
      </section>

      <Footer />
    </main>
  );
}

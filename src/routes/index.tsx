import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { BackgroundLayers } from "@/components/home/background-layers";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Skills } from "@/components/home/skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "James Lux — Product Designer" },
      { name: "description", content: "Brand, UI & UX designer working in the global marketplace. Open for freelance projects." },
      { property: "og:title", content: "James Lux — Product Designer" },
      { property: "og:description", content: "Brand, UI & UX designer working in the global marketplace." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundLayers />
      <Navbar />
      <Hero />
      <Services />
      <Skills />
    </main>
  );
}

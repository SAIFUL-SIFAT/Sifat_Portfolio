import { Facebook, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/saiful.sifat1234",
    icon: Facebook,
  },
  {
    name: "GitHub",
    href: "https://github.com/SAIFUL-SIFAT",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saiful-alam-322833399/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:sifat.sai3@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/50 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Shaiful Alam. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-transparent text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

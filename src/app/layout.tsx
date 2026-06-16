import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { PageLoader } from "@/components/layout/page-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Shaiful Alam — Software Engineer",
  description:
    "Full-Stack Engineer specializing in React, TypeScript, NestJS, and PostgreSQL. Building fast, scalable web applications. Based in Dhaka, Bangladesh.",
  authors: [{ name: "Shaiful Alam" }],
  openGraph: {
    title: "Shaiful Alam — Software Engineer",
    description:
      "Full-Stack Engineer specializing in React, TypeScript, NestJS, and PostgreSQL. Building fast, scalable web applications. Based in Dhaka, Bangladesh.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
        <Providers>
          <PageLoader />
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

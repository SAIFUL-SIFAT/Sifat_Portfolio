"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayers } from "@/components/home/background-layers";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "@/lib/api/contact.functions";
import { toast } from "sonner";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <BackgroundLayers />
      <Navbar />

      <section className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </span>
            <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Let&apos;s build <br />
              <span className="text-primary">something together.</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Have a project in mind? Reach out and I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            className="grid gap-6 rounded-2xl border border-border/40 bg-background/30 p-8 backdrop-blur-md"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  className="border-border/60 bg-background/50 focus:border-primary/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                  className="border-border/60 bg-background/50 focus:border-primary/60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                required
                disabled={isSubmitting}
                className="border-border/60 bg-background/50 focus:border-primary/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                disabled={isSubmitting}
                className="min-h-[150px] border-border/60 bg-background/50 focus:border-primary/60"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 md:w-auto md:self-start md:px-12"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { site } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

const socialIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  WhatsApp: FaWhatsapp,
};

export function Footer() {
  return (
    <footer id="contact" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
          aria-hidden
        />
        <p className="font-mono text-sm text-accent">{"// let's build something"}</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Have a role or project in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {`I'm currently open to new opportunities. Reach out and let's talk.`}
        </p>

        <MagneticButton
          href={`mailto:${site.email}`}
          className="group mt-9 items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground"
        >
          {site.email}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </MagneticButton>

        <div className="mt-10 flex items-center justify-center gap-5">
          {site.socials.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-cursor-hover
                className="text-muted-foreground transition-colors hover:text-accent cursor-pointer"
              >
                {Icon ? <Icon size={20} /> : social.label}
              </a>
            );
          })}
        </div>
      </Reveal>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. Built with Next.js & Framer Motion.
      </p>
    </footer>
  );
}

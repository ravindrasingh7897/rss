"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { galleryLink, nav, site } from "@/data/content";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/MagneticButton";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => ({ href: item.href, el: document.querySelector(item.href) }))
      .filter((s): s is { href: string; el: Element } => s.el !== null);

    const OFFSET = 96;

    function update() {
      setScrolled(window.scrollY > 8);

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      let current = sections[0]?.href ?? "";
      if (nearBottom && sections.length > 0) {
        current = sections[sections.length - 1].href;
      } else {
        for (const section of sections) {
          if (section.el.getBoundingClientRect().top <= OFFSET) {
            current = section.href;
          }
        }
      }
      setActive(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          data-cursor-hover
          className="font-mono text-sm font-semibold text-foreground cursor-pointer"
        >
          {site.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 relative">
          {nav.map((item) => {
            const isRoute = !item.href.startsWith("#");
            const linkClassName = cn(
              "relative z-10 block px-4 py-2 text-sm rounded-full transition-colors cursor-pointer",
              active === item.href
                ? "text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            );

            return (
              <li key={item.href} className="relative">
                {isRoute ? (
                  <Link href={item.href} data-cursor-hover className={linkClassName}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} data-cursor-hover className={linkClassName}>
                    {item.label}
                  </a>
                )}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <MagneticButton
          href={`mailto:${site.email}`}
          className="hidden md:inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent hover:text-accent"
        >
          Say hello
        </MagneticButton>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          data-cursor-hover
          className="md:hidden text-foreground cursor-pointer"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {[...nav, galleryLink].map((item) => {
                const isRoute = !item.href.startsWith("#");
                const className =
                  "block py-2 text-base text-muted-foreground hover:text-accent cursor-pointer";
                return (
                  <li key={item.href}>
                    {isRoute ? (
                      <Link href={item.href} onClick={() => setOpen(false)} className={className}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} onClick={() => setOpen(false)} className={className}>
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Copy, Sparkles } from "lucide-react";
import { hero, site } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { usePageTransition } from "@/components/PageTransition";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

const pillClassName =
  "items-center justify-center whitespace-nowrap rounded-full border border-border bg-card/80 backdrop-blur px-4 py-[0.3em] mx-[0.2em] mb-[0.4em] text-[13px] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent sm:px-5 sm:text-[15px]";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useIsFinePointer();
  const shouldReduceMotion = useReducedMotion();
  const { displayed, done } = useTypewriter(hero.typewriter);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !finePointer) return;
    video.pause();

    let targetTime = 0;
    let appliedTime = -1;
    let seeking = false;
    let rafId: number;
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    function armWatchdog() {
      clearTimeout(watchdog);
      watchdog = setTimeout(() => {
        seeking = false;
      }, 200);
    }

    function onSeeked() {
      clearTimeout(watchdog);
      seeking = false;
    }

    function onMouseMove(e: MouseEvent) {
      if (!video || !video.duration) return;
      const ratio = clamp(e.clientX / window.innerWidth, 0, 1);
      targetTime = ratio * video.duration;
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!video || !video.duration || seeking) return;
      if (Math.abs(targetTime - appliedTime) < 0.02) return;
      appliedTime = targetTime;
      seeking = true;
      video.currentTime = targetTime;
      armWatchdog();
    }

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(watchdog);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reducedMotion, finePointer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || finePointer) return;

    function showMiddleFrame() {
      if (!video || !video.duration) return;
      video.pause();
      video.currentTime = video.duration / 2;
    }

    if (video.duration) {
      showMiddleFrame();
    } else {
      video.addEventListener("loadedmetadata", showMiddleFrame);
      return () => video.removeEventListener("loadedmetadata", showMiddleFrame);
    }
  }, [reducedMotion, finePointer]);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
    }
  }

  return (
    <section
      id="top"
      className="relative flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
    >
      <div className="absolute inset-0 space-bg" aria-hidden>
        <div className="nebula-blob left-[-10%] top-[-10%] h-[45vw] w-[45vw] bg-emerald-500" aria-hidden />
        <div
          className="nebula-blob right-[5%] top-[10%] h-[38vw] w-[38vw] bg-violet-600 [animation-delay:-7s]"
          aria-hidden
        />
      </div>

      {!reducedMotion && (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src={hero.videoUrl}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70 md:object-[70%_center]"
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90"
        aria-hidden
      />
      <div className="absolute inset-0 bg-accent/10 mix-blend-color" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-15" aria-hidden />

      <div
        className="absolute inset-x-5 top-24 z-10 flex h-28 flex-col items-center justify-center gap-2 text-center sm:inset-x-8 sm:top-28 md:hidden"
        style={{
          opacity: pillsVisible ? 1 : 0,
          transform: pillsVisible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <p className="text-sm tracking-wide text-muted-foreground">{hero.introLines[0]}</p>
        <p className="text-base font-medium leading-snug text-foreground">{hero.introLines[1]}</p>
      </div>

      <div className="relative z-10 flex w-full items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="mb-3 hidden text-[clamp(14px,2.4vw,17px)] font-normal leading-[1.4] text-muted-foreground sm:mb-4 md:block">
            {hero.introLines[0]}
            <br />
            {hero.introLines[1]}
          </p>

          <div className="relative mb-5 text-[clamp(18px,4vw,26px)] font-normal leading-[1.35] sm:mb-6">
            <p aria-hidden className="invisible">
              {hero.typewriter}
            </p>
            <p className="absolute inset-0 text-foreground">
              {displayed}
              {!done && <span className="typewriter-cursor" aria-hidden />}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {hero.pills.map((pill) =>
              pill.href.startsWith("#") ? (
                <a key={pill.label} href={pill.href} data-cursor-hover className={`inline-flex ${pillClassName}`}>
                  {pill.label}
                </a>
              ) : (
                <Link key={pill.label} href={pill.href} data-cursor-hover className={`inline-flex ${pillClassName}`}>
                  {pill.label}
                </Link>
              )
            )}

            <Link
              href="/gallery"
              data-cursor-hover
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                navigateWithTransition("/gallery", { x: e.clientX, y: e.clientY });
              }}
              className={`inline-flex ${pillClassName} gap-1.5 lg:hidden`}
            >
              <Sparkles size={13} />
              Gallery
            </Link>

            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor-hover
              className="group mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent bg-transparent px-4 py-[0.3em] text-[13px] transition-colors duration-200 sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              {copied ? (
                <span className="text-accent">Copied!</span>
              ) : (
                <>
                  <span className="text-accent">Reach me:</span>{" "}
                  <span className="text-foreground transition-colors duration-200 group-hover:text-accent">
                    {site.email}
                  </span>
                </>
              )}
              <Copy size={12} className="text-accent" />
            </button>
          </div>
        </div>

        <div
          className="hidden shrink-0 flex-col items-end gap-6 text-right lg:flex"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <p className="font-mono text-xs tracking-wide text-accent">{"// At a glance"}</p>
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-semibold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience section"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        data-cursor-hover
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground hover:text-accent cursor-pointer hidden md:block"
      >
        <ArrowDown size={20} />
      </motion.a>

      <Link
        href="/gallery"
        aria-label="Open gallery"
        data-cursor-hover
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          navigateWithTransition("/gallery", { x: e.clientX, y: e.clientY });
        }}
        className={`${pillClassName} absolute left-[91.5%] top-[86%] z-10 hidden -translate-x-1/2 -translate-y-1/2 gap-2 lg:inline-flex`}
      >
        <Sparkles size={14} />
        Gallery
      </Link>
    </section>
  );
}

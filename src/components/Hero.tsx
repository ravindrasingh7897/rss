"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Copy, Sparkles } from "lucide-react";
import { hero, site } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { usePageTransition } from "@/components/PageTransition";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

const pillClassName =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-border bg-card/80 backdrop-blur px-4 py-[0.3em] mx-[0.2em] mb-[0.4em] text-[13px] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent sm:px-5 sm:text-[15px]";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = useReducedMotion();
  const { displayed, done } = useTypewriter(hero.typewriter);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Scrub the background video by horizontal mouse movement instead of
  // playing it — the video acts as a filmstrip, not footage.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let targetTime = 0;
    let appliedTime = -1;
    let seeking = false;
    let rafId: number;
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    // A `currentTime` write that the browser decides is a no-op (e.g. we're
    // already clamped at 0 and keep trying to go further left) can silently
    // never fire `seeked` — without this watchdog `seeking` gets stuck at
    // `true` forever and the scrubber permanently stops responding.
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

    // Absolute position mapping, not accumulated delta: the left edge of the
    // screen is always frame 0, the right edge is always the last frame, so
    // the centered pose in the footage lines up with the horizontal centre of
    // the screen and scrubbing works symmetrically in both directions.
    function onMouseMove(e: MouseEvent) {
      if (!video || !video.duration) return;
      const ratio = clamp(e.clientX / window.innerWidth, 0, 1);
      targetTime = ratio * video.duration;
    }

    // Seeks are applied at most once per frame instead of on every raw
    // mousemove event — most video encoding can't keep up with a `currentTime`
    // write on every pixel of mouse movement, which is what reads as freezing.
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
  }, [reducedMotion]);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — nothing to fall back to silently.
    }
  }

  return (
    <section
      id="top"
      className="relative flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
    >
      {/* CSS space backdrop — always visible behind/around the video */}
      <div className="absolute inset-0 space-bg" aria-hidden>
        <div className="nebula-blob left-[-10%] top-[-10%] h-[45vw] w-[45vw] bg-emerald-500" aria-hidden />
        <div
          className="nebula-blob right-[5%] top-[10%] h-[38vw] w-[38vw] bg-violet-600"
          style={{ animationDelay: "-7s" }}
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
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          style={{ objectPosition: "70% center" }}
          aria-hidden
        />
      )}

      {/* Dark cyberpunk colour grade over the footage */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90"
        aria-hidden
      />
      <div className="absolute inset-0 bg-accent/10 mix-blend-color" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-15" aria-hidden />

      <div className="relative z-10 flex w-full items-center justify-between gap-8">
        <div className="max-w-xl">
          <p
            className="mb-3 text-muted-foreground sm:mb-4"
            style={{
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {hero.introLines[0]}
            <br />
            {hero.introLines[1]}
          </p>

          <p
            className="mb-5 text-foreground sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: 54,
            }}
          >
            {displayed}
            {!done && <span className="typewriter-cursor" aria-hidden />}
          </p>

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
                <a key={pill.label} href={pill.href} data-cursor-hover className={pillClassName}>
                  {pill.label}
                </a>
              ) : (
                <Link key={pill.label} href={pill.href} data-cursor-hover className={pillClassName}>
                  {pill.label}
                </Link>
              )
            )}

            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor-hover
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent bg-transparent px-4 py-[0.3em] text-[13px] text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-foreground sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              {copied ? "Copied!" : (
                <>
                  Reach me: <span className="underline underline-offset-1">{site.email}</span>
                </>
              )}
              <Copy size={12} />
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

      {/* Gallery entry point, planted on the sparkle prop in the video
          instead of living in the navbar. Desktop only — the video crops
          differently on narrow/tall viewports so this wouldn't land on the
          sparkle there; mobile users reach the gallery via the menu instead. */}
      <Link
        href="/gallery"
        aria-label="Open gallery"
        data-cursor-hover
        onClick={(e) => {
          // Let modified clicks (open in new tab, etc.) behave normally —
          // only intercept a plain left click to run the wipe transition.
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          navigateWithTransition("/gallery", { x: e.clientX, y: e.clientY });
        }}
        className={`${pillClassName} absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 gap-2 lg:inline-flex`}
        style={{ left: "91.5%", top: "86%" }}
      >
        <Sparkles size={14} />
        Gallery
      </Link>
    </section>
  );
}

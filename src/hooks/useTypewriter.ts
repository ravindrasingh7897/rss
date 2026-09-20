"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useTypewriter(text: string, speed = 38, startDelay = 600, instant = false) {
  const reduced = usePrefersReducedMotion() || instant;
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (reduced) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reduced]);

  return reduced ? { displayed: text, done: true } : { displayed, done };
}

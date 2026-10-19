"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TYPE_SPEED = 45;
const ERASE_SPEED = 28;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_ERASE = 300;

export function useCyclingTypewriter(words: string[]) {
  const reduced = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  useEffect(() => {
    if (reduced || words.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    function typeNext() {
      const word = words[wordIndexRef.current];
      charIndexRef.current += 1;
      setDisplayed(word.slice(0, charIndexRef.current));
      if (charIndexRef.current >= word.length) {
        timeout = setTimeout(eraseNext, PAUSE_AFTER_TYPE);
      } else {
        timeout = setTimeout(typeNext, TYPE_SPEED);
      }
    }

    function eraseNext() {
      const word = words[wordIndexRef.current];
      charIndexRef.current -= 1;
      setDisplayed(word.slice(0, charIndexRef.current));
      if (charIndexRef.current <= 0) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        timeout = setTimeout(typeNext, PAUSE_AFTER_ERASE);
      } else {
        timeout = setTimeout(eraseNext, ERASE_SPEED);
      }
    }

    timeout = setTimeout(typeNext, 400);

    return () => clearTimeout(timeout);
  }, [words, reduced]);

  return reduced ? (words[0] ?? "") : displayed;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

function parseStat(value: string) {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, decimals: 0 };
  const [, prefix, numberStr, suffix] = match;
  const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;
  return { prefix, target: parseFloat(numberStr), suffix, decimals };
}

export function AnimatedStat({ value, start }: { value: string; start: boolean }) {
  const { prefix, target, suffix, decimals } = parseStat(value);
  const [display, setDisplay] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (!start || played.current) return;
    played.current = true;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [start, target]);

  return (
    <>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}

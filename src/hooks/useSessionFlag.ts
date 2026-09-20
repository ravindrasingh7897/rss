"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

export function useSessionFlag(key: string) {
  const getSnapshot = () => sessionStorage.getItem(key) === "1";
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setSessionFlag(key: string) {
  sessionStorage.setItem(key, "1");
}

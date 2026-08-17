"use client";

import { useCallback, useSyncExternalStore } from "react";

import { sessionStorageKey } from "@/lib/api/config";
import type { ApiSession } from "@/lib/api/types";

const sessionChangeEvent = "tennishub:session";

let cachedRaw: string | null = null;
let cachedSession: ApiSession | null = null;

export function readSession(): ApiSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(sessionStorageKey);

  // Cache theo chuỗi thô để useSyncExternalStore luôn nhận cùng một tham chiếu khi chưa đổi.
  if (raw !== cachedRaw) {
    cachedRaw = raw;

    try {
      cachedSession = raw ? (JSON.parse(raw) as ApiSession) : null;
    } catch {
      cachedSession = null;
    }
  }

  return cachedSession;
}

export function writeSession(session: ApiSession | null) {
  if (typeof window === "undefined") return;

  if (session) window.localStorage.setItem(sessionStorageKey, JSON.stringify(session));
  else window.localStorage.removeItem(sessionStorageKey);

  window.dispatchEvent(new Event(sessionChangeEvent));
}

function subscribe(onChange: () => void) {
  window.addEventListener(sessionChangeEvent, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(sessionChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Phiên đăng nhập lưu ở localStorage. `isReady` phân biệt "chưa đọc xong"
 * với "chưa đăng nhập": lần render trên server luôn trả false nên không lệch hydrate.
 */
export function useSession() {
  const session = useSyncExternalStore(subscribe, readSession, () => null);
  const isReady = useSyncExternalStore(subscribe, () => true, () => false);

  const signIn = useCallback((next: ApiSession) => writeSession(next), []);
  const signOut = useCallback(() => writeSession(null), []);

  return { isReady, session, signIn, signOut, token: session?.token ?? null };
}

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { sessionStorageKey } from "@/lib/api/config";
import type { ApiProfile, ApiSession } from "@/lib/api/types";

type SessionContextValue = {
  /** Luôn true trên web (localStorage đọc đồng bộ); giữ lại để các màn hình không phải đổi. */
  isReady: boolean;
  session: ApiSession | null;
  signIn: (session: ApiSession) => void;
  signOut: () => void;
  token: string | null;
  /** Ghi đè hồ sơ đã lưu bằng bản mới nhất từ API, giữ nguyên token đang dùng. */
  updateUser: (user: ApiProfile) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

// localStorage có thể ném lỗi (chế độ riêng tư, bị chặn) nên mọi lần đọc/ghi đều bọc try/catch.
function readStoredSession(): ApiSession | null {
  try {
    const raw = window.localStorage.getItem(sessionStorageKey);
    return raw ? (JSON.parse(raw) as ApiSession) : null;
  } catch {
    return null;
  }
}

function writeStoredSession(next: ApiSession | null) {
  try {
    if (next) window.localStorage.setItem(sessionStorageKey, JSON.stringify(next));
    else window.localStorage.removeItem(sessionStorageKey);
  } catch {
    // Không lưu được thì phiên vẫn sống trong bộ nhớ tới khi tải lại trang.
  }
}

type SessionProviderProps = { children: ReactNode };

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<ApiSession | null>(readStoredSession);
  const isReady = true;

  const signIn = useCallback((next: ApiSession) => {
    setSession(next);
    writeStoredSession(next);
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    writeStoredSession(null);
  }, []);

  const updateUser = useCallback((user: ApiProfile) => {
    setSession((current) => {
      if (!current) return current;

      const next = { ...current, user };
      writeStoredSession(next);
      return next;
    });
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({ isReady, session, signIn, signOut, token: session?.token ?? null, updateUser }),
    [isReady, session, signIn, signOut, updateUser],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Phiên đăng nhập lưu ở localStorage, chia sẻ qua context nên mọi màn hình thấy cùng một trạng thái. */
export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession phải được dùng bên trong SessionProvider.");
  return value;
}

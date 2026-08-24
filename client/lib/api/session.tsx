import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { sessionStorageKey } from "@/lib/api/config";
import type { ApiSession } from "@/lib/api/types";

type SessionContextValue = {
  /** false trong lúc còn đang đọc AsyncStorage, để phân biệt "chưa đọc xong" với "chưa đăng nhập". */
  isReady: boolean;
  session: ApiSession | null;
  signIn: (session: ApiSession) => void;
  signOut: () => void;
  token: string | null;
};

const SessionContext = createContext<SessionContextValue | null>(null);

type SessionProviderProps = { children: ReactNode };

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    let isActive = true;

    AsyncStorage.getItem(sessionStorageKey)
      .then((raw) => {
        if (!isActive || !raw) return;

        try {
          setSession(JSON.parse(raw) as ApiSession);
        } catch {
          setSession(null);
        }
      })
      .finally(() => {
        if (isActive) setIsReady(true);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const signIn = useCallback((next: ApiSession) => {
    setSession(next);
    void AsyncStorage.setItem(sessionStorageKey, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    void AsyncStorage.removeItem(sessionStorageKey);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({ isReady, session, signIn, signOut, token: session?.token ?? null }),
    [isReady, session, signIn, signOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Phiên đăng nhập lưu ở AsyncStorage, chia sẻ qua context nên mọi màn hình thấy cùng một trạng thái. */
export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession phải được dùng bên trong SessionProvider.");
  return value;
}

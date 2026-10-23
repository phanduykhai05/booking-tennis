import { CircleCheck } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { shadow } from "@/components/ui/theme";

type ToastContextValue = { success: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = { children: ReactNode };

/** Một dòng thông báo nổi, tự tắt sau 2,6 giây. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [message, setMessage] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const success = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(text);
    timerRef.current = setTimeout(() => setMessage(""), 2600);
  }, []);

  const value = useMemo(() => ({ success }), [success]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <div className="pointer-events-none fixed inset-x-0 top-14 z-[3000] items-center px-6" role="status">
          <div className="flex-row items-center gap-2 rounded-full bg-white px-4 py-2.5" style={shadow.raised}>
            <CircleCheck color="#0f9b58" size={18} />
            <span className="text-[14px] font-medium text-[#0b5133]">{message}</span>
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast phải được dùng bên trong ToastProvider.");
  return value;
}

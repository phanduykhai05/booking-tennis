import { useEffect, useState, useSyncExternalStore } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const dismissedStorageKey = "tennishub:pwa-install-dismissed";

function getIsStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function subscribeToBrowser() {
  return () => {};
}

function getIsAppleMobile() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function getIsInstallPromptDismissed() {
  return window.localStorage.getItem(dismissedStorageKey) === "true";
}

/**
 * Bản web dựng bằng thẻ DOM: react-native-web đã render ra DOM nên các thẻ này
 * hợp lệ, và đây là API riêng của trình duyệt nên không có tương đương ở native.
 */
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissedThisSession, setIsDismissedThisSession] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const isAppleMobile = useSyncExternalStore(subscribeToBrowser, getIsAppleMobile, () => false);
  const isDismissed = useSyncExternalStore(subscribeToBrowser, getIsInstallPromptDismissed, () => false);
  const isStandalone = useSyncExternalStore(subscribeToBrowser, getIsStandaloneMode, () => false);

  useEffect(() => {
    if (isStandalone || isDismissed || isDismissedThisSession) return;

    const onBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, [isDismissed, isDismissedThisSession, isStandalone]);

  const closePrompt = () => {
    window.localStorage.setItem(dismissedStorageKey, "true");
    setIsDismissedThisSession(true);
    setDeferredPrompt(null);
    setIsInstructionsOpen(false);
  };

  const install = async () => {
    if (isAppleMobile) {
      setIsInstructionsOpen(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    setDeferredPrompt(null);
  };

  if (isStandalone || isDismissed || isDismissedThisSession || (!isAppleMobile && !deferredPrompt)) return null;

  return (
    <>
      <aside
        aria-label="Cài TennisHub"
        className="fixed inset-x-4 z-[10000] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-white px-3 py-3 text-[#173524] shadow-[0_8px_24px_rgba(3,52,32,0.22)]"
        role="dialog"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 6rem)" }}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">Cài TennisHub</p>
          <p className="truncate text-xs text-[#68716d]">Mở nhanh từ màn hình chính.</p>
        </div>
        <button className="shrink-0 rounded-xl bg-[#0f9b58] px-3 py-2 text-sm font-bold text-white" onClick={install} type="button">
          Cài
        </button>
        <button aria-label="Đóng thông báo" className="shrink-0 text-xl leading-none text-[#68716d]" onClick={closePrompt} type="button">
          ×
        </button>
      </aside>

      {isInstructionsOpen && (
        <div aria-modal="true" className="fixed inset-0 z-[10001] flex items-end bg-black/50 p-4 sm:items-center sm:justify-center" role="dialog">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 text-[#173524] shadow-2xl">
            <h2 className="text-lg font-bold">Thêm TennisHub trên iPhone</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-5 text-[#52635a]">
              <li>Mở trang này bằng Safari.</li>
              <li>Nhấn biểu tượng Chia sẻ ở thanh công cụ.</li>
              <li>Chọn “Thêm vào Màn hình chính”, rồi nhấn “Thêm”.</li>
            </ol>
            <button className="mt-5 w-full rounded-xl bg-[#0f9b58] px-4 py-2.5 text-sm font-bold text-white" onClick={closePrompt} type="button">
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}

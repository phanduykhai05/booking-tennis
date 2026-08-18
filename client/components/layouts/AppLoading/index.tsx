import { appLoadingContent } from "@/components/layouts/AppLoading/content";

export default function AppLoading() {
  return (
    <main aria-label={appLoadingContent.label} className="flex min-h-[100dvh] items-center justify-center bg-[#f5f6f5] px-6" role="status">
      <div className="flex flex-col items-center gap-4">
        <div aria-hidden="true" className="relative flex size-20 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(15,155,88,0.16)]">
          <span className="absolute inset-1 rounded-full border-[3px] border-[#d9f6e5]" />
          <span className="size-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-[#bdeed1] border-t-[#0f9b58]" />
          <span className="absolute size-3 rounded-full bg-[#f4ca2d]" />
        </div>
        <p className="text-sm font-semibold text-[#28734d]">{appLoadingContent.label}</p>
      </div>
    </main>
  );
}

import type { HeaderAction } from "@/components/layouts/PublicHeader/types";

type HeaderActionsProps = {
  actions: HeaderAction[];
};

const baseClassName =
  "h-9 flex-1 rounded-lg px-4 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 active:scale-[0.97]";
const variantClassName: Record<HeaderAction["id"], string> = {
  login: "bg-white text-[#0b7a4a] shadow-[0_4px_12px_-3px_rgba(3,52,32,0.5)] hover:bg-emerald-50 hover:shadow-[0_6px_16px_-4px_rgba(3,52,32,0.55)]",
  register: "border border-white/55 bg-white/10 text-white backdrop-blur-sm hover:border-white/80 hover:bg-white/20",
};

export default function HeaderActions({ actions }: HeaderActionsProps) {
  return (
    <div className="flex w-full max-w-[300px] gap-2.5">
      {actions.map((action) => (
        <button className={`${baseClassName} ${variantClassName[action.id]}`} key={action.id} type="button">
          {action.label}
        </button>
      ))}
    </div>
  );
}

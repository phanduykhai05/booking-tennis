import type { AccountLookupMethod } from "@/components/auth/ForgotPassword/types";

type LookupMethodSelectorProps = {
  activeMethod: AccountLookupMethod;
  emailLabel: string;
  onSelect: (method: AccountLookupMethod) => void;
  phoneLabel: string;
  title: string;
};

export default function LookupMethodSelector({ activeMethod, emailLabel, onSelect, phoneLabel, title }: LookupMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-[16px] font-bold text-[#034f30]">{title}</legend>
      <div className="grid grid-cols-2 gap-2.5">
        {([
          { id: "email", label: emailLabel },
          { id: "phone", label: phoneLabel },
        ] as const).map((method) => {
          const isActive = method.id === activeMethod;

          return (
            <button
              aria-pressed={isActive}
              className={`flex h-11 items-center gap-1.5 rounded-md border px-2.5 text-[14px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087a46] min-[375px]:gap-2 min-[375px]:px-3 ${isActive ? "border-[#00b976] bg-[#ecfcf6] text-[#007a47]" : "border-[#d4d4d4] bg-white text-[#164431]"}`}
              key={method.id}
              onClick={() => onSelect(method.id)}
              type="button"
            >
              <span aria-hidden="true" className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive ? "border-[#00b976]" : "border-[#d2d2d2]"}`}>
                {isActive && <span className="h-2 w-2 rounded-full bg-[#00b976]" />}
              </span>
              {method.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

import type { LoginMethod } from "@/components/auth/Login/types";
import styles from "@/components/auth/AuthPageAnimation.module.scss";

type LoginTabsProps = {
  activeMethod: LoginMethod;
  emailLabel: string;
  onSelect: (method: LoginMethod) => void;
  phoneLabel: string;
};

export default function LoginTabs({ activeMethod, emailLabel, onSelect, phoneLabel }: LoginTabsProps) {
  return (
    <div aria-label="Phương thức đăng nhập" className="flex h-16 border-b border-[#d8e1db]" role="tablist">
      {([
        { id: "phone", label: phoneLabel },
        { id: "email", label: emailLabel },
      ] as const).map((tab) => {
        const isActive = activeMethod === tab.id;

        return (
          <button
            aria-selected={isActive}
            className={`relative flex-1 text-[16px] font-bold transition-all duration-300 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#087a46] ${isActive ? `bg-white text-[#034f30] ${styles.activeTab}` : "bg-[#f4f4f4] text-[#8b8b8b]"}`}
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

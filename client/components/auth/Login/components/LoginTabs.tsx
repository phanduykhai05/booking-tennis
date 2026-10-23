import type { LoginMethod } from "@/components/auth/Login/types";
import Touch from "@/components/ui/Pressable";

type LoginTabsProps = {
  activeMethod: LoginMethod;
  emailLabel: string;
  onSelect: (method: LoginMethod) => void;
  phoneLabel: string;
};

export default function LoginTabs({ activeMethod, emailLabel, onSelect, phoneLabel }: LoginTabsProps) {
  const tabs = [
    { id: "phone" as const, label: phoneLabel },
    { id: "email" as const, label: emailLabel },
  ];

  return (
    <div className="h-16 flex-row border-b border-[#d8e1db]">
      {tabs.map((tab) => {
        const isActive = activeMethod === tab.id;

        return (
          <Touch
            aria-selected={isActive}
            role="tab"
            className={`flex-1 items-center justify-center ${isActive ? "rounded-br-[18px] bg-white" : "bg-[#f4f4f4]"}`}
            key={tab.id}
            onPress={() => onSelect(tab.id)}
          >
            <span className={`text-[16px] font-bold ${isActive ? "text-[#034f30]" : "text-[#8b8b8b]"}`}>{tab.label}</span>
          </Touch>
        );
      })}
    </div>
  );
}

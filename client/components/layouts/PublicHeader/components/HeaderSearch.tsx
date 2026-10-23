import { CalendarCheck, Heart, Map, Search } from "lucide-react";
import { useNavigate } from "react-router";
import type { LucideIcon } from "lucide-react";

import { PaddleMark } from "@/components/layouts/PublicHeader/components/HeaderLogo";
import type { HeaderShortcut, HeaderShortcutIcon } from "@/components/layouts/PublicHeader/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type HeaderSearchProps = {
  favoriteLabel: string;
  onChange: (value: string) => void;
  placeholder: string;
  shortcuts: HeaderShortcut[];
  submitLabel: string;
  value: string;
};

const shortcutIcons: Record<HeaderShortcutIcon, LucideIcon> = {
  booked: CalendarCheck,
  favorite: Heart,
  map: Map,
};

const shortcutHrefs: Record<HeaderShortcutIcon, string> = {
  booked: "/bookings",
  favorite: "/account",
  map: "/map",
};

export default function HeaderSearch({ favoriteLabel, onChange, placeholder, shortcuts, submitLabel, value }: HeaderSearchProps) {
  const navigate = useNavigate();

  return (
    // Desktop như bản gốc: ô nhập chiếm nửa trái, các lối tắt chia đều nửa phải trên cùng một thanh.
    <div className="overflow-hidden rounded-2xl bg-white lg:flex-row lg:rounded-lg" style={shadow.raised}>
      <div className="h-11 flex-row items-center gap-2.5 pl-2 pr-2 lg:h-12 lg:w-1/2 lg:flex-none">
        <div className="h-6 justify-center border-r border-[#d4d4d4] pr-1.5">
          <PaddleMark size={24} />
        </div>
        <input
          className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-[#9a9a9a]"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
        <Search color="#0b6b3c" size={20} strokeWidth={2.4} />
        <Touch accessibilityLabel={favoriteLabel} className="h-8 w-8 items-center justify-center rounded-full lg:hidden" onPress={() => navigate("/account")}>
          <Heart color="#0f9b58" size={20} strokeWidth={2} />
        </Touch>
      </div>

      <div aria-label={submitLabel} className="hidden border-slate-200/80 lg:flex lg:flex-1 lg:flex-row">
        {shortcuts.map((shortcut) => {
          const Icon = shortcutIcons[shortcut.icon];

          return (
            <Touch
              className="h-11 flex-1 flex-row items-center justify-center gap-2 lg:h-12 lg:border-l lg:border-slate-200/80"
              key={shortcut.id}
              onPress={() => navigate(shortcutHrefs[shortcut.icon])}
            >
              <Icon color="#0f8f53" size={18} strokeWidth={2} />
              <span className="whitespace-nowrap text-[13px] font-medium text-[#0f8f53] lg:text-[15px]">{shortcut.label}</span>
            </Touch>
          );
        })}
      </div>
    </div>
  );
}

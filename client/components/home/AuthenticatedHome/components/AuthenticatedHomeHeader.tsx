import { Heart, Search } from "lucide-react";
import { useNavigate } from "react-router";

import aloboIcons from "@/components/assets/icons";
import images from "@/components/assets/images";
import { PaddleMark } from "@/components/layouts/PublicHeader/components/HeaderLogo";
import CountryFlag from "@/components/ui/CountryFlag";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type AuthenticatedHomeHeaderProps = {
  avatarInitial: string;
  date: string;
  name: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchValue: string;
};

export default function AuthenticatedHomeHeader({
  avatarInitial,
  date,
  name,
  onSearchChange,
  searchPlaceholder,
  searchValue,
}: AuthenticatedHomeHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="h-[132px] bg-[#087442]">
      <img
        alt=""
        className="object-cover"
        src={images.alobo.homeHeader}
        style={{ bottom: 0, left: 0, opacity: 0.75, position: "absolute", right: 0, top: 0 }}
      />

      <div className="px-4 pt-4">
        <div className="flex-row items-center gap-3">
          <div className="h-14 w-14 items-center justify-center rounded-full bg-[#666bd5]">
            <span className="text-[30px] font-light uppercase text-white">{avatarInitial}</span>
          </div>
          <div className="flex-1">
            <span className="text-[13px] text-white">{date}</span>
            <span className="mt-2 text-[16px] font-bold text-[#ffe049]">{name}</span>
          </div>
          <CountryFlag code="VN" size={22} />
          <Touch accessibilityLabel="Thông báo" className="rounded-full p-1" onPress={() => navigate("/notifications")}>
            <aloboIcons.notification color="#ffffff" height={22} width={22} />
          </Touch>
        </div>
      </div>

      {/* Như bản gốc: ô tìm kiếm (logo, vạch ngăn, kính lúp) và nút yêu thích là hai khối tách rời. */}
      <div className="absolute inset-x-[9px] -bottom-1 flex-row gap-2">
        <div className="h-[42px] flex-1 flex-row items-center gap-2 rounded-lg bg-white pl-2 pr-3" style={shadow.raised}>
          <div className="h-6 justify-center border-r border-[#d4d4d4] pr-1.5">
            <PaddleMark size={24} />
          </div>
          <input
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[#134832] outline-none placeholder:text-[#9a9a9a]"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            value={searchValue}
          />
          <Search color="#0b6b3c" size={20} strokeWidth={2.4} />
        </div>
        <Touch accessibilityLabel="Sân yêu thích" className="h-[42px] w-[42px] items-center justify-center rounded-lg bg-white" style={shadow.raised}>
          <Heart color="#0b6b3c" size={22} strokeWidth={2.2} />
        </Touch>
      </div>
    </div>
  );
}

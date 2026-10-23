import { Heart } from "lucide-react";
import { useNavigate } from "react-router";

import aloboIcons from "@/components/assets/icons";
import images from "@/components/assets/images";
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
          <Touch accessibilityLabel="Thông báo" className="rounded-full p-2" onPress={() => navigate("/notifications")}>
            <aloboIcons.notification color="#ffffff" height={20} width={20} />
          </Touch>
        </div>
      </div>

      <div
        className="absolute inset-x-4 bottom-0 h-11 flex-row items-center rounded-lg bg-white pl-3"
        style={shadow.raised}
      >
        <span className="mr-2 text-[#00a85a]">◉</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#134832] outline-none placeholder:text-[#a5aaa7]"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          value={searchValue}
        />
        <div className="border-l border-[#eef2f0] px-3">
          <aloboIcons.filter color="#134832" height={20} width={20} />
        </div>
        <div className="border-l border-[#eef2f0] px-3">
          <Heart color="#006b3d" size={21} />
        </div>
      </div>
    </div>
  );
}

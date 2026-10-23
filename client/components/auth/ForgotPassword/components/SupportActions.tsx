import { CircleUserRound, MessageSquare } from "lucide-react";

import Touch from "@/components/ui/Pressable";

type SupportActionsProps = {
  fanpageLabel: string;
  /** Bỏ trống khi chưa có contract link hỗ trợ; nút sẽ tắt thay vì mở URL giả. */
  fanpageUrl: string;
  zaloLabel: string;
  zaloUrl: string;
};

export default function SupportActions({ fanpageLabel, fanpageUrl, zaloLabel, zaloUrl }: SupportActionsProps) {
  return (
    <div className="mt-3 flex-row gap-3">
      <Touch
        className="h-11 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-[#2994eb]"
        disabled={!fanpageUrl}
        onPress={() => window.open(fanpageUrl, "_blank", "noopener")}
      >
        <CircleUserRound color="#ffffff" fill="#ffffff" size={20} />
        <span className="text-[14px] font-semibold text-white">{fanpageLabel}</span>
      </Touch>
      <Touch
        className="h-11 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-[#1fc499]"
        disabled={!zaloUrl}
        onPress={() => window.open(zaloUrl, "_blank", "noopener")}
      >
        <MessageSquare color="#ffffff" fill="#ffffff" size={20} />
        <span className="text-[14px] font-semibold text-white">{zaloLabel}</span>
      </Touch>
    </div>
  );
}

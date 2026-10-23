import { X } from "lucide-react";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { useEscapeKey } from "@/lib/useEscapeKey";
import { useWindowDimensions } from "@/lib/useWindowDimensions";

type DrawerProps = {
  children: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: "left" | "right";
  title: string;
  width?: number;
};

/**
 * Panel trượt ngang dùng cho chi tiết đặt sân và form sân bên admin.
 * Trên màn hẹp panel chiếm gần hết bề ngang để form vẫn đọc được.
 */
export default function Drawer({ children, footer, isOpen, onClose, placement = "right", title, width = 460 }: DrawerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = Math.min(width, screenWidth - 40);
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div aria-label={title} aria-modal="true" className={`fixed inset-0 z-[2000] bg-[#0f172a]/45 ${placement === "right" ? "flex-row-reverse" : "flex-row"}`} role="dialog">
      <div className="bg-white" style={{ width: panelWidth, ...shadow.raised }}>
        <div className="flex-row items-center border-b border-slate-200 px-4 py-4">
          <span className="flex-1 text-[17px] font-bold text-slate-900">{title}</span>
          <Touch accessibilityLabel="Đóng" className="-mr-1 p-1" onPress={onClose}>
            <X color="#64748b" size={20} />
          </Touch>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="gap-4 pb-6">{children}</div>
        </div>

        {footer ? <div className="border-t border-slate-200 px-4 py-3">{footer}</div> : null}
      </div>
      <Touch accessibilityLabel="Đóng" className="flex-1" onPress={onClose} />
    </div>
  );
}

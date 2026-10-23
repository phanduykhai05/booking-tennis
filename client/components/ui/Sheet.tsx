import { X } from "lucide-react";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { useEscapeKey } from "@/lib/useEscapeKey";

type SheetProps = {
  children: ReactNode;
  closeLabel: string;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

/** Bottom sheet: nền mờ chạm để đóng, thân sheet cao tối đa 85% màn hình rồi tự cuộn. */
export default function Sheet({ children, closeLabel, footer, isOpen, onClose, title }: SheetProps) {
  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div aria-label={title} aria-modal="true" className="fixed inset-0 z-[2000] justify-end bg-[#081e16]/55" role="dialog">
      <Touch accessibilityLabel={closeLabel} className="flex-1" onPress={onClose} />
      <div className="mx-auto max-h-[85%] w-full max-w-[640px] overflow-hidden rounded-t-[18px] bg-white" style={shadow.sheet}>
        <div className="flex-row items-center border-b border-[#e7e9e8] px-4 py-3">
          <span className="flex-1 text-[17px] font-bold text-[#172720]">{title}</span>
          <Touch accessibilityLabel={closeLabel} className="-mr-1 p-1" onPress={onClose}>
            <X color="#68716d" size={20} />
          </Touch>
        </div>

        <div className="shrink overflow-y-auto px-4 py-3">
          <div className="pb-2">{children}</div>
        </div>

        {footer ? <div className="border-t border-[#e7e9e8] px-4 py-3">{footer}</div> : null}
      </div>
    </div>
  );
}

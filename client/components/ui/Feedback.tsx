import Spinner from "@/components/ui/Spinner";
import { CircleAlert, CircleCheck, Inbox } from "lucide-react";

type MessageProps = { text: string };

export function ErrorMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <div role="alert" className="flex-row items-center gap-1.5 rounded-md bg-[#fdecec] px-3 py-2">
      <CircleAlert color="#b3261e" size={16} />
      <span className="flex-1 text-[13px] font-medium text-[#b3261e]">{text}</span>
    </div>
  );
}

export function SuccessMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <div className="flex-row items-center gap-1.5 rounded-md bg-[#e6f8ee] px-3 py-2">
      <CircleCheck color="#0b5133" size={16} />
      <span className="flex-1 text-[13px] font-medium text-[#0b5133]">{text}</span>
    </div>
  );
}

export function NoticeMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <div className="rounded-md bg-[#fff6e2] px-3 py-2">
      <span className="text-[13px] text-[#8a5b00]">{text}</span>
    </div>
  );
}

type EmptyStateProps = { description: string };

export function EmptyState({ description }: EmptyStateProps) {
  return (
    <div className="items-center gap-2 px-6 py-12">
      <Inbox color="#cbd5e1" size={34} />
      <span className="text-center text-[14px] text-slate-500">{description}</span>
    </div>
  );
}

type LoadingStateProps = { label: string };

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className="items-center gap-3 px-6 py-16">
      <Spinner color="#0f9b58" size="large" />
      <span className="text-center text-[14px] text-slate-500">{label}</span>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
import Link from "next/link";

type SkipLinkProps = {
  label: string;
};

export default function SkipLink({ label }: SkipLinkProps) {
  return (
    <Link
      className="inline-flex items-center gap-0.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
      href="/"
    >
      {label}
      <ChevronRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

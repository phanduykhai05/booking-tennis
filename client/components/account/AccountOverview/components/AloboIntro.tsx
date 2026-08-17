import { Orbit } from "lucide-react";
import Link from "next/link";

type AloboIntroProps = {
  appName: string;
  loginLabel: string;
  offer: string;
  registerLabel: string;
};

export default function AloboIntro({ appName, loginLabel, offer, registerLabel }: AloboIntroProps) {
  return (
    <section className="flex items-center gap-4 px-[18px] pt-7">
      <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#006a37] text-[#83d928] shadow-[inset_0_0_0_6px_#007846]">
        <Orbit size={40} strokeWidth={2.5} />
      </span>
      <div className="min-w-0">
        <h1 className="max-w-[250px] text-[17px] font-bold leading-5 text-[#202124]">{appName}</h1>
        <p className="mt-1 text-[14px] text-[#e7a800]">{offer}</p>
        <div className="mt-1.5 flex gap-4">
          <Link className="flex h-7 items-center rounded-md bg-[#008248] px-4 text-xs font-bold text-white transition hover:bg-[#006c3d]" href="/login">{loginLabel}</Link>
          <Link className="flex h-7 items-center rounded-md border border-[#1b1b1b] bg-white px-4 text-xs font-bold text-[#004d2c] transition hover:bg-[#f4faf7]" href="/register">{registerLabel}</Link>
        </div>
      </div>
    </section>
  );
}

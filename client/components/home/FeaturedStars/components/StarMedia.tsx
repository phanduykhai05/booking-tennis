import Image from "next/image";

type StarMediaProps = {
  alt: string;
  src: string;
};

export default function StarMedia({ alt, src }: StarMediaProps) {
  return (
    <div className="relative size-[126px] overflow-hidden rounded-full border border-white/10 bg-[#07130f]">
      <Image alt={alt} className="object-cover" fill sizes="126px" src={src} />
    </div>
  );
}

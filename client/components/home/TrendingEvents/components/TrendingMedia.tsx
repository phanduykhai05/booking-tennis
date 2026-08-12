import Image from "next/image";

type TrendingMediaProps = {
  alt: string;
  src: string;
};

export default function TrendingMedia({ alt, src }: TrendingMediaProps) {
  return <Image alt={alt} className="object-cover" fill sizes="(max-width: 640px) 78vw, 292px" src={src} />;
}

import Image from "next/image";

type ResaleMediaProps = {
  alt: string;
  src: string;
};

export default function ResaleMedia({ alt, src }: ResaleMediaProps) {
  return <Image alt={alt} className="object-cover" fill sizes="(max-width: 768px) 72vw, 280px" src={src} />;
}

import Image from "next/image";

type EventMediaProps = {
  alt: string;
  src: string;
};

export default function EventMedia({ alt, src }: EventMediaProps) {
  return <Image alt={alt} className="object-cover" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px" src={src} />;
}

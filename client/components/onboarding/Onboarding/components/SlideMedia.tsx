import Image, { type StaticImageData } from "next/image";

type SlideMediaProps = {
  alt: string;
  image: StaticImageData;
};

export default function SlideMedia({ alt, image }: SlideMediaProps) {
  return (
    <div className="relative aspect-[23/20] w-full max-w-[280px] overflow-hidden rounded-[28px]">
      <Image alt={alt} className="object-cover" fill priority sizes="280px" src={image} />
    </div>
  );
}

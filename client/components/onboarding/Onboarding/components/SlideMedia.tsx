type SlideMediaProps = {
  image: string;
};

export default function SlideMedia({ image }: SlideMediaProps) {
  return (
    <div className="aspect-[23/20] w-full max-w-[280px] overflow-hidden rounded-[28px]">
      <img alt="" className="object-cover" src={image} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

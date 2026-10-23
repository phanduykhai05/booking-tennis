type SlideTextProps = {
  description: string;
  title: string;
};

export default function SlideText({ description, title }: SlideTextProps) {
  return (
    <div className="items-center gap-3 px-6">
      <span className="text-center text-[21px] font-bold text-slate-900">{title}</span>
      <span className="text-center text-[15px] text-slate-500">{description}</span>
    </div>
  );
}

type SlideTextProps = {
  description: string;
  title: string;
};

export default function SlideText({ description, title }: SlideTextProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 text-center">
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

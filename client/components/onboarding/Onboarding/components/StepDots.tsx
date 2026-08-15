type StepDotsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  total: number;
};

export default function StepDots({ activeIndex, onSelect, total }: StepDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            aria-current={isActive}
            aria-label={`Đi tới bước ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive ? "w-6 bg-emerald-800" : "w-2 bg-slate-200"
            }`}
            key={index}
            onClick={() => onSelect(index)}
            type="button"
          />
        );
      })}
    </div>
  );
}

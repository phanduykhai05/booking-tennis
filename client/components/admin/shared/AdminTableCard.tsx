type AdminTableCardProps = {
  children: React.ReactNode;
  description?: string;
  title: string;
  toolbar?: React.ReactNode;
};

export default function AdminTableCard({ children, description, title, toolbar }: AdminTableCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_-24px_rgba(15,23,42,0.55)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
        {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
      </div>
      {children}
    </section>
  );
}

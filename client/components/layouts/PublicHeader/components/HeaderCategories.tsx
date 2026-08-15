import Link from "next/link";

const categories = [
  "Nhạc sống",
  "Sân khấu & Nghệ thuật",
  "Thể Thao",
  "Hội thảo & Workshop",
  "Tham quan & Trải nghiệm",
  "Khác",
  "Vé bán lại",
];

export default function HeaderCategories() {
  return (
    <nav aria-label="Danh mục sự kiện" className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1275px] overflow-x-auto px-4 lg:px-2">
        <div className="flex h-[62px] min-w-max items-center gap-8 text-sm font-medium md:gap-10">
          {categories.map((category) => (
            <Link className="whitespace-nowrap transition-colors hover:text-[#2dc275]" href="/" key={category}>
              {category}
            </Link>
          ))}
          <a
            className="whitespace-nowrap transition-colors hover:text-[#2dc275]"
            href="https://blog.ticketbox.vn"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
}

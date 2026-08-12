function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="ml-4 size-6 shrink-0 text-[#828ba0]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM18.5 18.5l-3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function HeaderSearch() {
  return (
    <form className="hidden h-11 w-full max-w-[392px] items-center overflow-hidden rounded-md bg-white md:flex">
      <label className="sr-only" htmlFor="header-search">
        Tìm kiếm sự kiện
      </label>
      <SearchIcon />
      <input
        className="h-full min-w-0 flex-1 px-3 text-sm text-[#2a2d34] outline-none placeholder:text-[#828ba0]"
        id="header-search"
        name="search"
        placeholder="Bạn tìm gì hôm nay?"
        type="search"
      />
      <button
        className="h-5 border-l border-[#e1e5ed] px-4 text-sm font-medium text-[#2a2d34] transition-opacity hover:opacity-70"
        type="submit"
      >
        Tìm kiếm
      </button>
    </form>
  );
}

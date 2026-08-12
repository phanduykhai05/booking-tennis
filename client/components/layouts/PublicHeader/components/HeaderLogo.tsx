import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link
      aria-label="Ticketbox"
      className="mr-4 shrink-0 text-[38px] font-semibold leading-none tracking-[-2.5px] text-white"
      href="/"
    >
      ticketbox
    </Link>
  );
}

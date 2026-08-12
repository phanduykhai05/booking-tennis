function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
      <path d="m10.44 9.11-1.33 1.33-3.56-3.56 1.33-1.33L4.67 3.33 3.33 4.67c0 4.42 3.58 8 8 8l1.34-1.34-2.23-2.22Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
      <path d="M12.5 3h-9A1.5 1.5 0 0 0 2 4.5v7A1.5 1.5 0 0 0 3.5 13h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 3Zm0 1.7L8 8.6 3.5 4.7h9Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5c0 2.65 3.95 6.7 4.12 6.87a.53.53 0 0 0 .76 0c.17-.17 4.12-4.22 4.12-6.87A4.5 4.5 0 0 0 8 2Zm0 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    </svg>
  );
}

const sectionTitle = "mb-3 text-sm font-bold text-[#e5e7eb]";
const detail = "flex items-start gap-1 text-sm leading-6";

export default function FooterContact() {
  return (
    <section>
      <h2 className={sectionTitle}>Hotline</h2>
      <a className={detail} href="tel:19006408">
        <PhoneIcon />
        Thứ 2 - Chủ Nhật (8:00 - 23:00)
      </a>
      <a className="mt-2 block text-lg font-bold text-[#2dc275]" href="tel:19006408">
        1900.6408
      </a>

      <h2 className={`mt-5 ${sectionTitle}`}>Email</h2>
      <a className={detail} href="mailto:khaiduy@ticketbox.vercel.app">
        <MailIcon />
        khaiduy@ticketbox.vercel.app
      </a>

      <h2 className={`mt-5 ${sectionTitle}`}>Văn phòng chính</h2>
      <address className={`${detail} not-italic`}>
        <PinIcon />
        <span>Số 11 Nguyễn Đình Chiểu, phường Sài Gòn, Thành phố Hồ Chí Minh.</span>
      </address>
    </section>
  );
}

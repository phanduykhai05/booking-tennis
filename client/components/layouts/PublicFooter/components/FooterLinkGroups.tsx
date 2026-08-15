type FooterLinkGroupProps = {
  links: Array<{ href: string; label: string }>;
  title: string;
};

function FooterLinkGroup({ links, title }: FooterLinkGroupProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-bold text-[#e5e7eb]">{title}</h2>
      <ul className="space-y-3 text-sm leading-5">
        {links.map(({ href, label }) => (
          <li key={label}>
            <a className="transition-colors hover:text-white" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FooterLinkGroups() {
  return (
    <div className="contents">
      <div className="space-y-8">
        <FooterLinkGroup
          links={[{ href: "/customer-terms-of-use", label: "Điều khoản sử dụng cho khách hàng" }]}
          title="Dành cho Khách hàng"
        />
        <FooterLinkGroup
          links={[{ href: "/organizer-terms-of-use", label: "Điều khoản sử dụng cho ban tổ chức" }]}
          title="Dành cho Ban Tổ chức"
        />
      </div>
      <FooterLinkGroup
        links={[
          { href: "/operational-regulations", label: "Quy chế hoạt động" },
          { href: "/information-privacy-policy", label: "Chính sách bảo mật thông tin" },
          { href: "/dispute-settlement-policy", label: "Cơ chế giải quyết tranh chấp/ khiếu nại" },
          { href: "/payment-privacy-policy", label: "Chính sách bảo mật thanh toán" },
          { href: "/return-and-inspection-policy", label: "Chính sách đổi trả và kiểm hàng" },
          { href: "/shipping-and-delivery-conditions", label: "Điều kiện vận chuyển và giao nhận" },
          { href: "/payment-methods", label: "Phương thức thanh toán" },
        ]}
        title="Về công ty chúng tôi"
      />
    </div>
  );
}

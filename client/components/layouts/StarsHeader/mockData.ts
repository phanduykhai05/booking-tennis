export type StarsHeaderAccount = {
  initial: string;
  label: string;
};

export const starsHeaderMockData = {
  account: {
    initial: "K",
    label: "Tài khoản",
  } satisfies StarsHeaderAccount,
  homeHref: "https://ticketbox.vn",
  logoLabel: "ticketbox",
  myTicketsHref: "https://ticketbox.vn/my-tickets",
  myTicketsLabel: "Vé của tôi",
};

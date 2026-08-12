export type SpecialEvent = {
  href: string;
  id: string;
  imageUrl: string;
  title: string;
};

export const specialEventsMockData = {
  title: "Sự kiện đặc biệt",
  items: [
    {
      href: "https://ticketbox.vn/cocktail-de-rentree-2026-hcm-26268?utm_medium=special-events&utm_source=tkb-homepage",
      id: "cocktail-de-rentree-2026",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/7c/17/71/3cbb46374912f40630e6a9f658b3bab4.jpg",
      title: "Cocktail de Rentrée 2026",
    },
    {
      href: "https://ticketbox.vn/lamour-one-stage-26328?utm_medium=special-events&utm_source=tkb-homepage",
      id: "lamour-one-stage",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/d7/aa/94/a4522509080557d6977183388f28377a.jpg",
      title: "L'Amour One Stage",
    },
    {
      href: "https://ticketbox.vn/stour-2026-26395?utm_medium=special-events&utm_source=tkb-homepage",
      id: "stour-2026",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/3a/01/47/ce9770caf25d827e3d0098c35e502186.jpg",
      title: "S.Tour 2026 – Journey of Passion",
    },
    {
      href: "https://ticketbox.vn/xom-tro-tran-huu-trang-26346?utm_medium=special-events&utm_source=tkb-homepage",
      id: "xom-tro-tran-huu-trang",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/69/43/12/0862b6cf4ce62863aab774588b8b28dc.jpg",
      title: "Xóm Trọ – Trần Hữu Trang",
    },
    {
      href: "https://ticketbox.vn/the-blueverse-nhung-ngay-sau-do-26420?utm_medium=special-events&utm_source=tkb-homepage",
      id: "the-blueverse",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/d3/56/99/4163981c4be93dfdd3cfbc30263cbf45.jpg",
      title: "The Blueverse – Những Ngày Sau Đó",
    },
    {
      href: "https://ticketbox.vn/city-sightseeing-saigon-xe-buyt-2-tang-25948?utm_medium=special-events&utm_source=tkb-homepage",
      id: "city-sightseeing-saigon",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/fc/4a/f0/d0f781b1ac26f56b69ca796f5431db88.png",
      title: "City Sightseeing Saigon – Xe buýt 2 tầng",
    },
    {
      href: "https://ticketbox.vn/the-starry-vocal-night-26409?utm_medium=special-events&utm_source=tkb-homepage",
      id: "the-starry-vocal-night",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/39/ff/22/67770bc90b3e9d47684c227941c77ae2.jpg",
      title: "The Starry Vocal Night",
    },
    {
      href: "https://ticketbox.vn/boc-fest-26344?utm_medium=special-events&utm_source=tkb-homepage",
      id: "boc-fest",
      imageUrl: "https://images.tkbcdn.com/2/360/479/ts/ds/e8/1b/30/c476f0afead613071ccd8b247871ecd6.jpg",
      title: "BOC Fest",
    },
  ] satisfies SpecialEvent[],
};

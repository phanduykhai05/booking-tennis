export type FeaturedStar = {
  href: string;
  id: string;
  imageUrl: string;
  name: string;
};

export const featuredStarsMockData = {
  seeMoreHref: "/stars",
  seeMoreLabel: "Xem thêm",
  title: "Featured Stars",
  items: [
    {
      href: "https://stars.ticketbox.vn/ss-label?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "ss-label",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/80/44/52/f143ddd06c30a353f9830f2886fab35f.jpg",
      name: "SS Label",
    },
    {
      href: "https://stars.ticketbox.vn/phung-khanh-linh?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "phung-khanh-linh",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/c8/8d/2a/7bff570aac6a5b8da3e3978be0a10523.jpeg",
      name: "Phùng Khánh Linh",
    },
    {
      href: "https://stars.ticketbox.vn/jun-pham?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "jun-pham",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/6c/9c/c6/9795b95561c2cdb5f6a26d54ddd4d294.jpg",
      name: "Jun Phạm",
    },
    {
      href: "https://stars.ticketbox.vn/cheng?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "cheng",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/1c/bb/f5/aabba9b832b261727956df145404e1a6.jpg",
      name: "Cheng",
    },
    {
      href: "https://stars.ticketbox.vn/subichadangiu?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "subicha",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/7f/b1/ef/3928ba728b71eda9dca2055579ad6719.png",
      name: "Subicha",
    },
    {
      href: "https://stars.ticketbox.vn/hoang-dung?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "hoang-dung",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/fc/0d/ba/620818361469476b1d42ee28c522860b.jpg",
      name: "Hoàng Dũng",
    },
    {
      href: "https://stars.ticketbox.vn/mr-siro?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "mr-siro",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/80/26/5d/da7a92d2420ce878abe7501dee0decd4.jpeg",
      name: "Mr. Siro",
    },
    {
      href: "https://stars.ticketbox.vn/nguyenvanchung?utm_medium=popular-creator&utm_source=tkb-homepage",
      id: "nguyen-van-chung",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/17/41/14/6767ba2534c92c7b47e93624d33442f6.png",
      name: "Nguyễn Văn Chung",
    },
  ] satisfies FeaturedStar[],
};

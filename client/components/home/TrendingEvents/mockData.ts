export type TrendingEvent = {
  id: string;
  imageUrl: string;
  rank: number;
  title: string;
};

export const trendingEventsMockData = {
  title: "Sự kiện xu hướng",
  items: [
    {
      id: "sao-concert",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b5/15/da/e6461a9460a6f010e98e8b8ccced9fc5.png",
      rank: 1,
      title: "SAO Concert – The Stardom Music Festival",
    },
    {
      id: "unknown-project-26",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/38/ba/bb/0e6970c4c57a2c271efa1b001cdb88da.jpg",
      rank: 2,
      title: "Unknown Project 26 – Scene 1",
    },
    {
      id: "everafter-unfold",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/87/79/61/39a5a9fd0f92576d410ccbb0a0317543.jpg",
      rank: 3,
      title: "Lookmhee & Sonya – Everafter Unfold",
    },
    {
      id: "vocal-show",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b5/74/82/d8011fdc192aa1c655b71f81bb35b016.jpeg",
      rank: 4,
      title: "Vocal Show",
    },
    {
      id: "sao-concert-encore",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b5/15/da/e6461a9460a6f010e98e8b8ccced9fc5.png",
      rank: 5,
      title: "SAO Concert – Encore",
    },
    {
      id: "unknown-project-special",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/38/ba/bb/0e6970c4c57a2c271efa1b001cdb88da.jpg",
      rank: 6,
      title: "Unknown Project – Special Stage",
    },
    {
      id: "everafter-unfold-special",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/87/79/61/39a5a9fd0f92576d410ccbb0a0317543.jpg",
      rank: 7,
      title: "Everafter Unfold – Special Show",
    },
    {
      id: "vocal-show-special",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b5/74/82/d8011fdc192aa1c655b71f81bb35b016.jpeg",
      rank: 8,
      title: "Vocal Show – Special Night",
    },
    {
      id: "sao-concert-night",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b5/15/da/e6461a9460a6f010e98e8b8ccced9fc5.png",
      rank: 9,
      title: "SAO Concert – Special Night",
    },
    {
      id: "unknown-project-finale",
      imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/38/ba/bb/0e6970c4c57a2c271efa1b001cdb88da.jpg",
      rank: 10,
      title: "Unknown Project – Finale",
    },
  ] satisfies TrendingEvent[],
};

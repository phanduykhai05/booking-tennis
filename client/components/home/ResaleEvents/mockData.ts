import type { ResaleEvent } from "@/components/home/ResaleEvents/types";

export const resaleEventsMockData = {
  brandAlt: "Resale Ticket – Vé bán lại",
  brandLabel: "Resale events icon",
  items: [
    {
      date: "06 tháng 09, 2026",
      id: "xoay-tron-concert-hoang-dung",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/08/4e/17/f9e030d4ab618eab76553bbebe08030c.png",
      title: "Xoay Tròn Concert - Hoàng Dũng",
    },
    {
      date: "15 tháng 08, 2026",
      id: "idecaf-tam-cam-dai-chien",
      imageUrl: "https://salt.tkbcdn.com/ts/ds/12/c5/75/d09af12e58cebe049ce432dcf109e26b.jpg",
      title: "Nhà Hát Kịch IDECAF: TẤM CÁM ĐẠI CHIẾN!",
    },
  ] satisfies ResaleEvent[],
};

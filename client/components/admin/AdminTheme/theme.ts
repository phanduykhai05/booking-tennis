import type { ThemeConfig } from "antd";

export const adminBrandColor = "#0f9b58";

export const adminTheme: ThemeConfig = {
  components: {
    Card: { headerFontSize: 16 },
    Layout: {
      bodyBg: "#f5f7f9",
      headerBg: "#ffffff",
      headerHeight: 64,
      headerPadding: "0 24px",
      siderBg: "#ffffff",
    },
    Menu: {
      itemBorderRadius: 10,
      itemHeight: 42,
      itemSelectedBg: "#e8f6ee",
      itemSelectedColor: "#0b7a4a",
    },
    Statistic: { contentFontSize: 26 },
    Table: { headerBg: "#f8fafc", headerColor: "#64748b", rowHoverBg: "#f8fafc" },
  },
  token: {
    borderRadius: 10,
    colorInfo: adminBrandColor,
    colorLink: adminBrandColor,
    colorPrimary: adminBrandColor,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
};

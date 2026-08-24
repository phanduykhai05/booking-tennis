import type { ImageSourcePropType } from "react-native";

/**
 * Ảnh bitmap dùng chung. Metro đóng gói qua `require` nên file nằm ngoài JS bundle.
 * Icon dạng SVG nằm ở `@/components/assets/icons` vì chúng là React component, không phải nguồn ảnh.
 */
const images = {
  alobo: {
    acaCover: require("@/components/assets/images/uploads/alobo/aca_cover.png") as ImageSourcePropType,
    alertBackground: require("@/components/assets/images/uploads/alobo/alert_bg.png") as ImageSourcePropType,
    homeHeader: require("@/components/assets/images/uploads/alobo/home_header.png") as ImageSourcePropType,
    logo: require("@/components/assets/images/uploads/alobo/logo.png") as ImageSourcePropType,
    profileShortcuts: {
      booking: require("@/components/assets/images/uploads/alobo/profile_calendar.png") as ImageSourcePropType,
      course: require("@/components/assets/images/uploads/alobo/profile_course.png") as ImageSourcePropType,
      notification: require("@/components/assets/images/uploads/alobo/profile_notification.png") as ImageSourcePropType,
      offer: require("@/components/assets/images/uploads/alobo/profile_voucher.png") as ImageSourcePropType,
    },
  },
  homeHeader: require("@/components/assets/images/uploads/header/home_header.png") as ImageSourcePropType,
  icons: {
    fire: require("@/components/assets/images/uploads/icons/fire.png") as ImageSourcePropType,
  },
  onboarding: [
    require("@/components/assets/images/uploads/onboarding/onboarding_1.png") as ImageSourcePropType,
    require("@/components/assets/images/uploads/onboarding/onboarding_2.png") as ImageSourcePropType,
    require("@/components/assets/images/uploads/onboarding/onboarding_3.png") as ImageSourcePropType,
    require("@/components/assets/images/uploads/onboarding/onboarding_4.png") as ImageSourcePropType,
  ],
  sports: {
    athletics: require("@/components/assets/images/uploads/sports/athletics.png") as ImageSourcePropType,
    badminton: require("@/components/assets/images/uploads/sports/badminton.png") as ImageSourcePropType,
    basketball: require("@/components/assets/images/uploads/sports/basketball.png") as ImageSourcePropType,
    football: require("@/components/assets/images/uploads/sports/football.png") as ImageSourcePropType,
    pickleball: require("@/components/assets/images/uploads/sports/pickleball.png") as ImageSourcePropType,
    swimming: require("@/components/assets/images/uploads/sports/swimming.png") as ImageSourcePropType,
    tableTennis: require("@/components/assets/images/uploads/sports/table_tennis.png") as ImageSourcePropType,
    taekwondo: require("@/components/assets/images/uploads/sports/taekwondo.png") as ImageSourcePropType,
    tennis: require("@/components/assets/images/uploads/sports/tennis.png") as ImageSourcePropType,
    volleyball: require("@/components/assets/images/uploads/sports/volleyball.png") as ImageSourcePropType,
  },
  venueCovers: {
    football: require("@/components/assets/images/uploads/venues/football_cover.png") as ImageSourcePropType,
    pickleball: require("@/components/assets/images/uploads/venues/pickleball_cover.png") as ImageSourcePropType,
    tennis: require("@/components/assets/images/uploads/venues/tennis_cover.png") as ImageSourcePropType,
  },
};

export default images;

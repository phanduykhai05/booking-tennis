import img_alert_bg_1 from "@/components/assets/images/uploads/alobo/alert_bg.png";
import img_home_header_2 from "@/components/assets/images/uploads/alobo/home_header.png";
import img_profile_calendar_4 from "@/components/assets/images/uploads/alobo/profile_calendar.png";
import img_profile_course_5 from "@/components/assets/images/uploads/alobo/profile_course.png";
import img_profile_notification_6 from "@/components/assets/images/uploads/alobo/profile_notification.png";
import img_profile_voucher_7 from "@/components/assets/images/uploads/alobo/profile_voucher.png";
import img_home_header_8 from "@/components/assets/images/uploads/header/home_header.png";
import img_fire_9 from "@/components/assets/images/uploads/icons/fire.png";
import img_onboarding_1_10 from "@/components/assets/images/uploads/onboarding/onboarding_1.png";
import img_onboarding_2_11 from "@/components/assets/images/uploads/onboarding/onboarding_2.png";
import img_onboarding_3_12 from "@/components/assets/images/uploads/onboarding/onboarding_3.png";
import img_onboarding_4_13 from "@/components/assets/images/uploads/onboarding/onboarding_4.png";
import img_athletics_14 from "@/components/assets/images/uploads/sports/athletics.png";
import img_badminton_15 from "@/components/assets/images/uploads/sports/badminton.png";
import img_basketball_16 from "@/components/assets/images/uploads/sports/basketball.png";
import img_football_17 from "@/components/assets/images/uploads/sports/football.png";
import img_pickleball_18 from "@/components/assets/images/uploads/sports/pickleball.png";
import img_swimming_19 from "@/components/assets/images/uploads/sports/swimming.png";
import img_table_tennis_20 from "@/components/assets/images/uploads/sports/table_tennis.png";
import img_taekwondo_21 from "@/components/assets/images/uploads/sports/taekwondo.png";
import img_tennis_22 from "@/components/assets/images/uploads/sports/tennis.png";
import img_volleyball_23 from "@/components/assets/images/uploads/sports/volleyball.png";
import img_football_cover_24 from "@/components/assets/images/uploads/venues/football_cover.png";
import img_pickleball_cover_25 from "@/components/assets/images/uploads/venues/pickleball_cover.png";
import img_tennis_cover_26 from "@/components/assets/images/uploads/venues/tennis_cover.png";

/**
 * Ảnh bitmap dùng chung. Vite đổi mỗi import ảnh thành URL đã băm tên, dùng thẳng làm `src` của <img>.
 * Icon dạng SVG nằm ở `@/components/assets/icons` vì chúng là React component, không phải nguồn ảnh.
 */
const images = {
  alobo: {
    alertBackground: img_alert_bg_1,
    homeHeader: img_home_header_2,
    profileShortcuts: {
      booking: img_profile_calendar_4,
      course: img_profile_course_5,
      notification: img_profile_notification_6,
      offer: img_profile_voucher_7,
    },
  },
  homeHeader: img_home_header_8,
  icons: {
    fire: img_fire_9,
  },
  onboarding: [
    img_onboarding_1_10,
    img_onboarding_2_11,
    img_onboarding_3_12,
    img_onboarding_4_13,
  ],
  sports: {
    athletics: img_athletics_14,
    badminton: img_badminton_15,
    basketball: img_basketball_16,
    football: img_football_17,
    pickleball: img_pickleball_18,
    swimming: img_swimming_19,
    tableTennis: img_table_tennis_20,
    taekwondo: img_taekwondo_21,
    tennis: img_tennis_22,
    volleyball: img_volleyball_23,
  },
  venueCovers: {
    football: img_football_cover_24,
    pickleball: img_pickleball_cover_25,
    tennis: img_tennis_cover_26,
  },
};

export default images;

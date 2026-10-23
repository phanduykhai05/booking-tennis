/**
 * Icon SVG của bộ alobo. Hậu tố `?react` (vite-plugin-svgr) biến mỗi file .svg thành
 * React component nên chúng nhận prop `color`, `width`, `height` như icon vector khác.
 */
import CalendarIcon from "@/components/assets/images/uploads/alobo/icons/calendar.svg?react";
import EditIcon from "@/components/assets/images/uploads/alobo/icons/edit.svg?react";
import EmailIcon from "@/components/assets/images/uploads/alobo/icons/email.svg?react";
import FilterIcon from "@/components/assets/images/uploads/alobo/icons/filter.svg?react";
import GenderIcon from "@/components/assets/images/uploads/alobo/icons/gender.svg?react";
import HomeActiveIcon from "@/components/assets/images/uploads/alobo/icons/home_active.svg?react";
import HomeIcon from "@/components/assets/images/uploads/alobo/icons/home.svg?react";
import HotNewsActiveIcon from "@/components/assets/images/uploads/alobo/icons/hot_news_active.svg?react";
import HotNewsIcon from "@/components/assets/images/uploads/alobo/icons/hot_news.svg?react";
import LocationIcon from "@/components/assets/images/uploads/alobo/icons/location.svg?react";
import MapActiveIcon from "@/components/assets/images/uploads/alobo/icons/map_active.svg?react";
import MapIcon from "@/components/assets/images/uploads/alobo/icons/map.svg?react";
import MemberIcon from "@/components/assets/images/uploads/alobo/icons/member.svg?react";
import NoteIcon from "@/components/assets/images/uploads/alobo/icons/note.svg?react";
import NotificationIcon from "@/components/assets/images/uploads/alobo/icons/notification.svg?react";
import PersonActiveIcon from "@/components/assets/images/uploads/alobo/icons/person_active.svg?react";
import PersonIcon from "@/components/assets/images/uploads/alobo/icons/person.svg?react";
import PhoneOutlineIcon from "@/components/assets/images/uploads/alobo/icons/phone_outline.svg?react";
import PresentIcon from "@/components/assets/images/uploads/alobo/icons/present.svg?react";
import ProfileClassIcon from "@/components/assets/images/uploads/alobo/icons/profile_class.svg?react";
import ProfileGroupIcon from "@/components/assets/images/uploads/alobo/icons/profile_group.svg?react";
import ProfileInfoIcon from "@/components/assets/images/uploads/alobo/icons/profile_info.svg?react";
import ProfileMembershipIcon from "@/components/assets/images/uploads/alobo/icons/profile_membership.svg?react";
import ProfileSettingIcon from "@/components/assets/images/uploads/alobo/icons/profile_setting.svg?react";
import SearchIcon from "@/components/assets/images/uploads/alobo/icons/search.svg?react";
import SportIcon from "@/components/assets/images/uploads/alobo/icons/sport.svg?react";
import TrophyIcon from "@/components/assets/images/uploads/alobo/icons/trophy.svg?react";

const aloboIcons = {
  calendar: CalendarIcon,
  edit: EditIcon,
  email: EmailIcon,
  filter: FilterIcon,
  gender: GenderIcon,
  home: HomeIcon,
  homeActive: HomeActiveIcon,
  hotNews: HotNewsIcon,
  hotNewsActive: HotNewsActiveIcon,
  location: LocationIcon,
  map: MapIcon,
  mapActive: MapActiveIcon,
  member: MemberIcon,
  note: NoteIcon,
  notification: NotificationIcon,
  person: PersonIcon,
  personActive: PersonActiveIcon,
  phoneOutline: PhoneOutlineIcon,
  present: PresentIcon,
  profileClass: ProfileClassIcon,
  profileGroup: ProfileGroupIcon,
  profileInfo: ProfileInfoIcon,
  profileMembership: ProfileMembershipIcon,
  profileSetting: ProfileSettingIcon,
  search: SearchIcon,
  sport: SportIcon,
  trophy: TrophyIcon,
};

export type AloboIconName = keyof typeof aloboIcons;

export default aloboIcons;

/**
 * Icon SVG của bộ alobo. `react-native-svg-transformer` biến mỗi file .svg thành
 * React component nên chúng nhận prop `color`, `width`, `height` như icon vector khác.
 */
import CalendarIcon from "@/components/assets/images/uploads/alobo/icons/calendar.svg";
import EditIcon from "@/components/assets/images/uploads/alobo/icons/edit.svg";
import EmailIcon from "@/components/assets/images/uploads/alobo/icons/email.svg";
import FilterIcon from "@/components/assets/images/uploads/alobo/icons/filter.svg";
import GenderIcon from "@/components/assets/images/uploads/alobo/icons/gender.svg";
import HomeActiveIcon from "@/components/assets/images/uploads/alobo/icons/home_active.svg";
import HomeIcon from "@/components/assets/images/uploads/alobo/icons/home.svg";
import HotNewsActiveIcon from "@/components/assets/images/uploads/alobo/icons/hot_news_active.svg";
import HotNewsIcon from "@/components/assets/images/uploads/alobo/icons/hot_news.svg";
import LocationIcon from "@/components/assets/images/uploads/alobo/icons/location.svg";
import MapActiveIcon from "@/components/assets/images/uploads/alobo/icons/map_active.svg";
import MapIcon from "@/components/assets/images/uploads/alobo/icons/map.svg";
import MemberIcon from "@/components/assets/images/uploads/alobo/icons/member.svg";
import NoteIcon from "@/components/assets/images/uploads/alobo/icons/note.svg";
import NotificationIcon from "@/components/assets/images/uploads/alobo/icons/notification.svg";
import PersonActiveIcon from "@/components/assets/images/uploads/alobo/icons/person_active.svg";
import PersonIcon from "@/components/assets/images/uploads/alobo/icons/person.svg";
import PhoneOutlineIcon from "@/components/assets/images/uploads/alobo/icons/phone_outline.svg";
import PresentIcon from "@/components/assets/images/uploads/alobo/icons/present.svg";
import ProfileClassIcon from "@/components/assets/images/uploads/alobo/icons/profile_class.svg";
import ProfileGroupIcon from "@/components/assets/images/uploads/alobo/icons/profile_group.svg";
import ProfileInfoIcon from "@/components/assets/images/uploads/alobo/icons/profile_info.svg";
import ProfileMembershipIcon from "@/components/assets/images/uploads/alobo/icons/profile_membership.svg";
import ProfileSettingIcon from "@/components/assets/images/uploads/alobo/icons/profile_setting.svg";
import SearchIcon from "@/components/assets/images/uploads/alobo/icons/search.svg";
import SportIcon from "@/components/assets/images/uploads/alobo/icons/sport.svg";
import TrophyIcon from "@/components/assets/images/uploads/alobo/icons/trophy.svg";

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

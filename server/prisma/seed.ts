import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { hashSync } from 'bcryptjs';

import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const toDate = (value: string) => new Date(`${value}T00:00:00.000Z`);
const at = (value: string) => new Date(value);
const password = hashSync('123456', 10);

// Ngày 'hôm nay' theo giờ Việt Nam để lịch mẫu khớp với client và API.
const todayInAppTimezone = () =>
  new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
  }).format(new Date());

const shiftDate = (value: string, days: number) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const sportCategories = [
  { icon: 'pickleball', id: 'pickleball', label: 'Pickleball', sortOrder: 1 },
  { icon: 'badminton', id: 'badminton', label: 'Cầu lông', sortOrder: 2 },
  { icon: 'football', id: 'football', label: 'Bóng đá', sortOrder: 3 },
  { icon: 'basketball', id: 'basketball', label: 'Bóng rổ', sortOrder: 4 },
  { icon: 'tennis', id: 'tennis', label: 'Quần vợt', sortOrder: 5 },
  { icon: 'volleyball', id: 'volleyball', label: 'Bóng chuyền', sortOrder: 6 },
  { icon: 'tableTennis', id: 'table-tennis', label: 'Bóng bàn', sortOrder: 7 },
  { icon: 'swimming', id: 'swimming', label: 'Bơi lội', sortOrder: 8 },
  { icon: 'taekwondo', id: 'taekwondo', label: 'Taekwondo', sortOrder: 9 },
  { icon: 'athletics', id: 'athletics', label: 'Điền kinh', sortOrder: 10 },
];

const venues = [
  {
    address: '198 Phố Ngọc Hà, phường Ba Đình, Hà Nội',
    closingMinute: 1440,
    coverKey: 'pickleball',
    id: 'muse-pickle',
    isFeatured: true,
    latitude: 21.036,
    logoKey: 'pickleball',
    longitude: 105.8235,
    name: 'Muse Pickle',
    offerCount: 1,
    openingMinute: 360,
    phone: '0847968368',
    rating: 5,
    sportId: 'pickleball',
  },
  {
    address: '50 ngách 31 ngõ 135 Đội Cấn',
    closingMinute: 1380,
    coverKey: 'pickleball',
    id: 'nhf-pickleball',
    isFeatured: false,
    latitude: 21.0335,
    logoKey: 'pickleball',
    longitude: 105.8172,
    name: 'NHF Pickleball',
    offerCount: 0,
    openingMinute: 330,
    phone: '0847968368',
    rating: null,
    sportId: 'pickleball',
  },
  {
    address: '20 Đ. Thụy Khuê, Thụy Khuê, Tây Hồ, Hà Nội',
    closingMinute: 1440,
    coverKey: 'pickleball',
    id: 'pickleball-20-thuy-khue',
    isFeatured: false,
    latitude: 21.0405,
    logoKey: 'pickleball',
    longitude: 105.8285,
    name: 'PickleBall 20 Thụy Khuê',
    offerCount: 0,
    openingMinute: 300,
    phone: '0847968368',
    rating: null,
    sportId: 'pickleball',
  },
  {
    address: 'Số 6/215 P Lê Lai, Máy Chai, Ngô Quyền, Hải Phòng',
    closingMinute: 1320,
    coverKey: 'tennis',
    id: 'family-pickleball',
    isFeatured: false,
    latitude: 20.8628,
    logoKey: 'tennis',
    longitude: 106.6942,
    name: 'Family Pickleball',
    offerCount: 0,
    openingMinute: 360,
    phone: '0847968368',
    rating: 5,
    sportId: 'pickleball',
  },
  {
    address: 'Ngõ 100 Trung Kính, Yên Hòa, Cầu Giấy, Hà Nội',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'trung-kinh-arena',
    isFeatured: false,
    latitude: 21.0201,
    logoKey: 'football',
    longitude: 105.7935,
    name: 'Trung Kính Arena',
    offerCount: 2,
    openingMinute: 330,
    phone: '0847968368',
    rating: 4.8,
    sportId: 'football',
  },
  {
    address: 'Số 12 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'smash-badminton',
    isFeatured: false,
    latitude: 21.0369,
    logoKey: 'badminton',
    longitude: 105.8016,
    name: 'Smash Badminton Center',
    offerCount: 0,
    openingMinute: 360,
    phone: '0847968368',
    rating: 4.6,
    sportId: 'badminton',
  },
  {
    address: '167 Tây Sơn, Quang Trung, Đống Đa, Hà Nội',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'olympia-pickleball',
    isFeatured: true,
    latitude: 21.0074,
    logoKey: 'pickleball',
    longitude: 105.8231,
    name: 'Olympia Pickleball Arena',
    offerCount: 2,
    openingMinute: 330,
    phone: '0912345001',
    rating: 4.9,
    sportId: 'pickleball',
  },
  {
    address: '82 Nguyễn Chí Thanh, Láng Hạ, Đống Đa, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'thanh-cong-tennis',
    isFeatured: false,
    latitude: 21.0219,
    logoKey: 'tennis',
    longitude: 105.8098,
    name: 'Thành Công Tennis Club',
    offerCount: 0,
    openingMinute: 300,
    phone: '0912345002',
    rating: 4.7,
    sportId: 'tennis',
  },
  {
    address: 'Ngõ 68 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'star-football-cau-giay',
    isFeatured: false,
    latitude: 21.0312,
    logoKey: 'football',
    longitude: 105.7989,
    name: 'Star Football Cầu Giấy',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345003',
    rating: 4.5,
    sportId: 'football',
  },
  {
    address: '45 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'victory-badminton',
    isFeatured: false,
    latitude: 21.0328,
    logoKey: 'badminton',
    longitude: 105.7902,
    name: 'Victory Badminton Center',
    offerCount: 0,
    openingMinute: 360,
    phone: '0912345004',
    rating: 4.4,
    sportId: 'badminton',
  },
  {
    address: '291 Khương Trung, Thanh Xuân, Hà Nội',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'the-royal-pickleball',
    isFeatured: false,
    latitude: 20.9946,
    logoKey: 'pickleball',
    longitude: 105.8156,
    name: 'The Royal Pickleball',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345005',
    rating: 4.8,
    sportId: 'pickleball',
  },
  {
    address: '2 Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'my-dinh-sport-center',
    isFeatured: true,
    latitude: 21.0208,
    logoKey: 'football',
    longitude: 105.7644,
    name: 'Mỹ Đình Sport Center',
    offerCount: 3,
    openingMinute: 300,
    phone: '0912345006',
    rating: 4.9,
    sportId: 'football',
  },
  {
    address: '19 Nguyễn Văn Trỗi, Phường 12, Phú Nhuận, TP. Hồ Chí Minh',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'saigon-pickleball-club',
    isFeatured: true,
    latitude: 10.7981,
    logoKey: 'pickleball',
    longitude: 106.6789,
    name: 'Saigon Pickleball Club',
    offerCount: 2,
    openingMinute: 330,
    phone: '0912345007',
    rating: 4.9,
    sportId: 'pickleball',
  },
  {
    address: '128 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'lan-anh-tennis',
    isFeatured: false,
    latitude: 10.7808,
    logoKey: 'tennis',
    longitude: 106.6908,
    name: 'Lan Anh Tennis Club',
    offerCount: 0,
    openingMinute: 300,
    phone: '0912345008',
    rating: 4.7,
    sportId: 'tennis',
  },
  {
    address: '463 Tô Ký, Trung Mỹ Tây, Quận 12, TP. Hồ Chí Minh',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'thanh-long-football',
    isFeatured: false,
    latitude: 10.8615,
    logoKey: 'football',
    longitude: 106.6172,
    name: 'Thành Long Football Arena',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345009',
    rating: 4.6,
    sportId: 'football',
  },
  {
    address: '236 Điện Biên Phủ, Phường 17, Bình Thạnh, TP. Hồ Chí Minh',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'smash-arena-binh-thanh',
    isFeatured: false,
    latitude: 10.8009,
    logoKey: 'badminton',
    longitude: 106.7124,
    name: 'Smash Arena Bình Thạnh',
    offerCount: 0,
    openingMinute: 360,
    phone: '0912345010',
    rating: 4.5,
    sportId: 'badminton',
  },
  {
    address: '12 Đường số 9, Bình An, TP. Thủ Đức, TP. Hồ Chí Minh',
    closingMinute: 1440,
    coverKey: 'pickleball',
    id: 'thu-duc-pickleball',
    isFeatured: false,
    latitude: 10.8003,
    logoKey: 'pickleball',
    longitude: 106.7429,
    name: 'Thủ Đức Pickleball Zone',
    offerCount: 1,
    openingMinute: 360,
    phone: '0912345011',
    rating: 4.6,
    sportId: 'pickleball',
  },
  {
    address: '27 Láng Hạ, Thành Công, Ba Đình, Hà Nội',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'lang-ha-pickleball',
    isFeatured: false,
    latitude: 21.0165,
    logoKey: 'pickleball',
    longitude: 105.8142,
    name: 'Láng Hạ Pickleball',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345012',
    rating: 4.7,
    sportId: 'pickleball',
  },
  {
    address: '9 Đào Tấn, Cống Vị, Ba Đình, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'dao-tan-tennis',
    isFeatured: false,
    latitude: 21.0338,
    logoKey: 'tennis',
    longitude: 105.8107,
    name: 'Đào Tấn Tennis',
    offerCount: 0,
    openingMinute: 300,
    phone: '0912345013',
    rating: 4.6,
    sportId: 'tennis',
  },
  {
    address: '120 Trần Duy Hurng, Trung Hòa, Cầu Giấy, Hà Nội',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'tran-duy-hung-football',
    isFeatured: false,
    latitude: 21.0092,
    logoKey: 'football',
    longitude: 105.7998,
    name: 'Trần Duy Hưng Football',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345014',
    rating: 4.5,
    sportId: 'football',
  },
  {
    address: '55 Vũ Ngọc Phan, Láng Hạ, Đống Đa, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'vu-ngoc-phan-badminton',
    isFeatured: false,
    latitude: 21.0128,
    logoKey: 'badminton',
    longitude: 105.8149,
    name: 'Vũ Ngọc Phan Badminton',
    offerCount: 0,
    openingMinute: 360,
    phone: '0912345015',
    rating: 4.4,
    sportId: 'badminton',
  },
  {
    address: '203 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'giai-phong-pickleball',
    isFeatured: false,
    latitude: 20.9959,
    logoKey: 'pickleball',
    longitude: 105.8412,
    name: 'Giải Phóng Pickleball',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345016',
    rating: 4.6,
    sportId: 'pickleball',
  },
  {
    address: '18 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'nguyen-trai-tennis',
    isFeatured: false,
    latitude: 20.9954,
    logoKey: 'tennis',
    longitude: 105.8036,
    name: 'Nguyễn Trãi Tennis Center',
    offerCount: 0,
    openingMinute: 300,
    phone: '0912345017',
    rating: 4.7,
    sportId: 'tennis',
  },
  {
    address: '90 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    closingMinute: 1440,
    coverKey: 'pickleball',
    id: 'landmark-pickleball',
    isFeatured: true,
    latitude: 10.7947,
    logoKey: 'pickleball',
    longitude: 106.7215,
    name: 'Landmark Pickleball',
    offerCount: 2,
    openingMinute: 330,
    phone: '0912345018',
    rating: 4.9,
    sportId: 'pickleball',
  },
  {
    address: '215 Điện Biên Phủ, Phường 15, Bình Thạnh, TP. Hồ Chí Minh',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'dien-bien-phu-tennis',
    isFeatured: false,
    latitude: 10.8016,
    logoKey: 'tennis',
    longitude: 106.7089,
    name: 'Điện Biên Phủ Tennis',
    offerCount: 0,
    openingMinute: 300,
    phone: '0912345019',
    rating: 4.6,
    sportId: 'tennis',
  },
  {
    address: '175 Hai Bà Trưng, Phường 6, Quận 3, TP. Hồ Chí Minh',
    closingMinute: 1410,
    coverKey: 'football',
    id: 'quan-3-football',
    isFeatured: false,
    latitude: 10.7876,
    logoKey: 'football',
    longitude: 106.6912,
    name: 'Quận 3 Mini Football',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345020',
    rating: 4.5,
    sportId: 'football',
  },
  {
    address: '360 Phan Xích Long, Phường 2, Phú Nhuận, TP. Hồ Chí Minh',
    closingMinute: 1410,
    coverKey: 'pickleball',
    id: 'phan-xich-long-pickleball',
    isFeatured: false,
    latitude: 10.7996,
    logoKey: 'pickleball',
    longitude: 106.6883,
    name: 'Phan Xích Long Pickleball',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345021',
    rating: 4.7,
    sportId: 'pickleball',
  },
  {
    address: '412 Nguyễn Kiệm, Phường 3, Gò Vấp, TP. Hồ Chí Minh',
    closingMinute: 1380,
    coverKey: 'tennis',
    id: 'go-vap-badminton',
    isFeatured: false,
    latitude: 10.8181,
    logoKey: 'badminton',
    longitude: 106.6785,
    name: 'Gò Vấp Badminton Arena',
    offerCount: 0,
    openingMinute: 360,
    phone: '0912345022',
    rating: 4.4,
    sportId: 'badminton',
  },
  {
    address: '88 Cộng Hòa, Phường 4, Tân Bình, TP. Hồ Chí Minh',
    closingMinute: 1440,
    coverKey: 'pickleball',
    id: 'tan-binh-pickleball',
    isFeatured: false,
    latitude: 10.8004,
    logoKey: 'pickleball',
    longitude: 106.6521,
    name: 'Tân Bình Pickleball Zone',
    offerCount: 1,
    openingMinute: 330,
    phone: '0912345023',
    rating: 4.6,
    sportId: 'pickleball',
  },
  {
    address: '12 Nguyễn Khánh Toàn, Cầu Giấy, Hà Nội',
    closingMinute: 1320,
    coverKey: 'tennis',
    id: 'venue-01',
    isFeatured: false,
    latitude: 21.0372,
    logoKey: 'tennis',
    longitude: 105.802,
    name: 'TennisHub Cầu Giấy',
    offerCount: 0,
    openingMinute: 360,
    phone: '0847968368',
    rating: 4.9,
    sportId: 'tennis',
  },
];

type CourtSurface = 'CLAY' | 'HARD' | 'SYNTHETIC';

// Cấu hình sân + bảng giá theo bộ môn, dùng chung cho seedVenues và seedCourts.
const sportPlans: Record<
  string,
  {
    courtCount: number;
    groupName: string;
    isIndoor: boolean;
    offPeakPrice: number;
    peakPrice: number;
    prefix: string;
    surface: CourtSurface;
  }
> = {
  badminton: {
    courtCount: 6,
    groupName: 'Sân cầu lông',
    isIndoor: true,
    offPeakPrice: 90000,
    peakPrice: 140000,
    prefix: 'Sân',
    surface: 'SYNTHETIC',
  },
  basketball: {
    courtCount: 2,
    groupName: 'Sân bóng rổ',
    isIndoor: false,
    offPeakPrice: 200000,
    peakPrice: 300000,
    prefix: 'Sân',
    surface: 'HARD',
  },
  football: {
    courtCount: 4,
    groupName: 'Sân bóng đá',
    isIndoor: false,
    offPeakPrice: 250000,
    peakPrice: 400000,
    prefix: 'Sân',
    surface: 'SYNTHETIC',
  },
  pickleball: {
    courtCount: 5,
    groupName: 'Pickleball',
    isIndoor: false,
    offPeakPrice: 120000,
    peakPrice: 180000,
    prefix: 'Pickleball',
    surface: 'SYNTHETIC',
  },
  tennis: {
    courtCount: 4,
    groupName: 'Sân tennis',
    isIndoor: false,
    offPeakPrice: 150000,
    peakPrice: 220000,
    prefix: 'Tennis',
    surface: 'HARD',
  },
};

const defaultPlan = sportPlans.pickleball;
const planFor = (sportId: string) => sportPlans[sportId] ?? defaultPlan;

// Tiện ích chung + mô tả sinh theo bộ môn cho phần "Thông tin" của bottom sheet.
const sportLabels: Record<string, string> = {
  badminton: 'cầu lông',
  basketball: 'bóng rổ',
  football: 'bóng đá',
  pickleball: 'pickleball',
  tennis: 'quần vợt',
};

const baseAmenities = [
  'Bãi đỗ xe rộng',
  'Wifi miễn phí',
  'Phòng thay đồ',
  'Nước uống tại sân',
];
const sportAmenities: Record<string, string[]> = {
  badminton: ['Sân trong nhà', 'Cho thuê vợt cầu lông'],
  basketball: ['Đèn chiếu sáng ban đêm', 'Khu khán đài'],
  football: ['Cho thuê giày & áo bib', 'Có canteen'],
  pickleball: ['Cho thuê vợt & bóng', 'Huấn luyện viên hỗ trợ'],
  tennis: ['Cho thuê vợt tennis', 'Máy bắn bóng tập luyện'],
};

const buildVenueDescription = (
  name: string,
  sportId: string,
  address: string,
) => {
  const label = sportLabels[sportId] ?? 'thể thao';
  const area = address.split(',').slice(-2).join(',').trim();
  return `${name} là cụm sân ${label} tiêu chuẩn tại ${area}. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.`;
};

const buildVenueAmenities = (sportId: string) => [
  ...baseAmenities,
  ...(sportAmenities[sportId] ?? []),
];

const customers = [
  {
    email: 'minhanh@example.com',
    fullName: 'Nguyễn Minh Anh',
    id: 'customer-01',
    joinedAt: '2026-01-12',
    phone: '0901234567',
    status: 'ACTIVE' as const,
  },
  {
    email: 'quocbao@example.com',
    fullName: 'Trần Quốc Bảo',
    id: 'customer-02',
    joinedAt: '2026-02-03',
    phone: '0912345678',
    status: 'ACTIVE' as const,
  },
  {
    email: 'hoangnam@example.com',
    fullName: 'Lê Hoàng Nam',
    id: 'customer-03',
    joinedAt: '2026-02-19',
    phone: '0987654321',
    status: 'ACTIVE' as const,
  },
  {
    email: 'thaovy@example.com',
    fullName: 'Phạm Thảo Vy',
    id: 'customer-04',
    joinedAt: '2026-03-06',
    phone: '0938112233',
    status: 'ACTIVE' as const,
  },
  {
    email: 'duclong@example.com',
    fullName: 'Vũ Đức Long',
    id: 'customer-05',
    joinedAt: '2026-04-22',
    phone: '0909778899',
    status: 'ACTIVE' as const,
  },
  {
    email: 'thutrang@example.com',
    fullName: 'Đỗ Thu Trang',
    id: 'customer-06',
    joinedAt: '2026-05-17',
    phone: '0966445566',
    status: 'INACTIVE' as const,
  },
  {
    email: 'giahan@example.com',
    fullName: 'Hoàng Gia Hân',
    id: 'customer-07',
    joinedAt: '2026-06-09',
    phone: '0977118822',
    status: 'ACTIVE' as const,
  },
  {
    email: 'tuanviet@example.com',
    fullName: 'Bùi Tuấn Việt',
    id: 'customer-08',
    joinedAt: '2026-07-01',
    phone: '0922334455',
    status: 'ACTIVE' as const,
  },
];

const adminCourts = [
  {
    hourlyRate: 180000,
    id: 'court-01',
    isIndoor: true,
    name: 'Sân 01',
    sortOrder: 1,
    status: 'AVAILABLE' as const,
    surface: 'HARD' as const,
  },
  {
    hourlyRate: 180000,
    id: 'court-02',
    isIndoor: true,
    name: 'Sân 02',
    sortOrder: 2,
    status: 'AVAILABLE' as const,
    surface: 'HARD' as const,
  },
  {
    hourlyRate: 180000,
    id: 'court-03',
    isIndoor: false,
    name: 'Sân 03',
    sortOrder: 3,
    status: 'AVAILABLE' as const,
    surface: 'CLAY' as const,
  },
  {
    hourlyRate: 200000,
    id: 'court-04',
    isIndoor: false,
    name: 'Sân 04',
    sortOrder: 4,
    status: 'AVAILABLE' as const,
    surface: 'SYNTHETIC' as const,
  },
  {
    hourlyRate: 220000,
    id: 'court-05',
    isIndoor: true,
    name: 'Sân 05',
    sortOrder: 5,
    status: 'AVAILABLE' as const,
    surface: 'SYNTHETIC' as const,
  },
  {
    hourlyRate: 180000,
    id: 'court-06',
    isIndoor: false,
    name: 'Sân 06',
    sortOrder: 6,
    status: 'MAINTENANCE' as const,
    surface: 'HARD' as const,
  },
];

const adminBookings = [
  {
    bookingDate: '2026-08-15',
    code: 'TH26081501',
    courtId: 'court-01',
    endMinute: 480,
    id: 'booking-01',
    note: 'Khách cần mượn thêm ống bóng tập.',
    paymentStatus: 'PAID' as const,
    source: 'ONLINE' as const,
    startMinute: 360,
    status: 'CONFIRMED' as const,
    totalPrice: 360000,
    userId: 'customer-01',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081502',
    courtId: 'court-01',
    endMinute: 660,
    id: 'booking-02',
    note: null,
    paymentStatus: 'PARTIAL' as const,
    source: 'ONLINE' as const,
    startMinute: 540,
    status: 'PENDING' as const,
    totalPrice: 420000,
    userId: 'customer-02',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081503',
    courtId: 'court-02',
    endMinute: 570,
    id: 'booking-03',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'COUNTER' as const,
    startMinute: 420,
    status: 'CHECKED_IN' as const,
    totalPrice: 450000,
    userId: 'customer-03',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081504',
    courtId: 'court-02',
    endMinute: 840,
    id: 'booking-04',
    note: null,
    paymentStatus: 'UNPAID' as const,
    source: 'ONLINE' as const,
    startMinute: 720,
    status: 'CONFIRMED' as const,
    totalPrice: 360000,
    userId: 'customer-04',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081505',
    courtId: 'court-03',
    endMinute: 720,
    id: 'booking-05',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'ONLINE' as const,
    startMinute: 480,
    status: 'CONFIRMED' as const,
    totalPrice: 720000,
    userId: 'customer-05',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081506',
    courtId: 'court-04',
    endMinute: 1080,
    id: 'booking-06',
    note: null,
    paymentStatus: 'REFUNDED' as const,
    source: 'ONLINE' as const,
    startMinute: 960,
    status: 'CANCELLED' as const,
    totalPrice: 400000,
    userId: 'customer-06',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081507',
    courtId: 'court-05',
    endMinute: 1260,
    id: 'booking-07',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'COUNTER' as const,
    startMinute: 1140,
    status: 'COMPLETED' as const,
    totalPrice: 440000,
    userId: 'customer-01',
  },
  {
    bookingDate: '2026-08-16',
    code: 'TH26081601',
    courtId: 'court-03',
    endMinute: 540,
    id: 'booking-08',
    note: null,
    paymentStatus: 'PARTIAL' as const,
    source: 'ONLINE' as const,
    startMinute: 420,
    status: 'CONFIRMED' as const,
    totalPrice: 360000,
    userId: 'customer-02',
  },
  {
    bookingDate: '2026-08-15',
    code: 'TH26081509',
    courtId: 'court-04',
    endMinute: 900,
    id: 'booking-09',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'COUNTER' as const,
    startMinute: 780,
    status: 'CONFIRMED' as const,
    totalPrice: 400000,
    userId: 'customer-07',
  },
  {
    bookingDate: '2026-08-14',
    code: 'TH26081401',
    courtId: 'court-01',
    endMinute: 720,
    id: 'booking-10',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'ONLINE' as const,
    startMinute: 600,
    status: 'COMPLETED' as const,
    totalPrice: 360000,
    userId: 'customer-08',
  },
  {
    bookingDate: '2026-08-13',
    code: 'TH26081301',
    courtId: 'court-02',
    endMinute: 1200,
    id: 'booking-11',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'ONLINE' as const,
    startMinute: 1080,
    status: 'COMPLETED' as const,
    totalPrice: 360000,
    userId: 'customer-03',
  },
  {
    bookingDate: '2026-08-12',
    code: 'TH26081201',
    courtId: 'court-05',
    endMinute: 600,
    id: 'booking-12',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'COUNTER' as const,
    startMinute: 420,
    status: 'COMPLETED' as const,
    totalPrice: 660000,
    userId: 'customer-04',
  },
  {
    bookingDate: '2026-08-11',
    code: 'TH26081101',
    courtId: 'court-03',
    endMinute: 1020,
    id: 'booking-13',
    note: null,
    paymentStatus: 'PAID' as const,
    source: 'ONLINE' as const,
    startMinute: 900,
    status: 'COMPLETED' as const,
    totalPrice: 360000,
    userId: 'customer-05',
  },
  {
    bookingDate: '2026-08-10',
    code: 'TH26081001',
    courtId: 'court-04',
    endMinute: 840,
    id: 'booking-14',
    note: null,
    paymentStatus: 'FAILED' as const,
    source: 'ONLINE' as const,
    startMinute: 720,
    status: 'CANCELLED' as const,
    totalPrice: 400000,
    userId: 'customer-06',
  },
];

const adminPayments = [
  {
    amount: 360000,
    bookingId: 'booking-01',
    createdAt: '2026-08-14T20:10:00+07:00',
    id: 'payment-01',
    method: 'E_WALLET' as const,
    paidAt: '2026-08-14T20:11:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081501',
    userId: 'customer-01',
  },
  {
    amount: 150000,
    bookingId: 'booking-02',
    createdAt: '2026-08-15T08:38:00+07:00',
    id: 'payment-02',
    method: 'BANK_TRANSFER' as const,
    paidAt: '2026-08-15T08:40:00+07:00',
    status: 'PARTIAL' as const,
    transactionCode: 'PAY26081502',
    userId: 'customer-02',
  },
  {
    amount: 450000,
    bookingId: 'booking-03',
    createdAt: '2026-08-15T06:40:00+07:00',
    id: 'payment-03',
    method: 'CASH' as const,
    paidAt: '2026-08-15T06:42:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081503',
    userId: 'customer-03',
  },
  {
    amount: 0,
    bookingId: 'booking-04',
    createdAt: '2026-08-15T09:00:00+07:00',
    id: 'payment-04',
    method: 'CASH' as const,
    paidAt: null,
    status: 'UNPAID' as const,
    transactionCode: 'PAY26081504',
    userId: 'customer-04',
  },
  {
    amount: 720000,
    bookingId: 'booking-05',
    createdAt: '2026-08-13T11:15:00+07:00',
    id: 'payment-05',
    method: 'CARD' as const,
    paidAt: '2026-08-13T11:16:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081505',
    userId: 'customer-05',
  },
  {
    amount: 400000,
    bookingId: 'booking-06',
    createdAt: '2026-08-12T14:05:00+07:00',
    id: 'payment-06',
    method: 'E_WALLET' as const,
    paidAt: '2026-08-14T18:00:00+07:00',
    status: 'REFUNDED' as const,
    transactionCode: 'PAY26081506',
    userId: 'customer-06',
  },
  {
    amount: 440000,
    bookingId: 'booking-07',
    createdAt: '2026-08-15T08:02:00+07:00',
    id: 'payment-07',
    method: 'CASH' as const,
    paidAt: '2026-08-15T08:03:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081507',
    userId: 'customer-01',
  },
  {
    amount: 180000,
    bookingId: 'booking-08',
    createdAt: '2026-08-15T10:12:00+07:00',
    id: 'payment-08',
    method: 'BANK_TRANSFER' as const,
    paidAt: '2026-08-15T10:13:00+07:00',
    status: 'PARTIAL' as const,
    transactionCode: 'PAY26081601',
    userId: 'customer-02',
  },
  {
    amount: 400000,
    bookingId: 'booking-09',
    createdAt: '2026-08-15T08:04:00+07:00',
    id: 'payment-09',
    method: 'CASH' as const,
    paidAt: '2026-08-15T08:05:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081509',
    userId: 'customer-07',
  },
  {
    amount: 360000,
    bookingId: 'booking-10',
    createdAt: '2026-08-14T08:10:00+07:00',
    id: 'payment-10',
    method: 'CARD' as const,
    paidAt: '2026-08-14T08:11:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081401',
    userId: 'customer-08',
  },
  {
    amount: 360000,
    bookingId: 'booking-11',
    createdAt: '2026-08-13T16:30:00+07:00',
    id: 'payment-11',
    method: 'E_WALLET' as const,
    paidAt: '2026-08-13T16:31:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081301',
    userId: 'customer-03',
  },
  {
    amount: 660000,
    bookingId: 'booking-12',
    createdAt: '2026-08-12T06:30:00+07:00',
    id: 'payment-12',
    method: 'BANK_TRANSFER' as const,
    paidAt: '2026-08-12T06:31:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081201',
    userId: 'customer-04',
  },
  {
    amount: 360000,
    bookingId: 'booking-13',
    createdAt: '2026-08-11T14:40:00+07:00',
    id: 'payment-13',
    method: 'CARD' as const,
    paidAt: '2026-08-11T14:41:00+07:00',
    status: 'PAID' as const,
    transactionCode: 'PAY26081101',
    userId: 'customer-05',
  },
  {
    amount: 0,
    bookingId: 'booking-14',
    createdAt: '2026-08-10T10:30:00+07:00',
    id: 'payment-14',
    method: 'CARD' as const,
    paidAt: null,
    status: 'FAILED' as const,
    transactionCode: 'PAY26081001',
    userId: 'customer-06',
  },
];

// Lịch bận của Muse Pickle: "booked" thành Booking thật, "locked"/"event" thành CourtBlock.
const museBookedSlots = [
  {
    courtName: 'Pickleball 1',
    date: '2026-08-17',
    endMinute: 1200,
    startMinute: 1080,
    userId: 'customer-01',
  },
  {
    courtName: 'Pickleball 2',
    date: '2026-08-17',
    endMinute: 570,
    startMinute: 420,
    userId: 'customer-02',
  },
  {
    courtName: 'Pickleball 2',
    date: '2026-08-17',
    endMinute: 1140,
    startMinute: 1050,
    userId: 'customer-03',
  },
  {
    courtName: 'Pickleball 3',
    date: '2026-08-17',
    endMinute: 1290,
    startMinute: 1200,
    userId: 'customer-04',
  },
  {
    courtName: 'Pickleball 4',
    date: '2026-08-17',
    endMinute: 1230,
    startMinute: 1140,
    userId: 'customer-05',
  },
  {
    courtName: 'Tennis 1',
    date: '2026-08-17',
    endMinute: 450,
    startMinute: 360,
    userId: 'customer-07',
  },
  {
    courtName: 'Tennis 2',
    date: '2026-08-17',
    endMinute: 1200,
    startMinute: 1110,
    userId: 'customer-08',
  },
  {
    courtName: 'Pickleball 1',
    date: '2026-08-18',
    endMinute: 600,
    startMinute: 480,
    userId: 'customer-04',
  },
  {
    courtName: 'Pickleball 3',
    date: '2026-08-18',
    endMinute: 1320,
    startMinute: 1200,
    userId: 'customer-05',
  },
];

const museBlocks = [
  {
    courtName: 'Pickleball 1',
    date: '2026-08-17',
    endMinute: 420,
    kind: 'LOCKED' as const,
    startMinute: 360,
    title: 'Vệ sinh sân',
  },
  {
    courtName: 'Pickleball 3',
    date: '2026-08-17',
    endMinute: 660,
    kind: 'EVENT' as const,
    startMinute: 540,
    title: 'Giải giao lưu mở rộng',
  },
  {
    courtName: 'Pickleball 4',
    date: '2026-08-17',
    endMinute: 420,
    kind: 'LOCKED' as const,
    startMinute: 360,
    title: 'Bảo dưỡng mặt sân',
  },
  {
    courtName: 'Pickleball 5',
    date: '2026-08-17',
    endMinute: 1320,
    kind: 'LOCKED' as const,
    startMinute: 360,
    title: 'Sửa mặt sân',
  },
  {
    courtName: 'Tennis 1',
    date: '2026-08-17',
    endMinute: 1080,
    kind: 'EVENT' as const,
    startMinute: 960,
    title: 'Lớp huấn luyện thiếu niên',
  },
  {
    courtName: 'Tennis 2',
    date: '2026-08-17',
    endMinute: 480,
    kind: 'LOCKED' as const,
    startMinute: 360,
    title: 'Căng lại lưới',
  },
  {
    courtName: 'Pickleball 5',
    date: '2026-08-18',
    endMinute: 720,
    kind: 'EVENT' as const,
    startMinute: 540,
    title: 'Buổi social sáng',
  },
  {
    courtName: 'Tennis 2',
    date: '2026-08-18',
    endMinute: 540,
    kind: 'LOCKED' as const,
    startMinute: 360,
    title: 'Bảo dưỡng mặt sân',
  },
];

const notifications = [
  {
    createdAt: '2026-08-17T08:30:00+07:00',
    isRead: false,
    kind: 'BOOKING' as const,
    message:
      'Sự kiện SOCIAL SÁNG sẽ bắt đầu sau 30 phút. Hãy chuẩn bị để có buổi chơi thật vui nhé!',
    title: 'Nhắc lịch tham gia sự kiện',
  },
  {
    createdAt: '2026-08-17T07:15:00+07:00',
    isRead: false,
    kind: 'PROMOTION' as const,
    message:
      'Ưu đãi giảm 15% khi đặt sân Pickleball hôm nay đã sẵn sàng cho bạn.',
    title: 'Ưu đãi dành riêng cho bạn',
  },
  {
    createdAt: '2026-08-16T19:05:00+07:00',
    isRead: true,
    kind: 'SYSTEM' as const,
    message:
      'Cập nhật email để bảo mật tài khoản và dễ dàng khôi phục mật khẩu khi cần.',
    title: 'Hoàn thiện thông tin tài khoản',
  },
  {
    createdAt: '2026-08-16T10:00:00+07:00',
    isRead: true,
    kind: 'SYSTEM' as const,
    message: 'Khám phá các quyền lợi mới trong gói hội viên của bạn.',
    title: 'Thông tin gói hội viên',
  },
];

const discoverPosts = [
  {
    labels: ['#thongbaokhoahoc', '#academy'],
    publishedAt: '2026-06-29T14:42:00+07:00',
    type: 'COURSE' as const,
    venueName: 'Sân Cầu Lông H3',
  },
  {
    labels: ['#uudaigohoivien'],
    publishedAt: '2026-07-07T10:43:00+07:00',
    type: 'MEMBER' as const,
    venueName: 'Piko House',
  },
  {
    labels: ['#uudaosantrong'],
    publishedAt: '2026-08-17T12:55:00+07:00',
    type: 'OFFER' as const,
    venueName: 'SixtyNine Pickleball',
  },
  {
    labels: ['#sukiensocial'],
    publishedAt: '2026-08-17T08:25:00+07:00',
    type: 'EVENT' as const,
    venueName: 'Balanca Pickleball Club Hội An',
  },
];

const activityEvents = [
  {
    createdAt: '2026-08-15T09:42:00+07:00',
    entityId: 'booking-07',
    id: 'activity-01',
    message: 'Lịch TH26081507 đã hoàn thành.',
    type: 'BOOKING_UPDATED' as const,
  },
  {
    createdAt: '2026-08-15T09:15:00+07:00',
    entityId: 'booking-03',
    id: 'activity-02',
    message: 'Khách Lê Hoàng Nam đã nhận Sân 02.',
    type: 'BOOKING_UPDATED' as const,
  },
  {
    createdAt: '2026-08-15T08:40:00+07:00',
    entityId: 'payment-02',
    id: 'activity-03',
    message: 'Đã ghi nhận đặt cọc cho lịch TH26081502.',
    type: 'PAYMENT_UPDATED' as const,
  },
  {
    createdAt: '2026-08-15T08:05:00+07:00',
    entityId: 'booking-09',
    id: 'activity-04',
    message: 'Lịch TH26081509 được tạo từ quầy.',
    type: 'BOOKING_CREATED' as const,
  },
];

async function reset() {
  await prisma.eventTicket.deleteMany();
  await prisma.venueEvent.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.courtBlock.deleteMany();
  await prisma.court.deleteMany();
  await prisma.courtGroup.deleteMany();
  await prisma.priceRule.deleteMany();
  await prisma.venueBadge.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.passwordReset.deleteMany();
  await prisma.user.deleteMany();
  await prisma.sportCategory.deleteMany();
  await prisma.discoverPost.deleteMany();
  await prisma.activityEvent.deleteMany();
}

async function seedUsers() {
  await prisma.user.create({
    data: {
      email: 'admin@tennishub.vn',
      fullName: 'Quản trị TennisHub',
      id: 'user-admin',
      passwordHash: password,
      phone: '0847968368',
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      birthYear: 2000,
      fullName: 'khải duy',
      gender: 'Khác',
      id: 'user-demo',
      passwordHash: password,
      phone: '0900000001',
      role: 'USER',
    },
  });

  for (const customer of customers) {
    await prisma.user.create({
      data: {
        createdAt: toDate(customer.joinedAt),
        email: customer.email,
        fullName: customer.fullName,
        id: customer.id,
        passwordHash: password,
        phone: customer.phone,
        status: customer.status,
      },
    });
  }
}

async function seedVenues() {
  for (const venue of venues) {
    await prisma.venue.create({
      data: {
        ...venue,
        amenities: buildVenueAmenities(venue.sportId),
        description: buildVenueDescription(
          venue.name,
          venue.sportId,
          venue.address,
        ),
      },
    });

    await prisma.venueBadge.createMany({
      data: [
        {
          code: 'single',
          label: 'Đơn ngày',
          sortOrder: 1,
          tone: 'SINGLE',
          venueId: venue.id,
        },
        {
          code: 'event',
          label: 'Sự kiện',
          sortOrder: 2,
          tone: 'EVENT',
          venueId: venue.id,
        },
      ],
    });

    const plan = planFor(venue.sportId);
    await prisma.priceRule.createMany({
      data: [
        {
          endMinute: 960,
          label: 'Giờ thường 06:00 - 16:00',
          pricePerHour: plan.offPeakPrice,
          sortOrder: 1,
          startMinute: 360,
          venueId: venue.id,
        },
        {
          endMinute: 1320,
          label: 'Giờ cao điểm 16:00 - 22:00',
          pricePerHour: plan.peakPrice,
          sortOrder: 2,
          startMinute: 960,
          venueId: venue.id,
        },
      ],
    });
  }
}

async function seedCourts() {
  // Muse Pickle dùng đúng sơ đồ sân của màn đặt lịch trực quan.
  const pickleGroup = await prisma.courtGroup.create({
    data: { name: 'Pickleball', sortOrder: 1, venueId: 'muse-pickle' },
  });
  const tennisGroup = await prisma.courtGroup.create({
    data: { name: 'Tennis', sortOrder: 2, venueId: 'muse-pickle' },
  });

  for (let index = 1; index <= 5; index += 1) {
    await prisma.court.create({
      data: {
        groupId: pickleGroup.id,
        hourlyRate: 120000,
        isIndoor: false,
        name: `Pickleball ${index}`,
        sortOrder: index,
        status: index === 5 ? 'MAINTENANCE' : 'AVAILABLE',
        surface: 'SYNTHETIC',
        venueId: 'muse-pickle',
      },
    });
  }

  for (let index = 1; index <= 2; index += 1) {
    await prisma.court.create({
      data: {
        groupId: tennisGroup.id,
        hourlyRate: 180000,
        isIndoor: false,
        name: `Tennis ${index}`,
        sortOrder: index,
        status: 'AVAILABLE',
        surface: 'HARD',
        venueId: 'muse-pickle',
      },
    });
  }

  // Các sân công khai còn lại: sinh sân theo đúng bộ môn của venue.
  for (const venue of venues.filter(
    (item) => item.id !== 'muse-pickle' && item.id !== 'venue-01',
  )) {
    const plan = planFor(venue.sportId);
    const group = await prisma.courtGroup.create({
      data: { name: plan.groupName, sortOrder: 1, venueId: venue.id },
    });

    for (let index = 1; index <= plan.courtCount; index += 1) {
      await prisma.court.create({
        data: {
          groupId: group.id,
          hourlyRate: plan.peakPrice,
          isIndoor: plan.isIndoor,
          name: `${plan.prefix} ${index}`,
          sortOrder: index,
          // Sân cuối của mỗi venue để bảo trì cho lưới lịch có ô "Khoá".
          status:
            index === plan.courtCount && plan.courtCount > 2
              ? 'MAINTENANCE'
              : 'AVAILABLE',
          surface: plan.surface,
          venueId: venue.id,
        },
      });
    }
  }

  const adminGroup = await prisma.courtGroup.create({
    data: { name: 'Sân tiêu chuẩn', sortOrder: 1, venueId: 'venue-01' },
  });

  for (const court of adminCourts) {
    await prisma.court.create({
      data: { ...court, groupId: adminGroup.id, venueId: 'venue-01' },
    });
  }
}

async function seedAdminBookings() {
  for (const booking of adminBookings) {
    await prisma.booking.create({
      data: {
        ...booking,
        bookingDate: toDate(booking.bookingDate),
        venueId: 'venue-01',
      },
    });
  }

  for (const payment of adminPayments) {
    await prisma.payment.create({
      data: {
        ...payment,
        createdAt: at(payment.createdAt),
        paidAt: payment.paidAt ? at(payment.paidAt) : null,
      },
    });
  }

  for (const activity of activityEvents) {
    await prisma.activityEvent.create({
      data: { ...activity, createdAt: at(activity.createdAt) },
    });
  }
}

// Lịch mẫu bám theo ngày chạy seed: 2026-08-17 -> hôm nay, 2026-08-18 -> ngày mai.
function relativeScheduleDate(sourceDate: string) {
  return shiftDate(todayInAppTimezone(), sourceDate === '2026-08-18' ? 1 : 0);
}

async function seedMuseSchedule() {
  const courts = await prisma.court.findMany({
    where: { venueId: 'muse-pickle' },
  });
  const courtByName = new Map(courts.map((court) => [court.name, court]));

  for (const [index, slot] of museBookedSlots.entries()) {
    const court = courtByName.get(slot.courtName);
    if (!court) continue;

    const slotDate = relativeScheduleDate(slot.date);

    const hours = (slot.endMinute - slot.startMinute) / 60;
    await prisma.booking.create({
      data: {
        bookingDate: toDate(slotDate),
        code: `MP${slotDate.replaceAll('-', '').slice(2)}${(index + 1).toString().padStart(2, '0')}`,
        courtId: court.id,
        endMinute: slot.endMinute,
        paymentStatus: 'PAID',
        source: 'ONLINE',
        startMinute: slot.startMinute,
        status: 'CONFIRMED',
        totalPrice: Math.round(court.hourlyRate * hours),
        userId: slot.userId,
        venueId: 'muse-pickle',
      },
    });
  }

  for (const block of museBlocks) {
    const court = courtByName.get(block.courtName);
    if (!court) continue;

    await prisma.courtBlock.create({
      data: {
        blockDate: toDate(relativeScheduleDate(block.date)),
        courtId: court.id,
        endMinute: block.endMinute,
        kind: block.kind,
        startMinute: block.startMinute,
        title: block.title,
      },
    });
  }
}

// Sự kiện trải từ hôm nay đến 6 ngày sau để trang chi tiết luôn có lịch sắp tới.
async function seedEvents() {
  const today = todayInAppTimezone();
  const eventDates = Array.from({ length: 7 }, (_, offset) =>
    toDate(shiftDate(today, offset)),
  );

  for (const venue of venues.filter((item) => item.id !== 'venue-01')) {
    const plan = planFor(venue.sportId);
    const courtLabel = `${plan.prefix} 1 - 2`;

    for (const [index, eventDate] of eventDates.entries()) {
      await prisma.venueEvent.createMany({
        data: [
          {
            capacity: 10,
            courtLabel,
            endMinute: 720,
            eventDate,
            price: 60000,
            soldCount: (index * 2) % 9,
            startMinute: 540,
            title: 'SOCIAL SÁNG',
            venueId: venue.id,
          },
          {
            capacity: 10,
            courtLabel,
            endMinute: 960,
            eventDate,
            price: 70000,
            soldCount: (index * 3) % 9,
            startMinute: 780,
            title: 'SOCIAL CHIỀU',
            venueId: venue.id,
          },
        ],
      });
    }
  }
}

// Lịch bận mẫu cho các venue mới: vài booking + một ô sự kiện cho hôm nay và ngày mai,
// để lưới lịch của mọi sân đều có ô "Đã đặt" / "Sự kiện" khi mở lên.
async function seedGenericSchedules() {
  const customerIds = customers.map((customer) => customer.id);
  const venueIds = venues
    .filter((item) => item.id !== 'muse-pickle' && item.id !== 'venue-01')
    .map((item) => item.id);

  // Khung giờ mẫu (phút): sáng, trưa, chiều tối — lệch nhau theo từng sân.
  const slotTemplates = [
    { endMinute: 480, startMinute: 420 },
    { endMinute: 690, startMinute: 600 },
    { endMinute: 1170, startMinute: 1080 },
    { endMinute: 1290, startMinute: 1200 },
  ];

  for (const [venueIndex, venueId] of venueIds.entries()) {
    const courts = await prisma.court.findMany({
      orderBy: { sortOrder: 'asc' },
      where: { status: 'AVAILABLE', venueId },
    });
    if (courts.length === 0) continue;

    for (const dayOffset of [0, 1]) {
      const dateValue = shiftDate(todayInAppTimezone(), dayOffset);
      const bookingDate = toDate(dateValue);

      // 2 booking mỗi ngày, rải trên các sân khác nhau.
      for (let n = 0; n < 2; n += 1) {
        const court = courts[(venueIndex + n + dayOffset) % courts.length];
        const slot = slotTemplates[(venueIndex + n) % slotTemplates.length];
        const hours = (slot.endMinute - slot.startMinute) / 60;

        await prisma.booking.create({
          data: {
            bookingDate,
            code: `GN${dateValue.replaceAll('-', '').slice(2)}${venueIndex}${n}`,
            courtId: court.id,
            endMinute: slot.endMinute,
            paymentStatus: 'PAID',
            source: 'ONLINE',
            startMinute: slot.startMinute,
            status: 'CONFIRMED',
            totalPrice: Math.round(court.hourlyRate * hours),
            userId: customerIds[(venueIndex + n) % customerIds.length],
            venueId,
          },
        });
      }

      // Một ô sự kiện buổi tối trên sân đầu tiên.
      await prisma.courtBlock.create({
        data: {
          blockDate: bookingDate,
          courtId: courts[0].id,
          endMinute: 1140,
          kind: 'EVENT',
          startMinute: 1020,
          title: 'Giải giao lưu nội bộ',
        },
      });
    }
  }
}

async function seedFeed() {
  for (const notification of notifications) {
    await prisma.notification.create({
      data: {
        ...notification,
        createdAt: at(notification.createdAt),
        userId: 'user-demo',
      },
    });
  }

  for (const post of discoverPosts) {
    await prisma.discoverPost.create({
      data: { ...post, publishedAt: at(post.publishedAt) },
    });
  }
}

async function main() {
  await reset();
  await prisma.sportCategory.createMany({ data: sportCategories });
  await seedUsers();
  await seedVenues();
  await seedCourts();
  await seedAdminBookings();
  await seedMuseSchedule();
  await seedGenericSchedules();
  await seedEvents();
  await seedFeed();

  const courtCount = await prisma.court.count();
  console.log(
    'Seed hoàn tất: %d địa điểm, %d sân, %d người dùng. Lịch mẫu cho hôm nay và ngày mai.',
    venues.length,
    courtCount,
    customers.length + 2,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

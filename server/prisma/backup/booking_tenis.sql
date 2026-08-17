--
-- PostgreSQL database dump
--

\restrict tjVuT7iL2wepQtgOMQTEoFFXGLVuwHx1UJJbzh0YILbkWBDlCDaf5WavpTiV2hJ

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Venue" DROP CONSTRAINT IF EXISTS "Venue_sportId_fkey";
ALTER TABLE IF EXISTS ONLY public."VenueEvent" DROP CONSTRAINT IF EXISTS "VenueEvent_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."VenueBadge" DROP CONSTRAINT IF EXISTS "VenueBadge_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."PriceRule" DROP CONSTRAINT IF EXISTS "PriceRule_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."Payment" DROP CONSTRAINT IF EXISTS "Payment_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Payment" DROP CONSTRAINT IF EXISTS "Payment_bookingId_fkey";
ALTER TABLE IF EXISTS ONLY public."PasswordReset" DROP CONSTRAINT IF EXISTS "PasswordReset_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Notification" DROP CONSTRAINT IF EXISTS "Notification_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."EventTicket" DROP CONSTRAINT IF EXISTS "EventTicket_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."EventTicket" DROP CONSTRAINT IF EXISTS "EventTicket_eventId_fkey";
ALTER TABLE IF EXISTS ONLY public."Court" DROP CONSTRAINT IF EXISTS "Court_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."Court" DROP CONSTRAINT IF EXISTS "Court_groupId_fkey";
ALTER TABLE IF EXISTS ONLY public."CourtGroup" DROP CONSTRAINT IF EXISTS "CourtGroup_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."CourtBlock" DROP CONSTRAINT IF EXISTS "CourtBlock_courtId_fkey";
ALTER TABLE IF EXISTS ONLY public."Booking" DROP CONSTRAINT IF EXISTS "Booking_venueId_fkey";
ALTER TABLE IF EXISTS ONLY public."Booking" DROP CONSTRAINT IF EXISTS "Booking_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Booking" DROP CONSTRAINT IF EXISTS "Booking_courtId_fkey";
DROP INDEX IF EXISTS public."Venue_sportId_idx";
DROP INDEX IF EXISTS public."VenueEvent_venueId_eventDate_idx";
DROP INDEX IF EXISTS public."VenueBadge_venueId_code_key";
DROP INDEX IF EXISTS public."User_phone_key";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."PriceRule_venueId_idx";
DROP INDEX IF EXISTS public."Payment_userId_idx";
DROP INDEX IF EXISTS public."Payment_transactionCode_key";
DROP INDEX IF EXISTS public."Payment_bookingId_idx";
DROP INDEX IF EXISTS public."PasswordReset_userId_idx";
DROP INDEX IF EXISTS public."Notification_userId_createdAt_idx";
DROP INDEX IF EXISTS public."EventTicket_userId_idx";
DROP INDEX IF EXISTS public."EventTicket_eventId_idx";
DROP INDEX IF EXISTS public."DiscoverPost_publishedAt_idx";
DROP INDEX IF EXISTS public."Court_venueId_idx";
DROP INDEX IF EXISTS public."Court_groupId_idx";
DROP INDEX IF EXISTS public."CourtGroup_venueId_name_key";
DROP INDEX IF EXISTS public."CourtBlock_courtId_blockDate_idx";
DROP INDEX IF EXISTS public."Booking_venueId_bookingDate_idx";
DROP INDEX IF EXISTS public."Booking_userId_idx";
DROP INDEX IF EXISTS public."Booking_courtId_bookingDate_idx";
DROP INDEX IF EXISTS public."Booking_code_key";
DROP INDEX IF EXISTS public."ActivityEvent_createdAt_idx";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Venue" DROP CONSTRAINT IF EXISTS "Venue_pkey";
ALTER TABLE IF EXISTS ONLY public."VenueEvent" DROP CONSTRAINT IF EXISTS "VenueEvent_pkey";
ALTER TABLE IF EXISTS ONLY public."VenueBadge" DROP CONSTRAINT IF EXISTS "VenueBadge_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."SportCategory" DROP CONSTRAINT IF EXISTS "SportCategory_pkey";
ALTER TABLE IF EXISTS ONLY public."PriceRule" DROP CONSTRAINT IF EXISTS "PriceRule_pkey";
ALTER TABLE IF EXISTS ONLY public."Payment" DROP CONSTRAINT IF EXISTS "Payment_pkey";
ALTER TABLE IF EXISTS ONLY public."PasswordReset" DROP CONSTRAINT IF EXISTS "PasswordReset_pkey";
ALTER TABLE IF EXISTS ONLY public."Notification" DROP CONSTRAINT IF EXISTS "Notification_pkey";
ALTER TABLE IF EXISTS ONLY public."EventTicket" DROP CONSTRAINT IF EXISTS "EventTicket_pkey";
ALTER TABLE IF EXISTS ONLY public."DiscoverPost" DROP CONSTRAINT IF EXISTS "DiscoverPost_pkey";
ALTER TABLE IF EXISTS ONLY public."Court" DROP CONSTRAINT IF EXISTS "Court_pkey";
ALTER TABLE IF EXISTS ONLY public."CourtGroup" DROP CONSTRAINT IF EXISTS "CourtGroup_pkey";
ALTER TABLE IF EXISTS ONLY public."CourtBlock" DROP CONSTRAINT IF EXISTS "CourtBlock_pkey";
ALTER TABLE IF EXISTS ONLY public."Booking" DROP CONSTRAINT IF EXISTS "Booking_pkey";
ALTER TABLE IF EXISTS ONLY public."ActivityEvent" DROP CONSTRAINT IF EXISTS "ActivityEvent_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."VenueEvent";
DROP TABLE IF EXISTS public."VenueBadge";
DROP TABLE IF EXISTS public."Venue";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."SportCategory";
DROP TABLE IF EXISTS public."PriceRule";
DROP TABLE IF EXISTS public."Payment";
DROP TABLE IF EXISTS public."PasswordReset";
DROP TABLE IF EXISTS public."Notification";
DROP TABLE IF EXISTS public."EventTicket";
DROP TABLE IF EXISTS public."DiscoverPost";
DROP TABLE IF EXISTS public."CourtGroup";
DROP TABLE IF EXISTS public."CourtBlock";
DROP TABLE IF EXISTS public."Court";
DROP TABLE IF EXISTS public."Booking";
DROP TABLE IF EXISTS public."ActivityEvent";
DROP TYPE IF EXISTS public."VenueStatus";
DROP TYPE IF EXISTS public."VenueBadgeTone";
DROP TYPE IF EXISTS public."UserStatus";
DROP TYPE IF EXISTS public."UserRole";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."PaymentMethod";
DROP TYPE IF EXISTS public."NotificationKind";
DROP TYPE IF EXISTS public."DiscoverPostType";
DROP TYPE IF EXISTS public."CourtSurface";
DROP TYPE IF EXISTS public."CourtStatus";
DROP TYPE IF EXISTS public."CourtBlockKind";
DROP TYPE IF EXISTS public."BookingStatus";
DROP TYPE IF EXISTS public."BookingSource";
DROP TYPE IF EXISTS public."ActivityType";
--
-- Name: ActivityType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ActivityType" AS ENUM (
    'BOOKING_CREATED',
    'BOOKING_UPDATED',
    'COURT_UPDATED',
    'PAYMENT_UPDATED'
);


--
-- Name: BookingSource; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BookingSource" AS ENUM (
    'COUNTER',
    'ONLINE'
);


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'CANCELLED',
    'CHECKED_IN',
    'COMPLETED',
    'CONFIRMED',
    'PENDING'
);


--
-- Name: CourtBlockKind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CourtBlockKind" AS ENUM (
    'EVENT',
    'LOCKED'
);


--
-- Name: CourtStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CourtStatus" AS ENUM (
    'AVAILABLE',
    'INACTIVE',
    'MAINTENANCE'
);


--
-- Name: CourtSurface; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CourtSurface" AS ENUM (
    'CLAY',
    'HARD',
    'SYNTHETIC'
);


--
-- Name: DiscoverPostType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DiscoverPostType" AS ENUM (
    'COURSE',
    'EMPTY_COURT',
    'EVENT',
    'MEMBER',
    'OFFER'
);


--
-- Name: NotificationKind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationKind" AS ENUM (
    'BOOKING',
    'PROMOTION',
    'SYSTEM'
);


--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'BANK_TRANSFER',
    'CARD',
    'CASH',
    'E_WALLET'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'FAILED',
    'PAID',
    'PARTIAL',
    'REFUNDED',
    'UNPAID'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


--
-- Name: VenueBadgeTone; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."VenueBadgeTone" AS ENUM (
    'EVENT',
    'SINGLE'
);


--
-- Name: VenueStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."VenueStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ActivityEvent" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "entityId" text NOT NULL,
    message text NOT NULL,
    type public."ActivityType" NOT NULL
);


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    "bookingDate" date NOT NULL,
    code text NOT NULL,
    "courtId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endMinute" integer NOT NULL,
    note text,
    "paymentStatus" public."PaymentStatus" DEFAULT 'UNPAID'::public."PaymentStatus" NOT NULL,
    source public."BookingSource" DEFAULT 'ONLINE'::public."BookingSource" NOT NULL,
    "startMinute" integer NOT NULL,
    status public."BookingStatus" DEFAULT 'PENDING'::public."BookingStatus" NOT NULL,
    "totalPrice" integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: Court; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Court" (
    id text NOT NULL,
    "groupId" text,
    "hourlyRate" integer NOT NULL,
    "isIndoor" boolean DEFAULT false NOT NULL,
    name text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    status public."CourtStatus" DEFAULT 'AVAILABLE'::public."CourtStatus" NOT NULL,
    surface public."CourtSurface" DEFAULT 'HARD'::public."CourtSurface" NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: CourtBlock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CourtBlock" (
    id text NOT NULL,
    "blockDate" date NOT NULL,
    "courtId" text NOT NULL,
    "endMinute" integer NOT NULL,
    kind public."CourtBlockKind" NOT NULL,
    "startMinute" integer NOT NULL,
    title text NOT NULL
);


--
-- Name: CourtGroup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CourtGroup" (
    id text NOT NULL,
    name text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: DiscoverPost; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DiscoverPost" (
    id text NOT NULL,
    labels text[],
    "publishedAt" timestamp(3) without time zone NOT NULL,
    type public."DiscoverPostType" NOT NULL,
    "venueName" text NOT NULL
);


--
-- Name: EventTicket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EventTicket" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "eventId" text NOT NULL,
    phone text NOT NULL,
    quantity integer NOT NULL,
    "totalPrice" integer NOT NULL,
    "userId" text NOT NULL
);


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    kind public."NotificationKind" NOT NULL,
    message text NOT NULL,
    title text NOT NULL,
    "userId" text NOT NULL
);


--
-- Name: PasswordReset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PasswordReset" (
    id text NOT NULL,
    code text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "usedAt" timestamp(3) without time zone,
    "userId" text NOT NULL
);


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    amount integer NOT NULL,
    "bookingId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    method public."PaymentMethod" NOT NULL,
    "paidAt" timestamp(3) without time zone,
    status public."PaymentStatus" NOT NULL,
    "transactionCode" text NOT NULL,
    "userId" text NOT NULL
);


--
-- Name: PriceRule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PriceRule" (
    id text NOT NULL,
    "endMinute" integer NOT NULL,
    label text NOT NULL,
    "pricePerHour" integer NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "startMinute" integer NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: SportCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SportCategory" (
    id text NOT NULL,
    icon text NOT NULL,
    label text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "birthYear" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text,
    "fullName" text NOT NULL,
    gender text,
    "heightCm" integer,
    note text,
    "passwordHash" text NOT NULL,
    phone text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    status public."UserStatus" DEFAULT 'ACTIVE'::public."UserStatus" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "weightKg" integer
);


--
-- Name: Venue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Venue" (
    id text NOT NULL,
    address text NOT NULL,
    "closingMinute" integer DEFAULT 1320 NOT NULL,
    "coverKey" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    latitude double precision NOT NULL,
    "logoKey" text NOT NULL,
    longitude double precision NOT NULL,
    mark text DEFAULT 'ĐTG'::text NOT NULL,
    name text NOT NULL,
    "offerCount" integer DEFAULT 0 NOT NULL,
    "openingMinute" integer DEFAULT 360 NOT NULL,
    phone text NOT NULL,
    rating double precision,
    "slotMinutes" integer DEFAULT 30 NOT NULL,
    "sportId" text NOT NULL,
    status public."VenueStatus" DEFAULT 'ACTIVE'::public."VenueStatus" NOT NULL,
    timezone text DEFAULT 'Asia/Bangkok'::text NOT NULL,
    amenities text[],
    description text
);


--
-- Name: VenueBadge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VenueBadge" (
    id text NOT NULL,
    code text NOT NULL,
    label text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    tone public."VenueBadgeTone" NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: VenueEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VenueEvent" (
    id text NOT NULL,
    capacity integer NOT NULL,
    "courtLabel" text NOT NULL,
    "endMinute" integer NOT NULL,
    "eventDate" date NOT NULL,
    price integer NOT NULL,
    "soldCount" integer DEFAULT 0 NOT NULL,
    "startMinute" integer NOT NULL,
    title text NOT NULL,
    "venueId" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: ActivityEvent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ActivityEvent" (id, "createdAt", "entityId", message, type) FROM stdin;
activity-01	2026-08-15 02:42:00	booking-07	Lịch TH26081507 đã hoàn thành.	BOOKING_UPDATED
activity-02	2026-08-15 02:15:00	booking-03	Khách Lê Hoàng Nam đã nhận Sân 02.	BOOKING_UPDATED
activity-03	2026-08-15 01:40:00	payment-02	Đã ghi nhận đặt cọc cho lịch TH26081502.	PAYMENT_UPDATED
activity-04	2026-08-15 01:05:00	booking-09	Lịch TH26081509 được tạo từ quầy.	BOOKING_CREATED
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Booking" (id, "bookingDate", code, "courtId", "createdAt", "endMinute", note, "paymentStatus", source, "startMinute", status, "totalPrice", "updatedAt", "userId", "venueId") FROM stdin;
booking-01	2026-08-15	TH26081501	court-01	2026-08-17 18:29:30.278	480	Khách cần mượn thêm ống bóng tập.	PAID	ONLINE	360	CONFIRMED	360000	2026-08-17 18:29:30.278	customer-01	venue-01
booking-02	2026-08-15	TH26081502	court-01	2026-08-17 18:29:30.28	660	\N	PARTIAL	ONLINE	540	PENDING	420000	2026-08-17 18:29:30.28	customer-02	venue-01
booking-03	2026-08-15	TH26081503	court-02	2026-08-17 18:29:30.282	570	\N	PAID	COUNTER	420	CHECKED_IN	450000	2026-08-17 18:29:30.282	customer-03	venue-01
booking-04	2026-08-15	TH26081504	court-02	2026-08-17 18:29:30.284	840	\N	UNPAID	ONLINE	720	CONFIRMED	360000	2026-08-17 18:29:30.284	customer-04	venue-01
booking-05	2026-08-15	TH26081505	court-03	2026-08-17 18:29:30.286	720	\N	PAID	ONLINE	480	CONFIRMED	720000	2026-08-17 18:29:30.286	customer-05	venue-01
booking-06	2026-08-15	TH26081506	court-04	2026-08-17 18:29:30.288	1080	\N	REFUNDED	ONLINE	960	CANCELLED	400000	2026-08-17 18:29:30.288	customer-06	venue-01
booking-07	2026-08-15	TH26081507	court-05	2026-08-17 18:29:30.292	1260	\N	PAID	COUNTER	1140	COMPLETED	440000	2026-08-17 18:29:30.292	customer-01	venue-01
booking-08	2026-08-16	TH26081601	court-03	2026-08-17 18:29:30.297	540	\N	PARTIAL	ONLINE	420	CONFIRMED	360000	2026-08-17 18:29:30.297	customer-02	venue-01
booking-09	2026-08-15	TH26081509	court-04	2026-08-17 18:29:30.3	900	\N	PAID	COUNTER	780	CONFIRMED	400000	2026-08-17 18:29:30.3	customer-07	venue-01
booking-10	2026-08-14	TH26081401	court-01	2026-08-17 18:29:30.303	720	\N	PAID	ONLINE	600	COMPLETED	360000	2026-08-17 18:29:30.303	customer-08	venue-01
booking-11	2026-08-13	TH26081301	court-02	2026-08-17 18:29:30.306	1200	\N	PAID	ONLINE	1080	COMPLETED	360000	2026-08-17 18:29:30.306	customer-03	venue-01
booking-12	2026-08-12	TH26081201	court-05	2026-08-17 18:29:30.308	600	\N	PAID	COUNTER	420	COMPLETED	660000	2026-08-17 18:29:30.308	customer-04	venue-01
booking-13	2026-08-11	TH26081101	court-03	2026-08-17 18:29:30.31	1020	\N	PAID	ONLINE	900	COMPLETED	360000	2026-08-17 18:29:30.31	customer-05	venue-01
booking-14	2026-08-10	TH26081001	court-04	2026-08-17 18:29:30.313	840	\N	FAILED	ONLINE	720	CANCELLED	400000	2026-08-17 18:29:30.313	customer-06	venue-01
cmsxkiu0w0084kkuqr7v4hn9z	2026-08-18	MP26081801	cmsxkitsq003ekkuqhjgadc0a	2026-08-17 18:29:30.368	1200	\N	PAID	ONLINE	1080	CONFIRMED	240000	2026-08-17 18:29:30.368	customer-01	muse-pickle
cmsxkiu0y0085kkuq7isbgd5m	2026-08-18	MP26081802	cmsxkitst003fkkuqjr1gwp7r	2026-08-17 18:29:30.37	570	\N	PAID	ONLINE	420	CONFIRMED	300000	2026-08-17 18:29:30.37	customer-02	muse-pickle
cmsxkiu0z0086kkuqqusvmpjn	2026-08-18	MP26081803	cmsxkitst003fkkuqjr1gwp7r	2026-08-17 18:29:30.371	1140	\N	PAID	ONLINE	1050	CONFIRMED	180000	2026-08-17 18:29:30.371	customer-03	muse-pickle
cmsxkiu100087kkuq279ncyeo	2026-08-18	MP26081804	cmsxkitsv003gkkuqrmdeotbd	2026-08-17 18:29:30.372	1290	\N	PAID	ONLINE	1200	CONFIRMED	180000	2026-08-17 18:29:30.372	customer-04	muse-pickle
cmsxkiu110088kkuqtkbqcqgy	2026-08-18	MP26081805	cmsxkitsx003hkkuqh3fbewgb	2026-08-17 18:29:30.373	1230	\N	PAID	ONLINE	1140	CONFIRMED	180000	2026-08-17 18:29:30.373	customer-05	muse-pickle
cmsxkiu120089kkuq68468c78	2026-08-18	MP26081806	cmsxkitt2003jkkuqe626xqk1	2026-08-17 18:29:30.374	450	\N	PAID	ONLINE	360	CONFIRMED	270000	2026-08-17 18:29:30.374	customer-07	muse-pickle
cmsxkiu13008akkuqsfs1hr39	2026-08-18	MP26081807	cmsxkitt5003kkkuq2m8t6dpm	2026-08-17 18:29:30.375	1200	\N	PAID	ONLINE	1110	CONFIRMED	270000	2026-08-17 18:29:30.375	customer-08	muse-pickle
cmsxkiu14008bkkuqtis7fjnw	2026-08-19	MP26081908	cmsxkitsq003ekkuqhjgadc0a	2026-08-17 18:29:30.376	600	\N	PAID	ONLINE	480	CONFIRMED	240000	2026-08-17 18:29:30.376	customer-04	muse-pickle
cmsxkiu15008ckkuq0r2dlfbe	2026-08-19	MP26081909	cmsxkitsv003gkkuqrmdeotbd	2026-08-17 18:29:30.377	1320	\N	PAID	ONLINE	1200	CONFIRMED	240000	2026-08-17 18:29:30.377	customer-05	muse-pickle
cmsxkiu1l008lkkuqr31zo1hx	2026-08-18	GN26081800	cmsxkitt8003mkkuq813vvdn5	2026-08-17 18:29:30.393	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.393	customer-01	nhf-pickleball
cmsxkiu1n008mkkuq3pvshfmu	2026-08-18	GN26081801	cmsxkitt9003nkkuqbtno02xh	2026-08-17 18:29:30.395	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.395	customer-02	nhf-pickleball
cmsxkiu1q008okkuqo2s55f4e	2026-08-19	GN26081900	cmsxkitt9003nkkuqbtno02xh	2026-08-17 18:29:30.398	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.398	customer-01	nhf-pickleball
cmsxkiu1s008pkkuq67fezr33	2026-08-19	GN26081901	cmsxkitta003okkuqvj6uwb0e	2026-08-17 18:29:30.4	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.4	customer-02	nhf-pickleball
cmsxkiu1z008rkkuqrgyrp5i7	2026-08-18	GN26081810	cmsxkittg003tkkuqcw5oms1a	2026-08-17 18:29:30.407	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.407	customer-02	pickleball-20-thuy-khue
cmsxkiu21008skkuqt9smkpl4	2026-08-18	GN26081811	cmsxkitth003ukkuqubf00ob5	2026-08-17 18:29:30.409	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.409	customer-03	pickleball-20-thuy-khue
cmsxkiu24008ukkuqvttxrskw	2026-08-19	GN26081910	cmsxkitth003ukkuqubf00ob5	2026-08-17 18:29:30.412	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.412	customer-02	pickleball-20-thuy-khue
cmsxkiu27008vkkuqkvkwye9j	2026-08-19	GN26081911	cmsxkitti003vkkuqo9ncq3xv	2026-08-17 18:29:30.415	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.415	customer-03	pickleball-20-thuy-khue
cmsxkiu2c008xkkuql4khuq72	2026-08-18	GN26081820	cmsxkitto0040kkuqyxh5s4n0	2026-08-17 18:29:30.42	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.42	customer-03	family-pickleball
cmsxkiu2d008ykkuqwyd0w3k6	2026-08-18	GN26081821	cmsxkitto0041kkuqvxkk8z3k	2026-08-17 18:29:30.421	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.421	customer-04	family-pickleball
cmsxkiu2g0090kkuqdtifuke6	2026-08-19	GN26081920	cmsxkitto0041kkuqvxkk8z3k	2026-08-17 18:29:30.424	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.424	customer-03	family-pickleball
cmsxkiu2h0091kkuqqpuw6aim	2026-08-19	GN26081921	cmsxkittl003ykkuqc1qi85hq	2026-08-17 18:29:30.425	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.425	customer-04	family-pickleball
cmsxkiu2j0093kkuqua00o5u6	2026-08-18	GN26081830	cmsxkittq0044kkuqaq4tw2ao	2026-08-17 18:29:30.427	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.427	customer-04	trung-kinh-arena
cmsxkiu2l0094kkuqvh4ivb1g	2026-08-18	GN26081831	cmsxkittr0045kkuqrytv6y5z	2026-08-17 18:29:30.429	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.429	customer-05	trung-kinh-arena
cmsxkiu2o0096kkuqtj6fgcdt	2026-08-19	GN26081930	cmsxkittr0045kkuqrytv6y5z	2026-08-17 18:29:30.432	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.432	customer-04	trung-kinh-arena
cmsxkiu2p0097kkuqu08bl61n	2026-08-19	GN26081931	cmsxkitts0046kkuqzxfavoc1	2026-08-17 18:29:30.433	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.433	customer-05	trung-kinh-arena
cmsxkiu2t0099kkuqj9qsoy4x	2026-08-18	GN26081840	cmsxkittx004dkkuq6b4v9b3t	2026-08-17 18:29:30.437	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.437	customer-05	smash-badminton
cmsxkiu2u009akkuqzbn0k222	2026-08-18	GN26081841	cmsxkittu0049kkuq8nrrgl2a	2026-08-17 18:29:30.438	690	\N	PAID	ONLINE	600	CONFIRMED	210000	2026-08-17 18:29:30.438	customer-06	smash-badminton
cmsxkiu2w009ckkuqh4fj7d9j	2026-08-19	GN26081940	cmsxkittu0049kkuq8nrrgl2a	2026-08-17 18:29:30.44	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.44	customer-05	smash-badminton
cmsxkiu2x009dkkuqzpo0mpyx	2026-08-19	GN26081941	cmsxkittv004akkuqso1qj6pf	2026-08-17 18:29:30.441	690	\N	PAID	ONLINE	600	CONFIRMED	210000	2026-08-17 18:29:30.441	customer-06	smash-badminton
cmsxkiu2z009fkkuqci1wp2kt	2026-08-18	GN26081850	cmsxkitu1004hkkuq6xsvpleh	2026-08-17 18:29:30.443	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.443	customer-06	olympia-pickleball
cmsxkiu2z009gkkuqjx8iqq4v	2026-08-18	GN26081851	cmsxkitu2004ikkuqgzgp9294	2026-08-17 18:29:30.443	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.443	customer-07	olympia-pickleball
cmsxkiu32009ikkuqkljd3mfs	2026-08-19	GN26081950	cmsxkitu2004ikkuqgzgp9294	2026-08-17 18:29:30.446	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.446	customer-06	olympia-pickleball
cmsxkiu33009jkkuqx37fnjsg	2026-08-19	GN26081951	cmsxkitu4004jkkuqduliwv9n	2026-08-17 18:29:30.447	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.447	customer-07	olympia-pickleball
cmsxkiu35009lkkuqjqizwzay	2026-08-18	GN26081860	cmsxkitu7004mkkuqnbx21v6x	2026-08-17 18:29:30.449	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.449	customer-07	thanh-cong-tennis
cmsxkiu37009mkkuq15q4p8wl	2026-08-18	GN26081861	cmsxkitu8004nkkuqsatkj82f	2026-08-17 18:29:30.451	1290	\N	PAID	ONLINE	1200	CONFIRMED	330000	2026-08-17 18:29:30.451	customer-08	thanh-cong-tennis
cmsxkiu3a009okkuqcepqnb53	2026-08-19	GN26081960	cmsxkitu8004nkkuqsatkj82f	2026-08-17 18:29:30.454	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.454	customer-07	thanh-cong-tennis
cmsxkiu3a009pkkuq9f590sns	2026-08-19	GN26081961	cmsxkitu9004okkuqcnhidhb0	2026-08-17 18:29:30.454	1290	\N	PAID	ONLINE	1200	CONFIRMED	330000	2026-08-17 18:29:30.454	customer-08	thanh-cong-tennis
cmsxkiu3e009rkkuqt0zeafp4	2026-08-18	GN26081870	cmsxkituc004skkuqeehtdup8	2026-08-17 18:29:30.458	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.458	customer-08	star-football-cau-giay
cmsxkiu3f009skkuqrysbr44o	2026-08-18	GN26081871	cmsxkitue004tkkuqu2v1q510	2026-08-17 18:29:30.459	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.459	customer-01	star-football-cau-giay
cmsxkiu3g009ukkuqiwmsijur	2026-08-19	GN26081970	cmsxkitue004tkkuqu2v1q510	2026-08-17 18:29:30.46	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.46	customer-08	star-football-cau-giay
cmsxkiu3i009vkkuqurdhb4ea	2026-08-19	GN26081971	cmsxkituc004rkkuqfzgrasso	2026-08-17 18:29:30.462	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.462	customer-01	star-football-cau-giay
cmsxkiu3n009xkkuq72k08d26	2026-08-18	GN26081880	cmsxkituj004zkkuq221zzqrd	2026-08-17 18:29:30.467	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.467	customer-01	victory-badminton
cmsxkiu3p009ykkuqyb8m3bud	2026-08-18	GN26081881	cmsxkituk0050kkuq0x8iwhz7	2026-08-17 18:29:30.469	690	\N	PAID	ONLINE	600	CONFIRMED	210000	2026-08-17 18:29:30.469	customer-02	victory-badminton
cmsxkiu3r00a0kkuql5nrgong	2026-08-19	GN26081980	cmsxkituk0050kkuq0x8iwhz7	2026-08-17 18:29:30.471	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.471	customer-01	victory-badminton
cmsxkiu3r00a1kkuqiv4dwkpi	2026-08-19	GN26081981	cmsxkituh004wkkuq6qxtso8t	2026-08-17 18:29:30.471	690	\N	PAID	ONLINE	600	CONFIRMED	210000	2026-08-17 18:29:30.471	customer-02	victory-badminton
cmsxkiu3v00a3kkuqlgmyxdni	2026-08-18	GN26081890	cmsxkitun0054kkuqqe3d0j8z	2026-08-17 18:29:30.475	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.475	customer-02	the-royal-pickleball
cmsxkiu3w00a4kkuqoqj49kx6	2026-08-18	GN26081891	cmsxkitun0055kkuqh35koxyd	2026-08-17 18:29:30.476	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.476	customer-03	the-royal-pickleball
cmsxkiu3z00a6kkuqhdkl2329	2026-08-19	GN26081990	cmsxkitun0055kkuqh35koxyd	2026-08-17 18:29:30.479	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.479	customer-02	the-royal-pickleball
cmsxkiu4100a7kkuqjtxkw1gl	2026-08-19	GN26081991	cmsxkituo0056kkuq1qv2qaqh	2026-08-17 18:29:30.481	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.481	customer-03	the-royal-pickleball
cmsxkiu4300a9kkuqf1a6o76i	2026-08-18	GN260818100	cmsxkitur005akkuq41o6tyd5	2026-08-17 18:29:30.483	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.483	customer-03	my-dinh-sport-center
cmsxkiu4500aakkuq9iyuehhw	2026-08-18	GN260818101	cmsxkitus005bkkuqjtljxe75	2026-08-17 18:29:30.485	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.485	customer-04	my-dinh-sport-center
cmsxkiu4700ackkuqhqh3hgcz	2026-08-19	GN260819100	cmsxkitus005bkkuqjtljxe75	2026-08-17 18:29:30.487	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.487	customer-03	my-dinh-sport-center
cmsxkiu4800adkkuqk5wnh3ni	2026-08-19	GN260819101	cmsxkituq0059kkuq1kntkbpx	2026-08-17 18:29:30.488	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.488	customer-04	my-dinh-sport-center
cmsxkiu4d00afkkuq35l0yu4r	2026-08-18	GN260818110	cmsxkitv0005hkkuqjyjibdvq	2026-08-17 18:29:30.493	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.493	customer-04	saigon-pickleball-club
cmsxkiu4f00agkkuqevj77ybr	2026-08-18	GN260818111	cmsxkituu005ekkuqmdnd5byf	2026-08-17 18:29:30.495	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.495	customer-05	saigon-pickleball-club
cmsxkiu4k00aikkuqrzxjkdz7	2026-08-19	GN260819110	cmsxkituu005ekkuqmdnd5byf	2026-08-17 18:29:30.5	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.5	customer-04	saigon-pickleball-club
cmsxkiu4n00ajkkuq6dym6dzx	2026-08-19	GN260819111	cmsxkituw005fkkuqiwlro9vk	2026-08-17 18:29:30.503	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.503	customer-05	saigon-pickleball-club
cmsxkiu4p00alkkuqpbs7kzrs	2026-08-18	GN260818120	cmsxkitv4005kkkuqvfd0utdg	2026-08-17 18:29:30.505	480	\N	PAID	ONLINE	420	CONFIRMED	220000	2026-08-17 18:29:30.505	customer-05	lan-anh-tennis
cmsxkiu4r00amkkuquf77izgp	2026-08-18	GN260818121	cmsxkitv5005lkkuqqtujekym	2026-08-17 18:29:30.507	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.507	customer-06	lan-anh-tennis
cmsxkiu4u00aokkuqkoj1e3zn	2026-08-19	GN260819120	cmsxkitv5005lkkuqqtujekym	2026-08-17 18:29:30.51	480	\N	PAID	ONLINE	420	CONFIRMED	220000	2026-08-17 18:29:30.51	customer-05	lan-anh-tennis
cmsxkiu4w00apkkuqby7zmekg	2026-08-19	GN260819121	cmsxkitv6005mkkuqxnsatid5	2026-08-17 18:29:30.512	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.512	customer-06	lan-anh-tennis
cmsxkiu5000arkkuqv7pk1gs0	2026-08-18	GN260818130	cmsxkitv9005qkkuq1pbw7ixc	2026-08-17 18:29:30.516	690	\N	PAID	ONLINE	600	CONFIRMED	600000	2026-08-17 18:29:30.516	customer-06	thanh-long-football
cmsxkiu5100askkuq0dfz26ke	2026-08-18	GN260818131	cmsxkitva005rkkuqecq15ijp	2026-08-17 18:29:30.517	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.517	customer-07	thanh-long-football
cmsxkiu5400aukkuqqhmxwcyh	2026-08-19	GN260819130	cmsxkitva005rkkuqecq15ijp	2026-08-17 18:29:30.52	690	\N	PAID	ONLINE	600	CONFIRMED	600000	2026-08-17 18:29:30.52	customer-06	thanh-long-football
cmsxkiu5500avkkuqf80bbg82	2026-08-19	GN260819131	cmsxkitv8005pkkuq0jimpzhs	2026-08-17 18:29:30.521	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.521	customer-07	thanh-long-football
cmsxkiu5700axkkuqv4fb0ldo	2026-08-18	GN260818140	cmsxkitvh005ykkuqnbve8etq	2026-08-17 18:29:30.523	1170	\N	PAID	ONLINE	1080	CONFIRMED	210000	2026-08-17 18:29:30.523	customer-07	smash-arena-binh-thanh
cmsxkiu5900aykkuq8z6qrd0c	2026-08-18	GN260818141	cmsxkitve005ukkuq2liyivtu	2026-08-17 18:29:30.525	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.525	customer-08	smash-arena-binh-thanh
cmsxkiu5b00b0kkuq4aqq6s8t	2026-08-19	GN260819140	cmsxkitve005ukkuq2liyivtu	2026-08-17 18:29:30.527	1170	\N	PAID	ONLINE	1080	CONFIRMED	210000	2026-08-17 18:29:30.527	customer-07	smash-arena-binh-thanh
cmsxkiu5d00b1kkuqvx8vd8fk	2026-08-19	GN260819141	cmsxkitve005vkkuqjcge79ct	2026-08-17 18:29:30.529	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.529	customer-08	smash-arena-binh-thanh
cmsxkiu5i00b3kkuqorpmdupv	2026-08-18	GN260818150	cmsxkitvm0064kkuq3y5b6skp	2026-08-17 18:29:30.534	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.534	customer-08	thu-duc-pickleball
cmsxkiu5k00b4kkuqdkbyvqc9	2026-08-18	GN260818151	cmsxkitvj0061kkuq0virm527	2026-08-17 18:29:30.536	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.536	customer-01	thu-duc-pickleball
cmsxkiu5m00b6kkuq0s5pwac4	2026-08-19	GN260819150	cmsxkitvj0061kkuq0virm527	2026-08-17 18:29:30.538	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.538	customer-08	thu-duc-pickleball
cmsxkiu5m00b7kkuq42gy1yk0	2026-08-19	GN260819151	cmsxkitvk0062kkuq3pka70sf	2026-08-17 18:29:30.538	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.538	customer-01	thu-duc-pickleball
cmsxkiu5q00b9kkuq9c9x9rse	2026-08-18	GN260818160	cmsxkitvs0067kkuqywxgqqgo	2026-08-17 18:29:30.542	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.542	customer-01	lang-ha-pickleball
cmsxkiu5r00bakkuqvkt3203d	2026-08-18	GN260818161	cmsxkitvu0068kkuqg7zmkofv	2026-08-17 18:29:30.543	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.543	customer-02	lang-ha-pickleball
cmsxkiu5v00bckkuqva39yuq7	2026-08-19	GN260819160	cmsxkitvu0068kkuqg7zmkofv	2026-08-17 18:29:30.547	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.547	customer-01	lang-ha-pickleball
cmsxkiu5w00bdkkuqpoyhb8hp	2026-08-19	GN260819161	cmsxkitvw0069kkuqujvgvjfu	2026-08-17 18:29:30.548	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.548	customer-02	lang-ha-pickleball
cmsxkiu6000bfkkuqud80ui30	2026-08-18	GN260818170	cmsxkitw3006fkkuq747ow3av	2026-08-17 18:29:30.552	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.552	customer-02	dao-tan-tennis
cmsxkiu6100bgkkuqjsliyfne	2026-08-18	GN260818171	cmsxkitw1006dkkuq5cz5vsav	2026-08-17 18:29:30.553	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.553	customer-03	dao-tan-tennis
cmsxkiu6200bikkuqklz74if5	2026-08-19	GN260819170	cmsxkitw1006dkkuq5cz5vsav	2026-08-17 18:29:30.554	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.554	customer-02	dao-tan-tennis
cmsxkiu6300bjkkuq6qxulsuy	2026-08-19	GN260819171	cmsxkitw2006ekkuq8v3692b8	2026-08-17 18:29:30.555	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.555	customer-03	dao-tan-tennis
cmsxkiu6700blkkuqsur978px	2026-08-18	GN260818180	cmsxkitw9006ikkuq5fxyht85	2026-08-17 18:29:30.559	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.559	customer-03	tran-duy-hung-football
cmsxkiu6800bmkkuqbo1mi6k4	2026-08-18	GN260818181	cmsxkitwb006jkkuqcehqe0xk	2026-08-17 18:29:30.56	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.56	customer-04	tran-duy-hung-football
cmsxkiu6a00bokkuq5jeyn8y4	2026-08-19	GN260819180	cmsxkitwb006jkkuqcehqe0xk	2026-08-17 18:29:30.562	1170	\N	PAID	ONLINE	1080	CONFIRMED	600000	2026-08-17 18:29:30.562	customer-03	tran-duy-hung-football
cmsxkiu6b00bpkkuq7n8gz76d	2026-08-19	GN260819181	cmsxkitwc006kkkuqq3iduwxx	2026-08-17 18:29:30.563	1290	\N	PAID	ONLINE	1200	CONFIRMED	600000	2026-08-17 18:29:30.563	customer-04	tran-duy-hung-football
cmsxkiu6e00brkkuqpzkgjaci	2026-08-18	GN260818190	cmsxkitwo006rkkuqdx85vmcv	2026-08-17 18:29:30.566	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.566	customer-04	vu-ngoc-phan-badminton
cmsxkiu6e00bskkuqlztzzpo0	2026-08-18	GN260818191	cmsxkitwg006nkkuqruwhpa92	2026-08-17 18:29:30.566	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.566	customer-05	vu-ngoc-phan-badminton
cmsxkiu6h00bukkuq4pylnwtp	2026-08-19	GN260819190	cmsxkitwg006nkkuqruwhpa92	2026-08-17 18:29:30.569	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.569	customer-04	vu-ngoc-phan-badminton
cmsxkiu6i00bvkkuqstp5t6yf	2026-08-19	GN260819191	cmsxkitwh006okkuqdmxlggg0	2026-08-17 18:29:30.57	480	\N	PAID	ONLINE	420	CONFIRMED	140000	2026-08-17 18:29:30.57	customer-05	vu-ngoc-phan-badminton
cmsxkiu6k00bxkkuqlgf8iv0l	2026-08-18	GN260818200	cmsxkitws006ukkuq0otgwgk5	2026-08-17 18:29:30.572	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.572	customer-05	giai-phong-pickleball
cmsxkiu6l00bykkuqsh2otjmv	2026-08-18	GN260818201	cmsxkitwt006vkkuq05th1qm6	2026-08-17 18:29:30.573	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.573	customer-06	giai-phong-pickleball
cmsxkiu6n00c0kkuq8ikksio7	2026-08-19	GN260819200	cmsxkitwt006vkkuq05th1qm6	2026-08-17 18:29:30.575	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.575	customer-05	giai-phong-pickleball
cmsxkiu6o00c1kkuqngqdm5h7	2026-08-19	GN260819201	cmsxkitwu006wkkuqt516zngc	2026-08-17 18:29:30.576	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.576	customer-06	giai-phong-pickleball
cmsxkiu6r00c3kkuqqvtiztk1	2026-08-18	GN260818210	cmsxkitwx0070kkuq2ko05qfk	2026-08-17 18:29:30.579	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.579	customer-06	nguyen-trai-tennis
cmsxkiu6s00c4kkuq4r6an3uf	2026-08-18	GN260818211	cmsxkitwy0071kkuqeq3rvmgw	2026-08-17 18:29:30.58	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.58	customer-07	nguyen-trai-tennis
cmsxkiu6t00c6kkuqjrhz0ucq	2026-08-19	GN260819210	cmsxkitwy0071kkuqeq3rvmgw	2026-08-17 18:29:30.581	690	\N	PAID	ONLINE	600	CONFIRMED	330000	2026-08-17 18:29:30.581	customer-06	nguyen-trai-tennis
cmsxkiu6u00c7kkuqa639sr1l	2026-08-19	GN260819211	cmsxkitwz0072kkuqb0ozblp8	2026-08-17 18:29:30.582	1170	\N	PAID	ONLINE	1080	CONFIRMED	330000	2026-08-17 18:29:30.582	customer-07	nguyen-trai-tennis
cmsxkiu6x00c9kkuq46ftsw5f	2026-08-18	GN260818220	cmsxkitx70077kkuq5zau4fwm	2026-08-17 18:29:30.585	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.585	customer-07	landmark-pickleball
cmsxkiu6x00cakkuqxnemnkgh	2026-08-18	GN260818221	cmsxkitx80078kkuq1qrnxrjj	2026-08-17 18:29:30.585	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.585	customer-08	landmark-pickleball
cmsxkiu6z00cckkuqfuw449f2	2026-08-19	GN260819220	cmsxkitx80078kkuq1qrnxrjj	2026-08-17 18:29:30.587	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.587	customer-07	landmark-pickleball
cmsxkiu7000cdkkuqykyzc1wm	2026-08-19	GN260819221	cmsxkitx40075kkuqspipwh4e	2026-08-17 18:29:30.588	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.588	customer-08	landmark-pickleball
cmsxkiu7400cfkkuq1ybrty28	2026-08-18	GN260818230	cmsxkitxc007dkkuqh7luagw0	2026-08-17 18:29:30.592	1290	\N	PAID	ONLINE	1200	CONFIRMED	330000	2026-08-17 18:29:30.592	customer-08	dien-bien-phu-tennis
cmsxkiu7400cgkkuq59nlyn91	2026-08-18	GN260818231	cmsxkitxa007bkkuqvy7p7ygt	2026-08-17 18:29:30.592	480	\N	PAID	ONLINE	420	CONFIRMED	220000	2026-08-17 18:29:30.592	customer-01	dien-bien-phu-tennis
cmsxkiu7600cikkuq01dsy01o	2026-08-19	GN260819230	cmsxkitxa007bkkuqvy7p7ygt	2026-08-17 18:29:30.594	1290	\N	PAID	ONLINE	1200	CONFIRMED	330000	2026-08-17 18:29:30.594	customer-08	dien-bien-phu-tennis
cmsxkiu7900cjkkuqv80zx5hh	2026-08-19	GN260819231	cmsxkitxb007ckkuq669aitq3	2026-08-17 18:29:30.598	480	\N	PAID	ONLINE	420	CONFIRMED	220000	2026-08-17 18:29:30.598	customer-01	dien-bien-phu-tennis
cmsxkiu7k00clkkuqi1sxe2p1	2026-08-18	GN260818240	cmsxkitxf007gkkuq6fbx4w7v	2026-08-17 18:29:30.608	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.608	customer-01	quan-3-football
cmsxkiu7m00cmkkuqwuhh5eol	2026-08-18	GN260818241	cmsxkitxf007hkkuqn7jjhmjm	2026-08-17 18:29:30.61	690	\N	PAID	ONLINE	600	CONFIRMED	600000	2026-08-17 18:29:30.61	customer-02	quan-3-football
cmsxkiu7t00cokkuqc85qt13a	2026-08-19	GN260819240	cmsxkitxf007hkkuqn7jjhmjm	2026-08-17 18:29:30.617	480	\N	PAID	ONLINE	420	CONFIRMED	400000	2026-08-17 18:29:30.617	customer-01	quan-3-football
cmsxkiu7w00cpkkuq29d6mzqw	2026-08-19	GN260819241	cmsxkitxg007ikkuq5n1kcf6y	2026-08-17 18:29:30.62	690	\N	PAID	ONLINE	600	CONFIRMED	600000	2026-08-17 18:29:30.62	customer-02	quan-3-football
cmsxkiu8300crkkuqm1txlsfv	2026-08-18	GN260818250	cmsxkitxk007mkkuq88l05moq	2026-08-17 18:29:30.627	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.627	customer-02	phan-xich-long-pickleball
cmsxkiu8600cskkuqsun6s6kb	2026-08-18	GN260818251	cmsxkitxl007nkkuqc9fecrae	2026-08-17 18:29:30.63	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.63	customer-03	phan-xich-long-pickleball
cmsxkiu8b00cukkuqcy77355k	2026-08-19	GN260819250	cmsxkitxl007nkkuqc9fecrae	2026-08-17 18:29:30.635	690	\N	PAID	ONLINE	600	CONFIRMED	270000	2026-08-17 18:29:30.635	customer-02	phan-xich-long-pickleball
cmsxkiu8d00cvkkuqdngeuajf	2026-08-19	GN260819251	cmsxkitxm007okkuqg9m3jv6x	2026-08-17 18:29:30.637	1170	\N	PAID	ONLINE	1080	CONFIRMED	270000	2026-08-17 18:29:30.637	customer-03	phan-xich-long-pickleball
cmsxkiu8j00cxkkuq020m2wlm	2026-08-18	GN260818260	cmsxkitxq007skkuqugo74vx6	2026-08-17 18:29:30.643	1170	\N	PAID	ONLINE	1080	CONFIRMED	210000	2026-08-17 18:29:30.643	customer-03	go-vap-badminton
cmsxkiu8k00cykkuqjvr7iark	2026-08-18	GN260818261	cmsxkitxq007tkkuqmeznog0e	2026-08-17 18:29:30.644	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.644	customer-04	go-vap-badminton
cmsxkiu8o00d0kkuq9id3pe33	2026-08-19	GN260819260	cmsxkitxq007tkkuqmeznog0e	2026-08-17 18:29:30.648	1170	\N	PAID	ONLINE	1080	CONFIRMED	210000	2026-08-17 18:29:30.648	customer-03	go-vap-badminton
cmsxkiu8q00d1kkuq6sbtpudc	2026-08-19	GN260819261	cmsxkitxr007ukkuq1ho54wox	2026-08-17 18:29:30.65	1290	\N	PAID	ONLINE	1200	CONFIRMED	210000	2026-08-17 18:29:30.65	customer-04	go-vap-badminton
cmsxkiu8u00d3kkuqnc95x10p	2026-08-18	GN260818270	cmsxkity00081kkuqjia97bw6	2026-08-17 18:29:30.654	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.654	customer-04	tan-binh-pickleball
cmsxkiu8u00d4kkuq6ypylbmz	2026-08-18	GN260818271	cmsxkitxx007ykkuqaoa7x3sg	2026-08-17 18:29:30.654	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.654	customer-05	tan-binh-pickleball
cmsxkiu8x00d6kkuqj3oktnx4	2026-08-19	GN260819270	cmsxkitxx007ykkuqaoa7x3sg	2026-08-17 18:29:30.657	1290	\N	PAID	ONLINE	1200	CONFIRMED	270000	2026-08-17 18:29:30.657	customer-04	tan-binh-pickleball
cmsxkiu8y00d7kkuqxygowq8p	2026-08-19	GN260819271	cmsxkitxz007zkkuqenncbkys	2026-08-17 18:29:30.658	480	\N	PAID	ONLINE	420	CONFIRMED	180000	2026-08-17 18:29:30.658	customer-05	tan-binh-pickleball
\.


--
-- Data for Name: Court; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Court" (id, "groupId", "hourlyRate", "isIndoor", name, "sortOrder", status, surface, "venueId") FROM stdin;
cmsxkitsq003ekkuqhjgadc0a	cmsxkitsm003ckkuqjkb4pbnq	120000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	muse-pickle
cmsxkitst003fkkuqjr1gwp7r	cmsxkitsm003ckkuqjkb4pbnq	120000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	muse-pickle
cmsxkitsv003gkkuqrmdeotbd	cmsxkitsm003ckkuqjkb4pbnq	120000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	muse-pickle
cmsxkitsx003hkkuqh3fbewgb	cmsxkitsm003ckkuqjkb4pbnq	120000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	muse-pickle
cmsxkitt0003ikkuqc8xv2fpl	cmsxkitsm003ckkuqjkb4pbnq	120000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	muse-pickle
cmsxkitt2003jkkuqe626xqk1	cmsxkitsn003dkkuqe4yr0moy	180000	f	Tennis 1	1	AVAILABLE	HARD	muse-pickle
cmsxkitt5003kkkuq2m8t6dpm	cmsxkitsn003dkkuqe4yr0moy	180000	f	Tennis 2	2	AVAILABLE	HARD	muse-pickle
cmsxkitt8003mkkuq813vvdn5	cmsxkitt7003lkkuqt8wl5bki	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	nhf-pickleball
cmsxkitt9003nkkuqbtno02xh	cmsxkitt7003lkkuqt8wl5bki	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	nhf-pickleball
cmsxkitta003okkuqvj6uwb0e	cmsxkitt7003lkkuqt8wl5bki	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	nhf-pickleball
cmsxkittb003pkkuqctfinm5x	cmsxkitt7003lkkuqt8wl5bki	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	nhf-pickleball
cmsxkittd003qkkuq445wegkr	cmsxkitt7003lkkuqt8wl5bki	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	nhf-pickleball
cmsxkittf003skkuqqtw5jfz1	cmsxkitte003rkkuqjqj5lsod	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	pickleball-20-thuy-khue
cmsxkittg003tkkuqcw5oms1a	cmsxkitte003rkkuqjqj5lsod	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	pickleball-20-thuy-khue
cmsxkitth003ukkuqubf00ob5	cmsxkitte003rkkuqjqj5lsod	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	pickleball-20-thuy-khue
cmsxkitti003vkkuqo9ncq3xv	cmsxkitte003rkkuqjqj5lsod	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	pickleball-20-thuy-khue
cmsxkittj003wkkuqe7w4b2u4	cmsxkitte003rkkuqjqj5lsod	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	pickleball-20-thuy-khue
cmsxkittl003ykkuqc1qi85hq	cmsxkittk003xkkuqmp0qzy8y	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	family-pickleball
cmsxkittn003zkkuq4ggnpqa4	cmsxkittk003xkkuqmp0qzy8y	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	family-pickleball
cmsxkitto0040kkuqyxh5s4n0	cmsxkittk003xkkuqmp0qzy8y	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	family-pickleball
cmsxkitto0041kkuqvxkk8z3k	cmsxkittk003xkkuqmp0qzy8y	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	family-pickleball
cmsxkittp0042kkuqzdqwxa9w	cmsxkittk003xkkuqmp0qzy8y	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	family-pickleball
cmsxkittq0044kkuqaq4tw2ao	cmsxkittp0043kkuqtbti3plx	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	trung-kinh-arena
cmsxkittr0045kkuqrytv6y5z	cmsxkittp0043kkuqtbti3plx	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	trung-kinh-arena
cmsxkitts0046kkuqzxfavoc1	cmsxkittp0043kkuqtbti3plx	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	trung-kinh-arena
cmsxkittt0047kkuq8acpv54b	cmsxkittp0043kkuqtbti3plx	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	trung-kinh-arena
cmsxkittu0049kkuq8nrrgl2a	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 1	1	AVAILABLE	SYNTHETIC	smash-badminton
cmsxkittv004akkuqso1qj6pf	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 2	2	AVAILABLE	SYNTHETIC	smash-badminton
cmsxkittv004bkkuqfr82zscr	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 3	3	AVAILABLE	SYNTHETIC	smash-badminton
cmsxkittw004ckkuqb9b1t2k5	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 4	4	AVAILABLE	SYNTHETIC	smash-badminton
cmsxkittx004dkkuq6b4v9b3t	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 5	5	AVAILABLE	SYNTHETIC	smash-badminton
cmsxkitty004ekkuqr7mehogi	cmsxkittt0048kkuq4sj0y8al	140000	t	Sân 6	6	MAINTENANCE	SYNTHETIC	smash-badminton
cmsxkitu0004gkkuq7jfmmemd	cmsxkittz004fkkuq03a2ttwa	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	olympia-pickleball
cmsxkitu1004hkkuq6xsvpleh	cmsxkittz004fkkuq03a2ttwa	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	olympia-pickleball
cmsxkitu2004ikkuqgzgp9294	cmsxkittz004fkkuq03a2ttwa	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	olympia-pickleball
cmsxkitu4004jkkuqduliwv9n	cmsxkittz004fkkuq03a2ttwa	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	olympia-pickleball
cmsxkitu5004kkkuqdwenxu7x	cmsxkittz004fkkuq03a2ttwa	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	olympia-pickleball
cmsxkitu7004mkkuqnbx21v6x	cmsxkitu6004lkkuqvarh6kt8	220000	f	Tennis 1	1	AVAILABLE	HARD	thanh-cong-tennis
cmsxkitu8004nkkuqsatkj82f	cmsxkitu6004lkkuqvarh6kt8	220000	f	Tennis 2	2	AVAILABLE	HARD	thanh-cong-tennis
cmsxkitu9004okkuqcnhidhb0	cmsxkitu6004lkkuqvarh6kt8	220000	f	Tennis 3	3	AVAILABLE	HARD	thanh-cong-tennis
cmsxkitua004pkkuq4k04c8hb	cmsxkitu6004lkkuqvarh6kt8	220000	f	Tennis 4	4	MAINTENANCE	HARD	thanh-cong-tennis
cmsxkituc004rkkuqfzgrasso	cmsxkitub004qkkuq3udqhjfr	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	star-football-cau-giay
cmsxkituc004skkuqeehtdup8	cmsxkitub004qkkuq3udqhjfr	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	star-football-cau-giay
cmsxkitue004tkkuqu2v1q510	cmsxkitub004qkkuq3udqhjfr	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	star-football-cau-giay
cmsxkitug004ukkuq2ri53iny	cmsxkitub004qkkuq3udqhjfr	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	star-football-cau-giay
cmsxkituh004wkkuq6qxtso8t	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 1	1	AVAILABLE	SYNTHETIC	victory-badminton
cmsxkitui004xkkuqe745on44	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 2	2	AVAILABLE	SYNTHETIC	victory-badminton
cmsxkitui004ykkuqka7d1wa1	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 3	3	AVAILABLE	SYNTHETIC	victory-badminton
cmsxkituj004zkkuq221zzqrd	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 4	4	AVAILABLE	SYNTHETIC	victory-badminton
cmsxkituk0050kkuq0x8iwhz7	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 5	5	AVAILABLE	SYNTHETIC	victory-badminton
cmsxkitul0051kkuq7wjdmidw	cmsxkitug004vkkuqd3bfqm8x	140000	t	Sân 6	6	MAINTENANCE	SYNTHETIC	victory-badminton
cmsxkitum0053kkuqdavrq7ju	cmsxkitul0052kkuqgfefgld5	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	the-royal-pickleball
cmsxkitun0054kkuqqe3d0j8z	cmsxkitul0052kkuqgfefgld5	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	the-royal-pickleball
cmsxkitun0055kkuqh35koxyd	cmsxkitul0052kkuqgfefgld5	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	the-royal-pickleball
cmsxkituo0056kkuq1qv2qaqh	cmsxkitul0052kkuqgfefgld5	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	the-royal-pickleball
cmsxkitup0057kkuqxduedild	cmsxkitul0052kkuqgfefgld5	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	the-royal-pickleball
cmsxkituq0059kkuq1kntkbpx	cmsxkituq0058kkuqc8e1udu4	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	my-dinh-sport-center
cmsxkitur005akkuq41o6tyd5	cmsxkituq0058kkuqc8e1udu4	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	my-dinh-sport-center
cmsxkitus005bkkuqjtljxe75	cmsxkituq0058kkuqc8e1udu4	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	my-dinh-sport-center
cmsxkitus005ckkuqav6opqae	cmsxkituq0058kkuqc8e1udu4	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	my-dinh-sport-center
cmsxkituu005ekkuqmdnd5byf	cmsxkitut005dkkuqqmmjy0f8	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	saigon-pickleball-club
cmsxkituw005fkkuqiwlro9vk	cmsxkitut005dkkuqqmmjy0f8	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	saigon-pickleball-club
cmsxkituy005gkkuqurfhrlem	cmsxkitut005dkkuqqmmjy0f8	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	saigon-pickleball-club
cmsxkitv0005hkkuqjyjibdvq	cmsxkitut005dkkuqqmmjy0f8	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	saigon-pickleball-club
cmsxkitv2005ikkuq06d4cdnd	cmsxkitut005dkkuqqmmjy0f8	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	saigon-pickleball-club
cmsxkitv4005kkkuqvfd0utdg	cmsxkitv3005jkkuqk58bxpxk	220000	f	Tennis 1	1	AVAILABLE	HARD	lan-anh-tennis
cmsxkitv5005lkkuqqtujekym	cmsxkitv3005jkkuqk58bxpxk	220000	f	Tennis 2	2	AVAILABLE	HARD	lan-anh-tennis
cmsxkitv6005mkkuqxnsatid5	cmsxkitv3005jkkuqk58bxpxk	220000	f	Tennis 3	3	AVAILABLE	HARD	lan-anh-tennis
cmsxkitv7005nkkuqejylaik2	cmsxkitv3005jkkuqk58bxpxk	220000	f	Tennis 4	4	MAINTENANCE	HARD	lan-anh-tennis
cmsxkitv8005pkkuq0jimpzhs	cmsxkitv8005okkuqt1m5jnjd	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	thanh-long-football
cmsxkitv9005qkkuq1pbw7ixc	cmsxkitv8005okkuqt1m5jnjd	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	thanh-long-football
cmsxkitva005rkkuqecq15ijp	cmsxkitv8005okkuqt1m5jnjd	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	thanh-long-football
cmsxkitvb005skkuqzd0szis2	cmsxkitv8005okkuqt1m5jnjd	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	thanh-long-football
cmsxkitve005ukkuq2liyivtu	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 1	1	AVAILABLE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitve005vkkuqjcge79ct	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 2	2	AVAILABLE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitvf005wkkuqp6cscbpo	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 3	3	AVAILABLE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitvg005xkkuqchc1egit	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 4	4	AVAILABLE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitvh005ykkuqnbve8etq	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 5	5	AVAILABLE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitvi005zkkuqe21w1xzh	cmsxkitvd005tkkuqcpqxp764	140000	t	Sân 6	6	MAINTENANCE	SYNTHETIC	smash-arena-binh-thanh
cmsxkitvj0061kkuq0virm527	cmsxkitvj0060kkuq5srqc953	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	thu-duc-pickleball
cmsxkitvk0062kkuq3pka70sf	cmsxkitvj0060kkuq5srqc953	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	thu-duc-pickleball
cmsxkitvl0063kkuq06vxpf4r	cmsxkitvj0060kkuq5srqc953	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	thu-duc-pickleball
cmsxkitvm0064kkuq3y5b6skp	cmsxkitvj0060kkuq5srqc953	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	thu-duc-pickleball
cmsxkitvo0065kkuqxu2ydm7r	cmsxkitvj0060kkuq5srqc953	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	thu-duc-pickleball
cmsxkitvs0067kkuqywxgqqgo	cmsxkitvq0066kkuqypbu3rtf	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	lang-ha-pickleball
cmsxkitvu0068kkuqg7zmkofv	cmsxkitvq0066kkuqypbu3rtf	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	lang-ha-pickleball
cmsxkitvw0069kkuqujvgvjfu	cmsxkitvq0066kkuqypbu3rtf	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	lang-ha-pickleball
cmsxkitvx006akkuqzd5uns60	cmsxkitvq0066kkuqypbu3rtf	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	lang-ha-pickleball
cmsxkitvz006bkkuqfynimjkz	cmsxkitvq0066kkuqypbu3rtf	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	lang-ha-pickleball
cmsxkitw1006dkkuq5cz5vsav	cmsxkitw0006ckkuqecdqtmgg	220000	f	Tennis 1	1	AVAILABLE	HARD	dao-tan-tennis
cmsxkitw2006ekkuq8v3692b8	cmsxkitw0006ckkuqecdqtmgg	220000	f	Tennis 2	2	AVAILABLE	HARD	dao-tan-tennis
cmsxkitw3006fkkuq747ow3av	cmsxkitw0006ckkuqecdqtmgg	220000	f	Tennis 3	3	AVAILABLE	HARD	dao-tan-tennis
cmsxkitw5006gkkuqyhczm33v	cmsxkitw0006ckkuqecdqtmgg	220000	f	Tennis 4	4	MAINTENANCE	HARD	dao-tan-tennis
cmsxkitw9006ikkuq5fxyht85	cmsxkitw8006hkkuqrjfrfch0	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	tran-duy-hung-football
cmsxkitwb006jkkuqcehqe0xk	cmsxkitw8006hkkuqrjfrfch0	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	tran-duy-hung-football
cmsxkitwc006kkkuqq3iduwxx	cmsxkitw8006hkkuqrjfrfch0	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	tran-duy-hung-football
cmsxkitwd006lkkuqxmckeqjz	cmsxkitw8006hkkuqrjfrfch0	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	tran-duy-hung-football
cmsxkitwg006nkkuqruwhpa92	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 1	1	AVAILABLE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitwh006okkuqdmxlggg0	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 2	2	AVAILABLE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitwk006pkkuqj3bjrtye	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 3	3	AVAILABLE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitwm006qkkuqowiufspa	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 4	4	AVAILABLE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitwo006rkkuqdx85vmcv	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 5	5	AVAILABLE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitwq006skkuq4jq0wyn3	cmsxkitwf006mkkuqlm5a8e4d	140000	t	Sân 6	6	MAINTENANCE	SYNTHETIC	vu-ngoc-phan-badminton
cmsxkitws006ukkuq0otgwgk5	cmsxkitwr006tkkuqmiq01jxl	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	giai-phong-pickleball
cmsxkitwt006vkkuq05th1qm6	cmsxkitwr006tkkuqmiq01jxl	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	giai-phong-pickleball
cmsxkitwu006wkkuqt516zngc	cmsxkitwr006tkkuqmiq01jxl	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	giai-phong-pickleball
cmsxkitwv006xkkuqia5hnhra	cmsxkitwr006tkkuqmiq01jxl	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	giai-phong-pickleball
cmsxkitww006ykkuqgrpw9fos	cmsxkitwr006tkkuqmiq01jxl	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	giai-phong-pickleball
cmsxkitwx0070kkuq2ko05qfk	cmsxkitwx006zkkuqn2flpo0z	220000	f	Tennis 1	1	AVAILABLE	HARD	nguyen-trai-tennis
cmsxkitwy0071kkuqeq3rvmgw	cmsxkitwx006zkkuqn2flpo0z	220000	f	Tennis 2	2	AVAILABLE	HARD	nguyen-trai-tennis
cmsxkitwz0072kkuqb0ozblp8	cmsxkitwx006zkkuqn2flpo0z	220000	f	Tennis 3	3	AVAILABLE	HARD	nguyen-trai-tennis
cmsxkitx10073kkuqjvx3couq	cmsxkitwx006zkkuqn2flpo0z	220000	f	Tennis 4	4	MAINTENANCE	HARD	nguyen-trai-tennis
cmsxkitx40075kkuqspipwh4e	cmsxkitx20074kkuqyhqls9wb	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	landmark-pickleball
cmsxkitx50076kkuqrc1cm40u	cmsxkitx20074kkuqyhqls9wb	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	landmark-pickleball
cmsxkitx70077kkuq5zau4fwm	cmsxkitx20074kkuqyhqls9wb	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	landmark-pickleball
cmsxkitx80078kkuq1qrnxrjj	cmsxkitx20074kkuqyhqls9wb	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	landmark-pickleball
cmsxkitx90079kkuq4m6fm2p6	cmsxkitx20074kkuqyhqls9wb	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	landmark-pickleball
cmsxkitxa007bkkuqvy7p7ygt	cmsxkitx9007akkuqc5mupmpz	220000	f	Tennis 1	1	AVAILABLE	HARD	dien-bien-phu-tennis
cmsxkitxb007ckkuq669aitq3	cmsxkitx9007akkuqc5mupmpz	220000	f	Tennis 2	2	AVAILABLE	HARD	dien-bien-phu-tennis
cmsxkitxc007dkkuqh7luagw0	cmsxkitx9007akkuqc5mupmpz	220000	f	Tennis 3	3	AVAILABLE	HARD	dien-bien-phu-tennis
cmsxkitxd007ekkuqgw1ouvtm	cmsxkitx9007akkuqc5mupmpz	220000	f	Tennis 4	4	MAINTENANCE	HARD	dien-bien-phu-tennis
cmsxkitxf007gkkuq6fbx4w7v	cmsxkitxe007fkkuqara9h0o4	400000	f	Sân 1	1	AVAILABLE	SYNTHETIC	quan-3-football
cmsxkitxf007hkkuqn7jjhmjm	cmsxkitxe007fkkuqara9h0o4	400000	f	Sân 2	2	AVAILABLE	SYNTHETIC	quan-3-football
cmsxkitxg007ikkuq5n1kcf6y	cmsxkitxe007fkkuqara9h0o4	400000	f	Sân 3	3	AVAILABLE	SYNTHETIC	quan-3-football
cmsxkitxi007jkkuq3eh3jc8w	cmsxkitxe007fkkuqara9h0o4	400000	f	Sân 4	4	MAINTENANCE	SYNTHETIC	quan-3-football
cmsxkitxj007lkkuqox9o7snh	cmsxkitxj007kkkuqu9bctbbc	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	phan-xich-long-pickleball
cmsxkitxk007mkkuq88l05moq	cmsxkitxj007kkkuqu9bctbbc	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	phan-xich-long-pickleball
cmsxkitxl007nkkuqc9fecrae	cmsxkitxj007kkkuqu9bctbbc	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	phan-xich-long-pickleball
cmsxkitxm007okkuqg9m3jv6x	cmsxkitxj007kkkuqu9bctbbc	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	phan-xich-long-pickleball
cmsxkitxo007pkkuq3zrw9dkv	cmsxkitxj007kkkuqu9bctbbc	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	phan-xich-long-pickleball
cmsxkitxp007rkkuq8yu1d21w	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 1	1	AVAILABLE	SYNTHETIC	go-vap-badminton
cmsxkitxq007skkuqugo74vx6	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 2	2	AVAILABLE	SYNTHETIC	go-vap-badminton
cmsxkitxq007tkkuqmeznog0e	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 3	3	AVAILABLE	SYNTHETIC	go-vap-badminton
cmsxkitxr007ukkuq1ho54wox	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 4	4	AVAILABLE	SYNTHETIC	go-vap-badminton
cmsxkitxs007vkkuqw5qysake	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 5	5	AVAILABLE	SYNTHETIC	go-vap-badminton
cmsxkitxt007wkkuqtstynltr	cmsxkitxo007qkkuqd8uvoyj1	140000	t	Sân 6	6	MAINTENANCE	SYNTHETIC	go-vap-badminton
cmsxkitxx007ykkuqaoa7x3sg	cmsxkitxu007xkkuq1p5jwnse	180000	f	Pickleball 1	1	AVAILABLE	SYNTHETIC	tan-binh-pickleball
cmsxkitxz007zkkuqenncbkys	cmsxkitxu007xkkuq1p5jwnse	180000	f	Pickleball 2	2	AVAILABLE	SYNTHETIC	tan-binh-pickleball
cmsxkity00080kkuqr4ge35cx	cmsxkitxu007xkkuq1p5jwnse	180000	f	Pickleball 3	3	AVAILABLE	SYNTHETIC	tan-binh-pickleball
cmsxkity00081kkuqjia97bw6	cmsxkitxu007xkkuq1p5jwnse	180000	f	Pickleball 4	4	AVAILABLE	SYNTHETIC	tan-binh-pickleball
cmsxkity10082kkuqupfczhez	cmsxkitxu007xkkuq1p5jwnse	180000	f	Pickleball 5	5	MAINTENANCE	SYNTHETIC	tan-binh-pickleball
court-01	cmsxkity30083kkuqd8r5hwe8	180000	t	Sân 01	1	AVAILABLE	HARD	venue-01
court-02	cmsxkity30083kkuqd8r5hwe8	180000	t	Sân 02	2	AVAILABLE	HARD	venue-01
court-03	cmsxkity30083kkuqd8r5hwe8	180000	f	Sân 03	3	AVAILABLE	CLAY	venue-01
court-04	cmsxkity30083kkuqd8r5hwe8	200000	f	Sân 04	4	AVAILABLE	SYNTHETIC	venue-01
court-05	cmsxkity30083kkuqd8r5hwe8	220000	t	Sân 05	5	AVAILABLE	SYNTHETIC	venue-01
court-06	cmsxkity30083kkuqd8r5hwe8	180000	f	Sân 06	6	MAINTENANCE	HARD	venue-01
\.


--
-- Data for Name: CourtBlock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CourtBlock" (id, "blockDate", "courtId", "endMinute", kind, "startMinute", title) FROM stdin;
cmsxkiu17008dkkuqkvi8l390	2026-08-18	cmsxkitsq003ekkuqhjgadc0a	420	LOCKED	360	Vệ sinh sân
cmsxkiu19008ekkuqtkcrqiza	2026-08-18	cmsxkitsv003gkkuqrmdeotbd	660	EVENT	540	Giải giao lưu mở rộng
cmsxkiu1a008fkkuqhqgqy2zz	2026-08-18	cmsxkitsx003hkkuqh3fbewgb	420	LOCKED	360	Bảo dưỡng mặt sân
cmsxkiu1a008gkkuq024lzm5m	2026-08-18	cmsxkitt0003ikkuqc8xv2fpl	1320	LOCKED	360	Sửa mặt sân
cmsxkiu1c008hkkuqsprfye0e	2026-08-18	cmsxkitt2003jkkuqe626xqk1	1080	EVENT	960	Lớp huấn luyện thiếu niên
cmsxkiu1e008ikkuqfapa5cel	2026-08-18	cmsxkitt5003kkkuq2m8t6dpm	480	LOCKED	360	Căng lại lưới
cmsxkiu1f008jkkuq1c9owxrz	2026-08-19	cmsxkitt0003ikkuqc8xv2fpl	720	EVENT	540	Buổi social sáng
cmsxkiu1f008kkkuq924vctir	2026-08-19	cmsxkitt5003kkkuq2m8t6dpm	540	LOCKED	360	Bảo dưỡng mặt sân
cmsxkiu1p008nkkuqn2gl71rl	2026-08-18	cmsxkitt8003mkkuq813vvdn5	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu1v008qkkuqw589sj2d	2026-08-19	cmsxkitt8003mkkuq813vvdn5	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu22008tkkuq7yf8n4vl	2026-08-18	cmsxkittf003skkuqqtw5jfz1	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu29008wkkuq6buef3ry	2026-08-19	cmsxkittf003skkuqqtw5jfz1	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2e008zkkuqhxlmhq5m	2026-08-18	cmsxkittl003ykkuqc1qi85hq	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2i0092kkuqrun03uko	2026-08-19	cmsxkittl003ykkuqc1qi85hq	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2m0095kkuqd0itujet	2026-08-18	cmsxkittq0044kkuqaq4tw2ao	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2q0098kkuqbexcwraq	2026-08-19	cmsxkittq0044kkuqaq4tw2ao	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2u009bkkuqncoz5u6e	2026-08-18	cmsxkittu0049kkuq8nrrgl2a	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu2x009ekkuq9rodozwi	2026-08-19	cmsxkittu0049kkuq8nrrgl2a	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu30009hkkuqh47ttskz	2026-08-18	cmsxkitu0004gkkuq7jfmmemd	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu34009kkkuqwbqdr2ds	2026-08-19	cmsxkitu0004gkkuq7jfmmemd	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu39009nkkuq0ayab5fx	2026-08-18	cmsxkitu7004mkkuqnbx21v6x	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3b009qkkuql58j21hc	2026-08-19	cmsxkitu7004mkkuqnbx21v6x	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3g009tkkuqpt9zqk4n	2026-08-18	cmsxkituc004rkkuqfzgrasso	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3l009wkkuqfjtyb1ic	2026-08-19	cmsxkituc004rkkuqfzgrasso	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3q009zkkuqx0wocy6h	2026-08-18	cmsxkituh004wkkuq6qxtso8t	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3s00a2kkuqd9rj089y	2026-08-19	cmsxkituh004wkkuq6qxtso8t	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu3x00a5kkuq8xb2ibvj	2026-08-18	cmsxkitum0053kkuqdavrq7ju	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4200a8kkuq4v3it3ds	2026-08-19	cmsxkitum0053kkuqdavrq7ju	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4700abkkuqimwnefp7	2026-08-18	cmsxkituq0059kkuq1kntkbpx	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4a00aekkuqyp49s5sk	2026-08-19	cmsxkituq0059kkuq1kntkbpx	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4i00ahkkuqnjv0psey	2026-08-18	cmsxkituu005ekkuqmdnd5byf	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4o00akkkuqprq8lfxz	2026-08-19	cmsxkituu005ekkuqmdnd5byf	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4t00ankkuq92qqozob	2026-08-18	cmsxkitv4005kkkuqvfd0utdg	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu4y00aqkkuqkuu1q2m1	2026-08-19	cmsxkitv4005kkkuqvfd0utdg	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5300atkkuqdnvr09b9	2026-08-18	cmsxkitv8005pkkuq0jimpzhs	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5500awkkuqcxj4m3ez	2026-08-19	cmsxkitv8005pkkuq0jimpzhs	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5a00azkkuq8f8pac2x	2026-08-18	cmsxkitve005ukkuq2liyivtu	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5f00b2kkuqtbrx1fg9	2026-08-19	cmsxkitve005ukkuq2liyivtu	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5l00b5kkuqiq7hzua0	2026-08-18	cmsxkitvj0061kkuq0virm527	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5o00b8kkuqktkozhhh	2026-08-19	cmsxkitvj0061kkuq0virm527	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5t00bbkkuqxlou4c2j	2026-08-18	cmsxkitvs0067kkuqywxgqqgo	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu5x00bekkuq7xqvb5qq	2026-08-19	cmsxkitvs0067kkuqywxgqqgo	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6100bhkkuq9cr8lv2u	2026-08-18	cmsxkitw1006dkkuq5cz5vsav	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6500bkkkuqs2sfmscy	2026-08-19	cmsxkitw1006dkkuq5cz5vsav	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6900bnkkuqp9jttq6f	2026-08-18	cmsxkitw9006ikkuq5fxyht85	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6c00bqkkuq8143q5lb	2026-08-19	cmsxkitw9006ikkuq5fxyht85	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6g00btkkuqrdfhonwf	2026-08-18	cmsxkitwg006nkkuqruwhpa92	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6i00bwkkuqs463d3e5	2026-08-19	cmsxkitwg006nkkuqruwhpa92	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6m00bzkkuqf24o71pf	2026-08-18	cmsxkitws006ukkuq0otgwgk5	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6p00c2kkuqw14yzluc	2026-08-19	cmsxkitws006ukkuq0otgwgk5	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6t00c5kkuqgx99z97s	2026-08-18	cmsxkitwx0070kkuq2ko05qfk	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6v00c8kkuqtu97a76a	2026-08-19	cmsxkitwx0070kkuq2ko05qfk	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu6y00cbkkuqkaov0dpc	2026-08-18	cmsxkitx40075kkuqspipwh4e	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu7200cekkuqltyovk4l	2026-08-19	cmsxkitx40075kkuqspipwh4e	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu7500chkkuq47c0ye9h	2026-08-18	cmsxkitxa007bkkuqvy7p7ygt	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu7d00ckkkuqfhlhetov	2026-08-19	cmsxkitxa007bkkuqvy7p7ygt	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu7q00cnkkuqc55e69us	2026-08-18	cmsxkitxf007gkkuq6fbx4w7v	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu7y00cqkkuqsnmejjhu	2026-08-19	cmsxkitxf007gkkuq6fbx4w7v	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8800ctkkuqgg9qyrl7	2026-08-18	cmsxkitxj007lkkuqox9o7snh	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8g00cwkkuq2v1o77ak	2026-08-19	cmsxkitxj007lkkuqox9o7snh	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8n00czkkuqrl6dc9wi	2026-08-18	cmsxkitxp007rkkuq8yu1d21w	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8s00d2kkuqcgdeuxa6	2026-08-19	cmsxkitxp007rkkuq8yu1d21w	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8v00d5kkuq0dqk94mb	2026-08-18	cmsxkitxx007ykkuqaoa7x3sg	1140	EVENT	1020	Giải giao lưu nội bộ
cmsxkiu8z00d8kkuqyecdxi7l	2026-08-19	cmsxkitxx007ykkuqaoa7x3sg	1140	EVENT	1020	Giải giao lưu nội bộ
\.


--
-- Data for Name: CourtGroup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CourtGroup" (id, name, "sortOrder", "venueId") FROM stdin;
cmsxkitsm003ckkuqjkb4pbnq	Pickleball	1	muse-pickle
cmsxkitsn003dkkuqe4yr0moy	Tennis	2	muse-pickle
cmsxkitt7003lkkuqt8wl5bki	Pickleball	1	nhf-pickleball
cmsxkitte003rkkuqjqj5lsod	Pickleball	1	pickleball-20-thuy-khue
cmsxkittk003xkkuqmp0qzy8y	Pickleball	1	family-pickleball
cmsxkittp0043kkuqtbti3plx	Sân bóng đá	1	trung-kinh-arena
cmsxkittt0048kkuq4sj0y8al	Sân cầu lông	1	smash-badminton
cmsxkittz004fkkuq03a2ttwa	Pickleball	1	olympia-pickleball
cmsxkitu6004lkkuqvarh6kt8	Sân tennis	1	thanh-cong-tennis
cmsxkitub004qkkuq3udqhjfr	Sân bóng đá	1	star-football-cau-giay
cmsxkitug004vkkuqd3bfqm8x	Sân cầu lông	1	victory-badminton
cmsxkitul0052kkuqgfefgld5	Pickleball	1	the-royal-pickleball
cmsxkituq0058kkuqc8e1udu4	Sân bóng đá	1	my-dinh-sport-center
cmsxkitut005dkkuqqmmjy0f8	Pickleball	1	saigon-pickleball-club
cmsxkitv3005jkkuqk58bxpxk	Sân tennis	1	lan-anh-tennis
cmsxkitv8005okkuqt1m5jnjd	Sân bóng đá	1	thanh-long-football
cmsxkitvd005tkkuqcpqxp764	Sân cầu lông	1	smash-arena-binh-thanh
cmsxkitvj0060kkuq5srqc953	Pickleball	1	thu-duc-pickleball
cmsxkitvq0066kkuqypbu3rtf	Pickleball	1	lang-ha-pickleball
cmsxkitw0006ckkuqecdqtmgg	Sân tennis	1	dao-tan-tennis
cmsxkitw8006hkkuqrjfrfch0	Sân bóng đá	1	tran-duy-hung-football
cmsxkitwf006mkkuqlm5a8e4d	Sân cầu lông	1	vu-ngoc-phan-badminton
cmsxkitwr006tkkuqmiq01jxl	Pickleball	1	giai-phong-pickleball
cmsxkitwx006zkkuqn2flpo0z	Sân tennis	1	nguyen-trai-tennis
cmsxkitx20074kkuqyhqls9wb	Pickleball	1	landmark-pickleball
cmsxkitx9007akkuqc5mupmpz	Sân tennis	1	dien-bien-phu-tennis
cmsxkitxe007fkkuqara9h0o4	Sân bóng đá	1	quan-3-football
cmsxkitxj007kkkuqu9bctbbc	Pickleball	1	phan-xich-long-pickleball
cmsxkitxo007qkkuqd8uvoyj1	Sân cầu lông	1	go-vap-badminton
cmsxkitxu007xkkuq1p5jwnse	Pickleball	1	tan-binh-pickleball
cmsxkity30083kkuqd8r5hwe8	Sân tiêu chuẩn	1	venue-01
\.


--
-- Data for Name: DiscoverPost; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DiscoverPost" (id, labels, "publishedAt", type, "venueName") FROM stdin;
cmsxkiuke00onkkuq5v6me17h	{#thongbaokhoahoc,#academy}	2026-06-29 07:42:00	COURSE	Sân Cầu Lông H3
cmsxkiukf00ookkuqg3mzslra	{#uudaigohoivien}	2026-07-07 03:43:00	MEMBER	Piko House
cmsxkiukg00opkkuqoxf74zka	{#uudaosantrong}	2026-08-17 05:55:00	OFFER	SixtyNine Pickleball
cmsxkiuki00oqkkuq69omsgnl	{#sukiensocial}	2026-08-17 01:25:00	EVENT	Balanca Pickleball Club Hội An
\.


--
-- Data for Name: EventTicket; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EventTicket" (id, "createdAt", "eventId", phone, quantity, "totalPrice", "userId") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Notification" (id, "createdAt", "isRead", kind, message, title, "userId") FROM stdin;
cmsxkiuk500ojkkuqz67yrd6t	2026-08-17 01:30:00	f	BOOKING	Sự kiện SOCIAL SÁNG sẽ bắt đầu sau 30 phút. Hãy chuẩn bị để có buổi chơi thật vui nhé!	Nhắc lịch tham gia sự kiện	user-demo
cmsxkiuk800okkkuqfufiwq8f	2026-08-17 00:15:00	f	PROMOTION	Ưu đãi giảm 15% khi đặt sân Pickleball hôm nay đã sẵn sàng cho bạn.	Ưu đãi dành riêng cho bạn	user-demo
cmsxkiuka00olkkuqrntqdh8v	2026-08-16 12:05:00	t	SYSTEM	Cập nhật email để bảo mật tài khoản và dễ dàng khôi phục mật khẩu khi cần.	Hoàn thiện thông tin tài khoản	user-demo
cmsxkiukb00omkkuqqstzcsdb	2026-08-16 03:00:00	t	SYSTEM	Khám phá các quyền lợi mới trong gói hội viên của bạn.	Thông tin gói hội viên	user-demo
\.


--
-- Data for Name: PasswordReset; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PasswordReset" (id, code, "createdAt", "expiresAt", "usedAt", "userId") FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, amount, "bookingId", "createdAt", method, "paidAt", status, "transactionCode", "userId") FROM stdin;
payment-01	360000	booking-01	2026-08-14 13:10:00	E_WALLET	2026-08-14 13:11:00	PAID	PAY26081501	customer-01
payment-02	150000	booking-02	2026-08-15 01:38:00	BANK_TRANSFER	2026-08-15 01:40:00	PARTIAL	PAY26081502	customer-02
payment-03	450000	booking-03	2026-08-14 23:40:00	CASH	2026-08-14 23:42:00	PAID	PAY26081503	customer-03
payment-04	0	booking-04	2026-08-15 02:00:00	CASH	\N	UNPAID	PAY26081504	customer-04
payment-05	720000	booking-05	2026-08-13 04:15:00	CARD	2026-08-13 04:16:00	PAID	PAY26081505	customer-05
payment-06	400000	booking-06	2026-08-12 07:05:00	E_WALLET	2026-08-14 11:00:00	REFUNDED	PAY26081506	customer-06
payment-07	440000	booking-07	2026-08-15 01:02:00	CASH	2026-08-15 01:03:00	PAID	PAY26081507	customer-01
payment-08	180000	booking-08	2026-08-15 03:12:00	BANK_TRANSFER	2026-08-15 03:13:00	PARTIAL	PAY26081601	customer-02
payment-09	400000	booking-09	2026-08-15 01:04:00	CASH	2026-08-15 01:05:00	PAID	PAY26081509	customer-07
payment-10	360000	booking-10	2026-08-14 01:10:00	CARD	2026-08-14 01:11:00	PAID	PAY26081401	customer-08
payment-11	360000	booking-11	2026-08-13 09:30:00	E_WALLET	2026-08-13 09:31:00	PAID	PAY26081301	customer-03
payment-12	660000	booking-12	2026-08-11 23:30:00	BANK_TRANSFER	2026-08-11 23:31:00	PAID	PAY26081201	customer-04
payment-13	360000	booking-13	2026-08-11 07:40:00	CARD	2026-08-11 07:41:00	PAID	PAY26081101	customer-05
payment-14	0	booking-14	2026-08-10 03:30:00	CARD	\N	FAILED	PAY26081001	customer-06
\.


--
-- Data for Name: PriceRule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PriceRule" (id, "endMinute", label, "pricePerHour", "sortOrder", "startMinute", "venueId") FROM stdin;
cmsxkitnl0002kkuq02v9um66	960	Giờ thường 06:00 - 16:00	120000	1	360	muse-pickle
cmsxkitnl0003kkuqviklkx1u	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	muse-pickle
cmsxkitnt0006kkuq1gu2022f	960	Giờ thường 06:00 - 16:00	120000	1	360	nhf-pickleball
cmsxkitnt0007kkuqfgy4hxjf	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	nhf-pickleball
cmsxkito2000akkuqrp9tx4uc	960	Giờ thường 06:00 - 16:00	120000	1	360	pickleball-20-thuy-khue
cmsxkito2000bkkuql3fdna02	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	pickleball-20-thuy-khue
cmsxkitob000ekkuq5g92q9fu	960	Giờ thường 06:00 - 16:00	120000	1	360	family-pickleball
cmsxkitob000fkkuqdpzx5mx1	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	family-pickleball
cmsxkitoj000ikkuq4oumfuna	960	Giờ thường 06:00 - 16:00	250000	1	360	trung-kinh-arena
cmsxkitoj000jkkuq7plakkge	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	trung-kinh-arena
cmsxkitor000mkkuqj3adafvq	960	Giờ thường 06:00 - 16:00	90000	1	360	smash-badminton
cmsxkitor000nkkuq8v1vdoq8	1320	Giờ cao điểm 16:00 - 22:00	140000	2	960	smash-badminton
cmsxkitoz000qkkuqj5aka3fq	960	Giờ thường 06:00 - 16:00	120000	1	360	olympia-pickleball
cmsxkitoz000rkkuq58pq997g	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	olympia-pickleball
cmsxkitp5000ukkuq1e7javu8	960	Giờ thường 06:00 - 16:00	150000	1	360	thanh-cong-tennis
cmsxkitp5000vkkuqojfum9ak	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	thanh-cong-tennis
cmsxkitpa000ykkuqvsdot8jl	960	Giờ thường 06:00 - 16:00	250000	1	360	star-football-cau-giay
cmsxkitpa000zkkuq3zfz39gz	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	star-football-cau-giay
cmsxkitpe0012kkuq52jus7fl	960	Giờ thường 06:00 - 16:00	90000	1	360	victory-badminton
cmsxkitpe0013kkuqpyct88ws	1320	Giờ cao điểm 16:00 - 22:00	140000	2	960	victory-badminton
cmsxkitpj0016kkuq405ehit1	960	Giờ thường 06:00 - 16:00	120000	1	360	the-royal-pickleball
cmsxkitpj0017kkuq6w9j2fgj	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	the-royal-pickleball
cmsxkitpp001akkuqeee0343f	960	Giờ thường 06:00 - 16:00	250000	1	360	my-dinh-sport-center
cmsxkitpp001bkkuq3mn0ak89	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	my-dinh-sport-center
cmsxkitpv001ekkuqn12ibumg	960	Giờ thường 06:00 - 16:00	120000	1	360	saigon-pickleball-club
cmsxkitpv001fkkuqncbsdxoi	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	saigon-pickleball-club
cmsxkitpz001ikkuqmwt4qb3j	960	Giờ thường 06:00 - 16:00	150000	1	360	lan-anh-tennis
cmsxkitpz001jkkuqzs238sy4	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	lan-anh-tennis
cmsxkitq5001mkkuqgj7lmuyo	960	Giờ thường 06:00 - 16:00	250000	1	360	thanh-long-football
cmsxkitq5001nkkuqyh1wsdp8	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	thanh-long-football
cmsxkitqa001qkkuqo8vjhydu	960	Giờ thường 06:00 - 16:00	90000	1	360	smash-arena-binh-thanh
cmsxkitqa001rkkuq65i3369e	1320	Giờ cao điểm 16:00 - 22:00	140000	2	960	smash-arena-binh-thanh
cmsxkitqe001ukkuq0hnizxm9	960	Giờ thường 06:00 - 16:00	120000	1	360	thu-duc-pickleball
cmsxkitqe001vkkuqv8soxagy	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	thu-duc-pickleball
cmsxkitqm001ykkuqo03r6rn9	960	Giờ thường 06:00 - 16:00	120000	1	360	lang-ha-pickleball
cmsxkitqm001zkkuq2vzbik0i	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	lang-ha-pickleball
cmsxkitqr0022kkuqsnerlx9g	960	Giờ thường 06:00 - 16:00	150000	1	360	dao-tan-tennis
cmsxkitqr0023kkuqk109v6rk	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	dao-tan-tennis
cmsxkitqw0026kkuqm8807hh1	960	Giờ thường 06:00 - 16:00	250000	1	360	tran-duy-hung-football
cmsxkitqw0027kkuqnhbp8tlt	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	tran-duy-hung-football
cmsxkitr2002akkuqfzuq5vzl	960	Giờ thường 06:00 - 16:00	90000	1	360	vu-ngoc-phan-badminton
cmsxkitr2002bkkuqbkulypol	1320	Giờ cao điểm 16:00 - 22:00	140000	2	960	vu-ngoc-phan-badminton
cmsxkitr8002ekkuqj9uro9q9	960	Giờ thường 06:00 - 16:00	120000	1	360	giai-phong-pickleball
cmsxkitr8002fkkuqjrx5bvk3	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	giai-phong-pickleball
cmsxkitrd002ikkuqluqs5e47	960	Giờ thường 06:00 - 16:00	150000	1	360	nguyen-trai-tennis
cmsxkitrd002jkkuqacafw25d	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	nguyen-trai-tennis
cmsxkitrk002mkkuq859u4kqz	960	Giờ thường 06:00 - 16:00	120000	1	360	landmark-pickleball
cmsxkitrk002nkkuq91cinvz1	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	landmark-pickleball
cmsxkitrp002qkkuqf8u263o8	960	Giờ thường 06:00 - 16:00	150000	1	360	dien-bien-phu-tennis
cmsxkitrp002rkkuq01qsl3zp	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	dien-bien-phu-tennis
cmsxkitrv002ukkuqhoj1qodx	960	Giờ thường 06:00 - 16:00	250000	1	360	quan-3-football
cmsxkitrv002vkkuq9ku8fwau	1320	Giờ cao điểm 16:00 - 22:00	400000	2	960	quan-3-football
cmsxkits1002ykkuqawed5ple	960	Giờ thường 06:00 - 16:00	120000	1	360	phan-xich-long-pickleball
cmsxkits2002zkkuqbty8egeu	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	phan-xich-long-pickleball
cmsxkits60032kkuqykk1oj8f	960	Giờ thường 06:00 - 16:00	90000	1	360	go-vap-badminton
cmsxkits60033kkuq034w3zt4	1320	Giờ cao điểm 16:00 - 22:00	140000	2	960	go-vap-badminton
cmsxkitsd0036kkuqe8taesbh	960	Giờ thường 06:00 - 16:00	120000	1	360	tan-binh-pickleball
cmsxkitsd0037kkuqwa963mgd	1320	Giờ cao điểm 16:00 - 22:00	180000	2	960	tan-binh-pickleball
cmsxkitsk003akkuqax53taq6	960	Giờ thường 06:00 - 16:00	150000	1	360	venue-01
cmsxkitsk003bkkuq5xj2tfot	1320	Giờ cao điểm 16:00 - 22:00	220000	2	960	venue-01
\.


--
-- Data for Name: SportCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SportCategory" (id, icon, label, "sortOrder") FROM stdin;
pickleball	pickleball	Pickleball	1
badminton	badminton	Cầu lông	2
football	football	Bóng đá	3
basketball	basketball	Bóng rổ	4
tennis	tennis	Quần vợt	5
volleyball	volleyball	Bóng chuyền	6
table-tennis	tableTennis	Bóng bàn	7
swimming	swimming	Bơi lội	8
taekwondo	taekwondo	Taekwondo	9
athletics	athletics	Điền kinh	10
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, "birthYear", "createdAt", email, "fullName", gender, "heightCm", note, "passwordHash", phone, role, status, "updatedAt", "weightKg") FROM stdin;
user-admin	\N	2026-08-17 18:29:29.856	admin@tennishub.vn	Quản trị TennisHub	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0847968368	ADMIN	ACTIVE	2026-08-17 18:29:29.856	\N
user-demo	2000	2026-08-17 18:29:29.862	\N	khải duy	Khác	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0900000001	USER	ACTIVE	2026-08-17 18:29:29.862	\N
customer-01	\N	2026-01-12 00:00:00	minhanh@example.com	Nguyễn Minh Anh	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0901234567	USER	ACTIVE	2026-08-17 18:29:29.865	\N
customer-02	\N	2026-02-03 00:00:00	quocbao@example.com	Trần Quốc Bảo	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0912345678	USER	ACTIVE	2026-08-17 18:29:29.866	\N
customer-03	\N	2026-02-19 00:00:00	hoangnam@example.com	Lê Hoàng Nam	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0987654321	USER	ACTIVE	2026-08-17 18:29:29.868	\N
customer-04	\N	2026-03-06 00:00:00	thaovy@example.com	Phạm Thảo Vy	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0938112233	USER	ACTIVE	2026-08-17 18:29:29.869	\N
customer-05	\N	2026-04-22 00:00:00	duclong@example.com	Vũ Đức Long	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0909778899	USER	ACTIVE	2026-08-17 18:29:29.87	\N
customer-06	\N	2026-05-17 00:00:00	thutrang@example.com	Đỗ Thu Trang	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0966445566	USER	INACTIVE	2026-08-17 18:29:29.872	\N
customer-07	\N	2026-06-09 00:00:00	giahan@example.com	Hoàng Gia Hân	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0977118822	USER	ACTIVE	2026-08-17 18:29:29.873	\N
customer-08	\N	2026-07-01 00:00:00	tuanviet@example.com	Bùi Tuấn Việt	\N	\N	\N	$2b$10$A0ZRXviM356tiSSqLI/JJ.q5nsrsp3K0yGWpsax5MggyUwMg3Kdi2	0922334455	USER	ACTIVE	2026-08-17 18:29:29.875	\N
\.


--
-- Data for Name: Venue; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Venue" (id, address, "closingMinute", "coverKey", "createdAt", "isFeatured", latitude, "logoKey", longitude, mark, name, "offerCount", "openingMinute", phone, rating, "slotMinutes", "sportId", status, timezone, amenities, description) FROM stdin;
muse-pickle	198 Phố Ngọc Hà, phường Ba Đình, Hà Nội	1440	pickleball	2026-08-17 18:29:29.88	t	21.036	pickleball	105.8235	ĐTG	Muse Pickle	1	360	0847968368	5	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Muse Pickle là cụm sân pickleball tiêu chuẩn tại phường Ba Đình, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
nhf-pickleball	50 ngách 31 ngõ 135 Đội Cấn	1380	pickleball	2026-08-17 18:29:29.892	f	21.0335	pickleball	105.8172	ĐTG	NHF Pickleball	0	330	0847968368	\N	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	NHF Pickleball là cụm sân pickleball tiêu chuẩn tại 50 ngách 31 ngõ 135 Đội Cấn. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
pickleball-20-thuy-khue	20 Đ. Thụy Khuê, Thụy Khuê, Tây Hồ, Hà Nội	1440	pickleball	2026-08-17 18:29:29.899	f	21.0405	pickleball	105.8285	ĐTG	PickleBall 20 Thụy Khuê	0	300	0847968368	\N	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	PickleBall 20 Thụy Khuê là cụm sân pickleball tiêu chuẩn tại Tây Hồ, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
family-pickleball	Số 6/215 P Lê Lai, Máy Chai, Ngô Quyền, Hải Phòng	1320	tennis	2026-08-17 18:29:29.909	f	20.8628	tennis	106.6942	ĐTG	Family Pickleball	0	360	0847968368	5	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Family Pickleball là cụm sân pickleball tiêu chuẩn tại Ngô Quyền, Hải Phòng. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
trung-kinh-arena	Ngõ 100 Trung Kính, Yên Hòa, Cầu Giấy, Hà Nội	1410	football	2026-08-17 18:29:29.917	f	21.0201	football	105.7935	ĐTG	Trung Kính Arena	2	330	0847968368	4.8	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Trung Kính Arena là cụm sân bóng đá tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
smash-badminton	Số 12 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội	1380	tennis	2026-08-17 18:29:29.925	f	21.0369	badminton	105.8016	ĐTG	Smash Badminton Center	0	360	0847968368	4.6	30	badminton	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Sân trong nhà","Cho thuê vợt cầu lông"}	Smash Badminton Center là cụm sân cầu lông tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
olympia-pickleball	167 Tây Sơn, Quang Trung, Đống Đa, Hà Nội	1410	pickleball	2026-08-17 18:29:29.934	t	21.0074	pickleball	105.8231	ĐTG	Olympia Pickleball Arena	2	330	0912345001	4.9	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Olympia Pickleball Arena là cụm sân pickleball tiêu chuẩn tại Đống Đa, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
thanh-cong-tennis	82 Nguyễn Chí Thanh, Láng Hạ, Đống Đa, Hà Nội	1380	tennis	2026-08-17 18:29:29.941	f	21.0219	tennis	105.8098	ĐTG	Thành Công Tennis Club	0	300	0912345002	4.7	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	Thành Công Tennis Club là cụm sân quần vợt tiêu chuẩn tại Đống Đa, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
star-football-cau-giay	Ngõ 68 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội	1410	football	2026-08-17 18:29:29.946	f	21.0312	football	105.7989	ĐTG	Star Football Cầu Giấy	1	330	0912345003	4.5	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Star Football Cầu Giấy là cụm sân bóng đá tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
victory-badminton	45 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội	1380	tennis	2026-08-17 18:29:29.951	f	21.0328	badminton	105.7902	ĐTG	Victory Badminton Center	0	360	0912345004	4.4	30	badminton	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Sân trong nhà","Cho thuê vợt cầu lông"}	Victory Badminton Center là cụm sân cầu lông tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
the-royal-pickleball	291 Khương Trung, Thanh Xuân, Hà Nội	1410	pickleball	2026-08-17 18:29:29.956	f	20.9946	pickleball	105.8156	ĐTG	The Royal Pickleball	1	330	0912345005	4.8	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	The Royal Pickleball là cụm sân pickleball tiêu chuẩn tại Thanh Xuân, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
my-dinh-sport-center	2 Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội	1410	football	2026-08-17 18:29:29.96	t	21.0208	football	105.7644	ĐTG	Mỹ Đình Sport Center	3	300	0912345006	4.9	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Mỹ Đình Sport Center là cụm sân bóng đá tiêu chuẩn tại Nam Từ Liêm, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
saigon-pickleball-club	19 Nguyễn Văn Trỗi, Phường 12, Phú Nhuận, TP. Hồ Chí Minh	1410	pickleball	2026-08-17 18:29:29.967	t	10.7981	pickleball	106.6789	ĐTG	Saigon Pickleball Club	2	330	0912345007	4.9	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Saigon Pickleball Club là cụm sân pickleball tiêu chuẩn tại Phú Nhuận, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
lan-anh-tennis	128 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. Hồ Chí Minh	1380	tennis	2026-08-17 18:29:29.972	f	10.7808	tennis	106.6908	ĐTG	Lan Anh Tennis Club	0	300	0912345008	4.7	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	Lan Anh Tennis Club là cụm sân quần vợt tiêu chuẩn tại Quận 3, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
thanh-long-football	463 Tô Ký, Trung Mỹ Tây, Quận 12, TP. Hồ Chí Minh	1410	football	2026-08-17 18:29:29.976	f	10.8615	football	106.6172	ĐTG	Thành Long Football Arena	1	330	0912345009	4.6	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Thành Long Football Arena là cụm sân bóng đá tiêu chuẩn tại Quận 12, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
smash-arena-binh-thanh	236 Điện Biên Phủ, Phường 17, Bình Thạnh, TP. Hồ Chí Minh	1380	tennis	2026-08-17 18:29:29.982	f	10.8009	badminton	106.7124	ĐTG	Smash Arena Bình Thạnh	0	360	0912345010	4.5	30	badminton	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Sân trong nhà","Cho thuê vợt cầu lông"}	Smash Arena Bình Thạnh là cụm sân cầu lông tiêu chuẩn tại Bình Thạnh, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
thu-duc-pickleball	12 Đường số 9, Bình An, TP. Thủ Đức, TP. Hồ Chí Minh	1440	pickleball	2026-08-17 18:29:29.987	f	10.8003	pickleball	106.7429	ĐTG	Thủ Đức Pickleball Zone	1	360	0912345011	4.6	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Thủ Đức Pickleball Zone là cụm sân pickleball tiêu chuẩn tại TP. Thủ Đức, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
lang-ha-pickleball	27 Láng Hạ, Thành Công, Ba Đình, Hà Nội	1410	pickleball	2026-08-17 18:29:29.991	f	21.0165	pickleball	105.8142	ĐTG	Láng Hạ Pickleball	1	330	0912345012	4.7	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Láng Hạ Pickleball là cụm sân pickleball tiêu chuẩn tại Ba Đình, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
dao-tan-tennis	9 Đào Tấn, Cống Vị, Ba Đình, Hà Nội	1380	tennis	2026-08-17 18:29:30	f	21.0338	tennis	105.8107	ĐTG	Đào Tấn Tennis	0	300	0912345013	4.6	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	Đào Tấn Tennis là cụm sân quần vợt tiêu chuẩn tại Ba Đình, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
tran-duy-hung-football	120 Trần Duy Hurng, Trung Hòa, Cầu Giấy, Hà Nội	1410	football	2026-08-17 18:29:30.004	f	21.0092	football	105.7998	ĐTG	Trần Duy Hưng Football	1	330	0912345014	4.5	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Trần Duy Hưng Football là cụm sân bóng đá tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
vu-ngoc-phan-badminton	55 Vũ Ngọc Phan, Láng Hạ, Đống Đa, Hà Nội	1380	tennis	2026-08-17 18:29:30.009	f	21.0128	badminton	105.8149	ĐTG	Vũ Ngọc Phan Badminton	0	360	0912345015	4.4	30	badminton	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Sân trong nhà","Cho thuê vợt cầu lông"}	Vũ Ngọc Phan Badminton là cụm sân cầu lông tiêu chuẩn tại Đống Đa, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
giai-phong-pickleball	203 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội	1410	pickleball	2026-08-17 18:29:30.015	f	20.9959	pickleball	105.8412	ĐTG	Giải Phóng Pickleball	1	330	0912345016	4.6	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Giải Phóng Pickleball là cụm sân pickleball tiêu chuẩn tại Hai Bà Trưng, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
nguyen-trai-tennis	18 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội	1380	tennis	2026-08-17 18:29:30.021	f	20.9954	tennis	105.8036	ĐTG	Nguyễn Trãi Tennis Center	0	300	0912345017	4.7	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	Nguyễn Trãi Tennis Center là cụm sân quần vợt tiêu chuẩn tại Thanh Xuân, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
landmark-pickleball	90 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP. Hồ Chí Minh	1440	pickleball	2026-08-17 18:29:30.027	t	10.7947	pickleball	106.7215	ĐTG	Landmark Pickleball	2	330	0912345018	4.9	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Landmark Pickleball là cụm sân pickleball tiêu chuẩn tại Bình Thạnh, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
dien-bien-phu-tennis	215 Điện Biên Phủ, Phường 15, Bình Thạnh, TP. Hồ Chí Minh	1380	tennis	2026-08-17 18:29:30.032	f	10.8016	tennis	106.7089	ĐTG	Điện Biên Phủ Tennis	0	300	0912345019	4.6	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	Điện Biên Phủ Tennis là cụm sân quần vợt tiêu chuẩn tại Bình Thạnh, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
quan-3-football	175 Hai Bà Trưng, Phường 6, Quận 3, TP. Hồ Chí Minh	1410	football	2026-08-17 18:29:30.037	f	10.7876	football	106.6912	ĐTG	Quận 3 Mini Football	1	330	0912345020	4.5	30	football	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê giày & áo bib","Có canteen"}	Quận 3 Mini Football là cụm sân bóng đá tiêu chuẩn tại Quận 3, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
phan-xich-long-pickleball	360 Phan Xích Long, Phường 2, Phú Nhuận, TP. Hồ Chí Minh	1410	pickleball	2026-08-17 18:29:30.045	f	10.7996	pickleball	106.6883	ĐTG	Phan Xích Long Pickleball	1	330	0912345021	4.7	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Phan Xích Long Pickleball là cụm sân pickleball tiêu chuẩn tại Phú Nhuận, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
go-vap-badminton	412 Nguyễn Kiệm, Phường 3, Gò Vấp, TP. Hồ Chí Minh	1380	tennis	2026-08-17 18:29:30.051	f	10.8181	badminton	106.6785	ĐTG	Gò Vấp Badminton Arena	0	360	0912345022	4.4	30	badminton	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Sân trong nhà","Cho thuê vợt cầu lông"}	Gò Vấp Badminton Arena là cụm sân cầu lông tiêu chuẩn tại Gò Vấp, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
tan-binh-pickleball	88 Cộng Hòa, Phường 4, Tân Bình, TP. Hồ Chí Minh	1440	pickleball	2026-08-17 18:29:30.056	f	10.8004	pickleball	106.6521	ĐTG	Tân Bình Pickleball Zone	1	330	0912345023	4.6	30	pickleball	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt & bóng","Huấn luyện viên hỗ trợ"}	Tân Bình Pickleball Zone là cụm sân pickleball tiêu chuẩn tại Tân Bình, TP. Hồ Chí Minh. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
venue-01	12 Nguyễn Khánh Toàn, Cầu Giấy, Hà Nội	1320	tennis	2026-08-17 18:29:30.063	f	21.0372	tennis	105.802	ĐTG	TennisHub Cầu Giấy	0	360	0847968368	4.9	30	tennis	ACTIVE	Asia/Bangkok	{"Bãi đỗ xe rộng","Wifi miễn phí","Phòng thay đồ","Nước uống tại sân","Cho thuê vợt tennis","Máy bắn bóng tập luyện"}	TennisHub Cầu Giấy là cụm sân quần vợt tiêu chuẩn tại Cầu Giấy, Hà Nội. Mặt sân được bảo dưỡng thường xuyên, hệ thống chiếu sáng tốt, phù hợp cho cả tập luyện lẫn thi đấu giao lưu. Đặt lịch trực tuyến nhanh chóng, thanh toán linh hoạt.
\.


--
-- Data for Name: VenueBadge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VenueBadge" (id, code, label, "sortOrder", tone, "venueId") FROM stdin;
cmsxkitnh0000kkuqky8pl9yp	single	Đơn ngày	1	SINGLE	muse-pickle
cmsxkitnh0001kkuqh1crwq0o	event	Sự kiện	2	EVENT	muse-pickle
cmsxkitnr0004kkuq32upcy82	single	Đơn ngày	1	SINGLE	nhf-pickleball
cmsxkitnr0005kkuqntk3eoke	event	Sự kiện	2	EVENT	nhf-pickleball
cmsxkitny0008kkuq0h99r764	single	Đơn ngày	1	SINGLE	pickleball-20-thuy-khue
cmsxkitny0009kkuqz2do97od	event	Sự kiện	2	EVENT	pickleball-20-thuy-khue
cmsxkito8000ckkuqver4555g	single	Đơn ngày	1	SINGLE	family-pickleball
cmsxkito8000dkkuqko0wunu7	event	Sự kiện	2	EVENT	family-pickleball
cmsxkitog000gkkuqo4r2neco	single	Đơn ngày	1	SINGLE	trung-kinh-arena
cmsxkitog000hkkuqriqrf8wh	event	Sự kiện	2	EVENT	trung-kinh-arena
cmsxkitop000kkkuqsqw84c8t	single	Đơn ngày	1	SINGLE	smash-badminton
cmsxkitop000lkkuqfmvp35cx	event	Sự kiện	2	EVENT	smash-badminton
cmsxkitox000okkuqx9kmuk8h	single	Đơn ngày	1	SINGLE	olympia-pickleball
cmsxkitox000pkkuqhkebjn3v	event	Sự kiện	2	EVENT	olympia-pickleball
cmsxkitp3000skkuq4bure06y	single	Đơn ngày	1	SINGLE	thanh-cong-tennis
cmsxkitp3000tkkuqo60o8qaq	event	Sự kiện	2	EVENT	thanh-cong-tennis
cmsxkitp8000wkkuqggeu5dci	single	Đơn ngày	1	SINGLE	star-football-cau-giay
cmsxkitp8000xkkuqx5oyve1w	event	Sự kiện	2	EVENT	star-football-cau-giay
cmsxkitpd0010kkuqu2k6r0q9	single	Đơn ngày	1	SINGLE	victory-badminton
cmsxkitpd0011kkuq8fo7togr	event	Sự kiện	2	EVENT	victory-badminton
cmsxkitph0014kkuqfui4aq3w	single	Đơn ngày	1	SINGLE	the-royal-pickleball
cmsxkitpi0015kkuqegnvtd6a	event	Sự kiện	2	EVENT	the-royal-pickleball
cmsxkitpm0018kkuqyp7yzab2	single	Đơn ngày	1	SINGLE	my-dinh-sport-center
cmsxkitpm0019kkuqkdjy16d8	event	Sự kiện	2	EVENT	my-dinh-sport-center
cmsxkitpt001ckkuqzo7n2adw	single	Đơn ngày	1	SINGLE	saigon-pickleball-club
cmsxkitpt001dkkuq0eb6h2ut	event	Sự kiện	2	EVENT	saigon-pickleball-club
cmsxkitpy001gkkuq3tpyt0jn	single	Đơn ngày	1	SINGLE	lan-anh-tennis
cmsxkitpy001hkkuq3jgxxpt6	event	Sự kiện	2	EVENT	lan-anh-tennis
cmsxkitq2001kkkuqt4jilhgv	single	Đơn ngày	1	SINGLE	thanh-long-football
cmsxkitq2001lkkuqnks9ycyk	event	Sự kiện	2	EVENT	thanh-long-football
cmsxkitq8001okkuq4ighbczy	single	Đơn ngày	1	SINGLE	smash-arena-binh-thanh
cmsxkitq8001pkkuq87x9gb0h	event	Sự kiện	2	EVENT	smash-arena-binh-thanh
cmsxkitqc001skkuqifn3dt3a	single	Đơn ngày	1	SINGLE	thu-duc-pickleball
cmsxkitqc001tkkuq4xk4eoof	event	Sự kiện	2	EVENT	thu-duc-pickleball
cmsxkitql001wkkuqhz4oqza0	single	Đơn ngày	1	SINGLE	lang-ha-pickleball
cmsxkitql001xkkuqh29lpxya	event	Sự kiện	2	EVENT	lang-ha-pickleball
cmsxkitqq0020kkuq8qzra1bp	single	Đơn ngày	1	SINGLE	dao-tan-tennis
cmsxkitqq0021kkuqyohtrqhm	event	Sự kiện	2	EVENT	dao-tan-tennis
cmsxkitqu0024kkuqd29mhs9u	single	Đơn ngày	1	SINGLE	tran-duy-hung-football
cmsxkitqu0025kkuq8nifvbok	event	Sự kiện	2	EVENT	tran-duy-hung-football
cmsxkitqz0028kkuqqceqy8bt	single	Đơn ngày	1	SINGLE	vu-ngoc-phan-badminton
cmsxkitqz0029kkuqm9mpl5ei	event	Sự kiện	2	EVENT	vu-ngoc-phan-badminton
cmsxkitr6002ckkuqgqeq06jx	single	Đơn ngày	1	SINGLE	giai-phong-pickleball
cmsxkitr6002dkkuqgl5l2al0	event	Sự kiện	2	EVENT	giai-phong-pickleball
cmsxkitrb002gkkuqohqkvi37	single	Đơn ngày	1	SINGLE	nguyen-trai-tennis
cmsxkitrb002hkkuqgaz8qyns	event	Sự kiện	2	EVENT	nguyen-trai-tennis
cmsxkitri002kkkuquiohn5w2	single	Đơn ngày	1	SINGLE	landmark-pickleball
cmsxkitri002lkkuqfnksd9l0	event	Sự kiện	2	EVENT	landmark-pickleball
cmsxkitrn002okkuqthzzrran	single	Đơn ngày	1	SINGLE	dien-bien-phu-tennis
cmsxkitrn002pkkuqwdli6znv	event	Sự kiện	2	EVENT	dien-bien-phu-tennis
cmsxkitrt002skkuqprgfrtub	single	Đơn ngày	1	SINGLE	quan-3-football
cmsxkitrt002tkkuq6vfkgmsp	event	Sự kiện	2	EVENT	quan-3-football
cmsxkits0002wkkuqc14rfo6f	single	Đơn ngày	1	SINGLE	phan-xich-long-pickleball
cmsxkits0002xkkuq8ausx99v	event	Sự kiện	2	EVENT	phan-xich-long-pickleball
cmsxkits50030kkuqpsqinh6d	single	Đơn ngày	1	SINGLE	go-vap-badminton
cmsxkits50031kkuqkbktntvg	event	Sự kiện	2	EVENT	go-vap-badminton
cmsxkitsb0034kkuqav6m2ag8	single	Đơn ngày	1	SINGLE	tan-binh-pickleball
cmsxkitsb0035kkuqq419458j	event	Sự kiện	2	EVENT	tan-binh-pickleball
cmsxkitsh0038kkuqsh92u8yq	single	Đơn ngày	1	SINGLE	venue-01
cmsxkitsh0039kkuql1s5k0iu	event	Sự kiện	2	EVENT	venue-01
\.


--
-- Data for Name: VenueEvent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VenueEvent" (id, capacity, "courtLabel", "endMinute", "eventDate", price, "soldCount", "startMinute", title, "venueId") FROM stdin;
cmsxkiu9000d9kkuqvg03z50j	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9000dakkuqv2woneo4	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9400dbkkuq36lwtwbi	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9400dckkuqio2c7amj	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9600ddkkuq8ka1jrdk	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9700dekkuqrvl9mij3	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9900dfkkuqw0qc4riu	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9900dgkkuq4lv1qtis	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9b00dhkkuq9z6waivc	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9b00dikkuqjok8up50	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9c00djkkuqcq7ejupu	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9c00dkkkuqqu5doqge	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9e00dlkkuqxa1ffcje	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	muse-pickle
cmsxkiu9e00dmkkuqa1vz7jc8	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	muse-pickle
cmsxkiu9g00dnkkuql8rohtx7	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9g00dokkuq8fmxclip	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9h00dpkkuqwng2kh33	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9h00dqkkuqfwb4p2ck	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9j00drkkuq1e237gu5	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9j00dskkuqdjntcesk	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9l00dtkkuqcmt2fwms	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9l00dukkuqv0sexcyq	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9m00dvkkuq7sdwcnxr	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9m00dwkkuq1i6fky9j	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9n00dxkkuqmefr161z	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9n00dykkuqlheeckxh	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9q00dzkkuqst1t6jus	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	nhf-pickleball
cmsxkiu9q00e0kkuqiccd38fj	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	nhf-pickleball
cmsxkiu9r00e1kkuqp1esmza8	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiu9r00e2kkuqhr78y0ez	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiu9s00e3kkuqzo4twzah	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiu9s00e4kkuq67sxk5i2	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiu9u00e5kkuqa7eerzs8	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiu9u00e6kkuqg9rqtzss	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiu9x00e7kkuqoxk1kc2g	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiu9x00e8kkuq2zo54e0u	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiu9y00e9kkuqlhq7l9lt	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiu9y00eakkuqifxhtjr6	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiua000ebkkuqpvfvtomu	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiua000eckkuql3ocjzy5	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiua200edkkuq8ne9b4dr	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	pickleball-20-thuy-khue
cmsxkiua200eekkuqj0bod1yh	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	pickleball-20-thuy-khue
cmsxkiua300efkkuqscabrhv8	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	family-pickleball
cmsxkiua300egkkuqy4te7y3a	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	family-pickleball
cmsxkiua500ehkkuq3cszjfjj	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	family-pickleball
cmsxkiua500eikkuqxyvsg693	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	family-pickleball
cmsxkiua700ejkkuqr97fm5lh	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	family-pickleball
cmsxkiua700ekkkuq4qga0oll	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	family-pickleball
cmsxkiua900elkkuqyu25eved	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	family-pickleball
cmsxkiua900emkkuqzs0rg828	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	family-pickleball
cmsxkiuaa00enkkuqckc4900q	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	family-pickleball
cmsxkiuaa00eokkuq650ud7oq	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	family-pickleball
cmsxkiuac00epkkuqjkjj04t9	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	family-pickleball
cmsxkiuac00eqkkuqvdobgs09	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	family-pickleball
cmsxkiuae00erkkuqohxugh8a	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	family-pickleball
cmsxkiuae00eskkuqo1840d94	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	family-pickleball
cmsxkiuag00etkkuqmwu3av1c	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuag00eukkuq1atkkbxt	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuai00evkkuqm0uhneq5	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuai00ewkkuqmulp9kmt	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuaj00exkkuq2e02uyk5	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuaj00eykkuq22i6zfdh	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiual00ezkkuq600me10w	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiual00f0kkuq58odb98r	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuao00f1kkuq9paiek3h	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuao00f2kkuqd3776069	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuap00f3kkuqbeq24be6	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuap00f4kkuqwfm1d1p5	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuaq00f5kkuq2jwsyi1b	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	trung-kinh-arena
cmsxkiuaq00f6kkuqs4g0nha7	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	trung-kinh-arena
cmsxkiuau00f7kkuqzt3xf8wf	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	smash-badminton
cmsxkiuau00f8kkuq0ww7zead	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	smash-badminton
cmsxkiuax00f9kkuqhdm7xr5u	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	smash-badminton
cmsxkiuax00fakkuqjywcx9ji	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	smash-badminton
cmsxkiub000fbkkuqes2m6hsh	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	smash-badminton
cmsxkiub000fckkuqmcp6bs6k	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	smash-badminton
cmsxkiub200fdkkuqjxrfwi5d	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	smash-badminton
cmsxkiub200fekkuqn9bd5m7z	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	smash-badminton
cmsxkiub500ffkkuqd5y9ie9p	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	smash-badminton
cmsxkiub500fgkkuq5hwr19lz	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	smash-badminton
cmsxkiub900fhkkuq19bnddvc	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	smash-badminton
cmsxkiub900fikkuq0x4nyzog	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	smash-badminton
cmsxkiubd00fjkkuqn3ng3cah	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	smash-badminton
cmsxkiubd00fkkkuqp5t0sk7j	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	smash-badminton
cmsxkiubg00flkkuqubkybc9x	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubg00fmkkuq0mcpuuji	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubj00fnkkuqmg2v429o	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubj00fokkuq9vg9j6yo	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubm00fpkkuq7f1sdan1	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubm00fqkkuqdp89ao9x	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubo00frkkuq7jxtr1qq	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubo00fskkuqzy08qrz5	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubr00ftkkuqvu287io8	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubr00fukkuq0p4qlfug	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubt00fvkkuqfak6lt7n	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubt00fwkkuqtlap9mry	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubw00fxkkuqy966hdhx	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	olympia-pickleball
cmsxkiubw00fykkuqy7pqoa4h	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	olympia-pickleball
cmsxkiubx00fzkkuq3chterg9	10	Tennis 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiubx00g0kkuq2pphj93r	10	Tennis 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuby00g1kkuqncvpc36j	10	Tennis 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuby00g2kkuqg8rggg0l	10	Tennis 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuc100g3kkuqsa6k3jdo	10	Tennis 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuc100g4kkuqujxsi3qp	10	Tennis 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuc300g5kkuq9gad27dx	10	Tennis 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuc300g6kkuqbjjhv3kz	10	Tennis 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuc500g7kkuqjta1hjza	10	Tennis 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuc500g8kkuqusbos5ez	10	Tennis 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuc700g9kkuqg2fam3f9	10	Tennis 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuc700gakkuqme09n1fz	10	Tennis 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiuc900gbkkuq3uapcuxd	10	Tennis 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	thanh-cong-tennis
cmsxkiuc900gckkuqs1yl2vqo	10	Tennis 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	thanh-cong-tennis
cmsxkiucc00gdkkuqwug19jsc	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiucc00gekkuqcitnlojo	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiuce00gfkkuqp0huq75d	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiuce00ggkkuqvkciqd9n	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiucf00ghkkuqkzkk9qbr	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiucf00gikkuqr4q67elf	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiuch00gjkkuql8zihhlf	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiuch00gkkkuqafebafhd	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiucj00glkkuqcgg2mtv3	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiucj00gmkkuqsnttulh4	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiuck00gnkkuqov6voxi9	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiuck00gokkuqwu7g3p5m	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiucn00gpkkuqxmisy6zv	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	star-football-cau-giay
cmsxkiucn00gqkkuqql9z8yni	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	star-football-cau-giay
cmsxkiuco00grkkuqkg87t2p6	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	victory-badminton
cmsxkiuco00gskkuqn9ym611e	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucp00gtkkuqalz2255y	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	victory-badminton
cmsxkiucp00gukkuqqryk13yr	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucq00gvkkuqhgdi8jn9	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	victory-badminton
cmsxkiucq00gwkkuq6ovxbu5y	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	victory-badminton
cmsxkiuct00gxkkuqkqjjeqjk	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	victory-badminton
cmsxkiuct00gykkuqr2dfqfu0	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucu00gzkkuqeiaxnuzs	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	victory-badminton
cmsxkiucu00h0kkuqzlg3sgl6	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucv00h1kkuqednts9d4	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	victory-badminton
cmsxkiucv00h2kkuq6xyoispv	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucx00h3kkuqvl6g353e	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	victory-badminton
cmsxkiucx00h4kkuq3nkksd4g	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	victory-badminton
cmsxkiucz00h5kkuqnl4kje7d	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiucz00h6kkuqem1r5hin	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud100h7kkuq5udsrdn2	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud100h8kkuq53zpdfos	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud200h9kkuqk6xwf2r8	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud200hakkuqf4rx71k2	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud400hbkkuq4bf0oi08	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud400hckkuqd2ziqyi4	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud500hdkkuq2wvvaqy4	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud500hekkuqieu94p0z	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud600hfkkuqfwkfcu2z	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud600hgkkuqfzuc4pwo	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiud900hhkkuqqxrusdxj	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	the-royal-pickleball
cmsxkiud900hikkuqe9fjkanm	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	the-royal-pickleball
cmsxkiudc00hjkkuqfbgvtmut	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudc00hkkkuq3d557kuz	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudf00hlkkuq8l7nh7ss	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudf00hmkkuql7vugji7	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudg00hnkkuq19d5p9ok	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudg00hokkuq5yul88ki	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudl00hpkkuqjq59b77r	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudl00hqkkuqxgsdmucf	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudn00hrkkuqdmh6zsmx	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudn00hskkuqw5goola1	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudq00htkkuqyu2twm7i	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudq00hukkuqxjdr1hmu	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudr00hvkkuqebpuxbnq	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	my-dinh-sport-center
cmsxkiudr00hwkkuqgurweby8	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	my-dinh-sport-center
cmsxkiudt00hxkkuq1xoj8d5h	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiudt00hykkuqmz3pun4g	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiudv00hzkkuqb6zce27b	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiudv00i0kkuqbgqio44l	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiudy00i1kkuqixd54iyv	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiudy00i2kkuq8gndt20m	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiue100i3kkuqzoyp3awt	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiue100i4kkuq8u6tb50h	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiue200i5kkuq72xt6dmm	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiue200i6kkuqz2xran2u	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiue400i7kkuqgd7uetr9	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiue400i8kkuqbv8try41	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiue700i9kkuqm0geterx	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	saigon-pickleball-club
cmsxkiue700iakkuqejkjkk1u	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	saigon-pickleball-club
cmsxkiue900ibkkuq2itz2nk6	10	Tennis 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiue900ickkuqe91u3sg8	10	Tennis 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiuea00idkkuqcuc8wyu4	10	Tennis 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiuea00iekkuqq44kgxhv	10	Tennis 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiued00ifkkuqp7w0xejs	10	Tennis 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiued00igkkuqt32mtce3	10	Tennis 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiueg00ihkkuqzhj5v26p	10	Tennis 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiueg00iikkuq8w3xoy6b	10	Tennis 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiuei00ijkkuqhams9fsy	10	Tennis 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiuei00ikkkuqkud9qcgk	10	Tennis 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiuej00ilkkuqyfmbzxkm	10	Tennis 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiuej00imkkuq5rff0cf6	10	Tennis 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiuel00inkkuqodfzalwj	10	Tennis 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	lan-anh-tennis
cmsxkiuel00iokkuqncntklvn	10	Tennis 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	lan-anh-tennis
cmsxkiueo00ipkkuqr6hwlo61	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	thanh-long-football
cmsxkiueo00iqkkuqnm2cr69r	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiuep00irkkuq0of10a6r	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	thanh-long-football
cmsxkiuep00iskkuq1kfgxlzc	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiueq00itkkuqdsne8ikf	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	thanh-long-football
cmsxkiueq00iukkuqe7t5i3bd	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiues00ivkkuqlazj9psi	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	thanh-long-football
cmsxkiues00iwkkuquhh200sg	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiuet00ixkkuqckav5ry6	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	thanh-long-football
cmsxkiuet00iykkuq5v7xe50f	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiueu00izkkuqkgrr12yb	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	thanh-long-football
cmsxkiueu00j0kkuq1lxwd7wc	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiuev00j1kkuqghk8iqft	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	thanh-long-football
cmsxkiuev00j2kkuq91fxraz9	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	thanh-long-football
cmsxkiuez00j3kkuqwth3puzh	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuez00j4kkuqs1s4dr4e	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf000j5kkuqrbf1hpqp	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf000j6kkuq8dyj7rcv	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf100j7kkuqmrbut7qt	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf100j8kkuq7uxb7uq7	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf300j9kkuq2v8fpbzb	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf300jakkuqas5up9q1	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf400jbkkuqhdezy7q0	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf400jckkuqopsn7kfo	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf500jdkkuqwgft366s	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf500jekkuq4723010w	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiuf700jfkkuq4v736dqe	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	smash-arena-binh-thanh
cmsxkiuf700jgkkuqo66l0acc	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	smash-arena-binh-thanh
cmsxkiufb00jhkkuq0o332s4y	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufb00jikkuqgy1aa1d0	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufe00jjkkuqjtuekkc2	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufe00jkkkuqgubzbgpk	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufh00jlkkuqmsqp97ze	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufh00jmkkuqlt3cnv9i	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufj00jnkkuqbbosjsbz	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufj00jokkuqiuhmwa6k	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufm00jpkkuqyt40mkoh	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufm00jqkkuqv4d3ojpz	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufq00jrkkuqgoyfbkar	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufq00jskkuqz9e5f0yp	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiufs00jtkkuq1c9qxr38	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	thu-duc-pickleball
cmsxkiufs00jukkuqpv9ltujd	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	thu-duc-pickleball
cmsxkiuft00jvkkuq7brubrmq	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiuft00jwkkuqgz2n2l7r	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiufv00jxkkuq855rro0o	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiufv00jykkuq674efmil	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiufx00jzkkuq2h4qw6r9	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiufx00k0kkuqqpx3qk09	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiufy00k1kkuqtra6vmby	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiufy00k2kkuqby9isg58	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiufz00k3kkuq5rhvtgoq	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiufz00k4kkuqwnz01hjs	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiug200k5kkuqainctkmf	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiug200k6kkuqa2gsvoo2	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiug400k7kkuq9y1p0vay	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	lang-ha-pickleball
cmsxkiug400k8kkuqlwl4vnkd	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	lang-ha-pickleball
cmsxkiug700k9kkuqjvz4umwm	10	Tennis 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiug700kakkuq9p6wslqp	10	Tennis 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiug900kbkkuq7tmylwqu	10	Tennis 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiug900kckkuq20ttul65	10	Tennis 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiuga00kdkkuq7z0ml7q5	10	Tennis 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiuga00kekkuqgi4yzean	10	Tennis 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiugc00kfkkuqm0t5y4uk	10	Tennis 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiugc00kgkkuqlbu49mpx	10	Tennis 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiugd00khkkuqixkaqylt	10	Tennis 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiugd00kikkuqfbir4gpe	10	Tennis 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiugf00kjkkuqq9aen2u3	10	Tennis 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiugf00kkkkuqni22zngr	10	Tennis 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiugi00klkkuq32cr2m4z	10	Tennis 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	dao-tan-tennis
cmsxkiugi00kmkkuqfhwp8j9s	10	Tennis 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	dao-tan-tennis
cmsxkiugk00knkkuqfyzuzt3k	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugk00kokkuqp6bnhgj2	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugl00kpkkuq269moqb8	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugl00kqkkuq11y20akv	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugm00krkkuqdfirsa0y	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugm00kskkuqe63924kt	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugo00ktkkuqkt7y4hk1	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugo00kukkuqpfp65nml	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugp00kvkkuqdbpxru46	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugp00kwkkuq4xgqcvg3	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugq00kxkkuqfolyt06d	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugq00kykkuqcnkt9zg4	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugs00kzkkuqj1h7aq2w	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	tran-duy-hung-football
cmsxkiugs00l0kkuqysgkinun	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	tran-duy-hung-football
cmsxkiugu00l1kkuq7boh7uha	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiugu00l2kkuq8ja7gx8v	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiugv00l3kkuqz057ctz6	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiugv00l4kkuqaqhxb1ps	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiugw00l5kkuqdc7p9d7v	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiugw00l6kkuq17diuex2	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiugz00l7kkuqgejg6iy8	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiugz00l8kkuqckpxb4t4	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiuh000l9kkuqcci638jd	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiuh000lakkuq65k15rkr	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiuh200lbkkuqr2anx0ar	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiuh200lckkuqumrkr7dw	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiuh400ldkkuqcrnlddvg	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	vu-ngoc-phan-badminton
cmsxkiuh400lekkuqdv0shl55	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	vu-ngoc-phan-badminton
cmsxkiuh600lfkkuq4ncvbtfl	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuh600lgkkuqbtr8ut0e	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuh900lhkkuqz7rolyej	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuh900likkuqfgisoaxr	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhb00ljkkuqutvb1vf2	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuhb00lkkkuqe8ixvrbv	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhc00llkkuqvnb467b2	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuhc00lmkkuqyhwmncee	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhd00lnkkuq4jbbmro9	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuhd00lokkuqzxf6t3sz	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhg00lpkkuqrnwulv0j	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuhg00lqkkuq1sapygdu	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhh00lrkkuqgd36htfu	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	giai-phong-pickleball
cmsxkiuhh00lskkuql74kywy4	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	giai-phong-pickleball
cmsxkiuhi00ltkkuq18adnbfe	10	Tennis 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhi00lukkuqpzl6rrxa	10	Tennis 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhl00lvkkuq18vgn2pd	10	Tennis 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhl00lwkkuqlr5gmg81	10	Tennis 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhm00lxkkuqr786vd3h	10	Tennis 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhm00lykkuqasii0yl9	10	Tennis 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhn00lzkkuqxonqhb9q	10	Tennis 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhn00m0kkuq34hw3rmr	10	Tennis 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhp00m1kkuq2qcklifp	10	Tennis 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhp00m2kkuqd686f15i	10	Tennis 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhs00m3kkuqz6rgp4f2	10	Tennis 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuhs00m4kkuq25jn7tdc	10	Tennis 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuht00m5kkuqxusevr4z	10	Tennis 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	nguyen-trai-tennis
cmsxkiuht00m6kkuqkzpbdegj	10	Tennis 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	nguyen-trai-tennis
cmsxkiuhv00m7kkuq5j5g3gt1	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiuhv00m8kkuqfu5ez43p	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiuhx00m9kkuqhnogjtjo	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiuhx00makkuqi2sm8may	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiuhy00mbkkuqimi2wunu	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiuhy00mckkuqr70jfoci	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiuhz00mdkkuqfi2iavn0	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiuhz00mekkuqf6yxnfp1	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiui200mfkkuqw9gyjd2h	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiui200mgkkuqpbyi14n6	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiui300mhkkuq0o5wb4h0	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiui300mikkuqqsf3fulv	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiui400mjkkuqif1pqj1m	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	landmark-pickleball
cmsxkiui400mkkkuqoolyu225	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	landmark-pickleball
cmsxkiui700mlkkuq23prygky	10	Tennis 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiui700mmkkuqaf6id4af	10	Tennis 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiui900mnkkuqqomt8kd4	10	Tennis 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiui900mokkuqw7icf715	10	Tennis 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuib00mpkkuqfcz26sgx	10	Tennis 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiuib00mqkkuq6vbestps	10	Tennis 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuie00mrkkuq8qbfx82s	10	Tennis 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiuie00mskkuqgi632q3a	10	Tennis 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuig00mtkkuq0pe39x5a	10	Tennis 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiuig00mukkuqz777wa76	10	Tennis 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuii00mvkkuq91lf4fsr	10	Tennis 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiuii00mwkkuq51yk4yd8	10	Tennis 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuik00mxkkuq3hbg08tn	10	Tennis 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	dien-bien-phu-tennis
cmsxkiuik00mykkuqm9hq0ue5	10	Tennis 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	dien-bien-phu-tennis
cmsxkiuil00mzkkuqehxmtnv5	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	quan-3-football
cmsxkiuil00n0kkuqnc7vi5kk	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuio00n1kkuqodcdqlld	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	quan-3-football
cmsxkiuio00n2kkuq39b0tsyn	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuiq00n3kkuqi4ssiyq9	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	quan-3-football
cmsxkiuiq00n4kkuqb5hweeqg	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuir00n5kkuqst1brnce	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	quan-3-football
cmsxkiuir00n6kkuq1bpxg2v1	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuiu00n7kkuqx9jzq1em	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	quan-3-football
cmsxkiuiu00n8kkuqhujrb21v	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuiv00n9kkuqfxgf52w7	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	quan-3-football
cmsxkiuiv00nakkuq0bycsoto	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuiw00nbkkuq2la5rxnm	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	quan-3-football
cmsxkiuiw00nckkuqu9o25gxd	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	quan-3-football
cmsxkiuiz00ndkkuqbhbx07m3	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuiz00nekkuqn1gegvzm	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj000nfkkuq8qpet07x	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj000ngkkuq36jibab1	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj100nhkkuqsnzkfg8a	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj100nikkuqyc2cr7ij	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj300njkkuqc0pecajd	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj300nkkkuqrz8350dv	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj600nlkkuq6zh3fsuv	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj600nmkkuque0k7xtg	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj700nnkkuqwcqb3yd8	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj700nokkuqydij5zmq	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiuj800npkkuqbxn2nmey	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	phan-xich-long-pickleball
cmsxkiuj800nqkkuqnwxctb54	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	phan-xich-long-pickleball
cmsxkiujb00nrkkuq7mpfx1g9	10	Sân 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujb00nskkuqfqkbfe6e	10	Sân 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujc00ntkkuqbr50lg8d	10	Sân 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujc00nukkuq5tm1wqxi	10	Sân 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujd00nvkkuqett9pn8h	10	Sân 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujd00nwkkuq2wgt3x5u	10	Sân 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujg00nxkkuqmaiu029p	10	Sân 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujg00nykkuqyzhvcejp	10	Sân 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiuji00nzkkuq8jzh369b	10	Sân 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiuji00o0kkuq3jphgq9v	10	Sân 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujj00o1kkuq2mnjvg29	10	Sân 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujj00o2kkuqur9922p6	10	Sân 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujn00o3kkuq7nl6spc1	10	Sân 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	go-vap-badminton
cmsxkiujn00o4kkuq03nb8ddp	10	Sân 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	go-vap-badminton
cmsxkiujo00o5kkuqr068kze7	10	Pickleball 1 - 2	720	2026-08-18	60000	0	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiujo00o6kkuqmiz0m3qt	10	Pickleball 1 - 2	960	2026-08-18	70000	0	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiujq00o7kkuq0fcozhqi	10	Pickleball 1 - 2	720	2026-08-19	60000	2	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiujq00o8kkuqtoqkdy80	10	Pickleball 1 - 2	960	2026-08-19	70000	3	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiujs00o9kkuqdsnuauai	10	Pickleball 1 - 2	720	2026-08-20	60000	4	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiujs00oakkuqdgrax47w	10	Pickleball 1 - 2	960	2026-08-20	70000	6	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiujt00obkkuqih6x2wad	10	Pickleball 1 - 2	720	2026-08-21	60000	6	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiujt00ockkuqnlveikc2	10	Pickleball 1 - 2	960	2026-08-21	70000	0	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiuju00odkkuq6nf4ki8z	10	Pickleball 1 - 2	720	2026-08-22	60000	8	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiuju00oekkuqx3syxfl4	10	Pickleball 1 - 2	960	2026-08-22	70000	3	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiujz00ofkkuqgj7orh4g	10	Pickleball 1 - 2	720	2026-08-23	60000	1	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiujz00ogkkuqhi4ch8lg	10	Pickleball 1 - 2	960	2026-08-23	70000	6	780	SOCIAL CHIỀU	tan-binh-pickleball
cmsxkiuk300ohkkuqets7zbi1	10	Pickleball 1 - 2	720	2026-08-24	60000	3	540	SOCIAL SÁNG	tan-binh-pickleball
cmsxkiuk300oikkuq20y1c7t7	10	Pickleball 1 - 2	960	2026-08-24	70000	0	780	SOCIAL CHIỀU	tan-binh-pickleball
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
10d271bb-9d78-4f63-ac85-abd832849cbd	ed026a8c9edeb448ac138e3d3f7df68f9edaac2921a08d0e9d03f6135f2e2441	2026-08-18 00:09:37.398075+07	20260817170937_init	\N	\N	2026-08-18 00:09:37.128784+07	1
c0c6bd51-8633-4a60-b934-0a5b80830cf4	a9b474ae854fff509a4414d3fb4793be500e26e823f2a9c660e815768bab6f5e	2026-08-18 01:22:50.018309+07	20260817182249_venue_preview	\N	\N	2026-08-18 01:22:50.004422+07	1
\.


--
-- Name: ActivityEvent ActivityEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityEvent"
    ADD CONSTRAINT "ActivityEvent_pkey" PRIMARY KEY (id);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: CourtBlock CourtBlock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourtBlock"
    ADD CONSTRAINT "CourtBlock_pkey" PRIMARY KEY (id);


--
-- Name: CourtGroup CourtGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourtGroup"
    ADD CONSTRAINT "CourtGroup_pkey" PRIMARY KEY (id);


--
-- Name: Court Court_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Court"
    ADD CONSTRAINT "Court_pkey" PRIMARY KEY (id);


--
-- Name: DiscoverPost DiscoverPost_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DiscoverPost"
    ADD CONSTRAINT "DiscoverPost_pkey" PRIMARY KEY (id);


--
-- Name: EventTicket EventTicket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: PasswordReset PasswordReset_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: PriceRule PriceRule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PriceRule"
    ADD CONSTRAINT "PriceRule_pkey" PRIMARY KEY (id);


--
-- Name: SportCategory SportCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SportCategory"
    ADD CONSTRAINT "SportCategory_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VenueBadge VenueBadge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VenueBadge"
    ADD CONSTRAINT "VenueBadge_pkey" PRIMARY KEY (id);


--
-- Name: VenueEvent VenueEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VenueEvent"
    ADD CONSTRAINT "VenueEvent_pkey" PRIMARY KEY (id);


--
-- Name: Venue Venue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ActivityEvent_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityEvent_createdAt_idx" ON public."ActivityEvent" USING btree ("createdAt");


--
-- Name: Booking_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Booking_code_key" ON public."Booking" USING btree (code);


--
-- Name: Booking_courtId_bookingDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Booking_courtId_bookingDate_idx" ON public."Booking" USING btree ("courtId", "bookingDate");


--
-- Name: Booking_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Booking_userId_idx" ON public."Booking" USING btree ("userId");


--
-- Name: Booking_venueId_bookingDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Booking_venueId_bookingDate_idx" ON public."Booking" USING btree ("venueId", "bookingDate");


--
-- Name: CourtBlock_courtId_blockDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CourtBlock_courtId_blockDate_idx" ON public."CourtBlock" USING btree ("courtId", "blockDate");


--
-- Name: CourtGroup_venueId_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CourtGroup_venueId_name_key" ON public."CourtGroup" USING btree ("venueId", name);


--
-- Name: Court_groupId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Court_groupId_idx" ON public."Court" USING btree ("groupId");


--
-- Name: Court_venueId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Court_venueId_idx" ON public."Court" USING btree ("venueId");


--
-- Name: DiscoverPost_publishedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "DiscoverPost_publishedAt_idx" ON public."DiscoverPost" USING btree ("publishedAt");


--
-- Name: EventTicket_eventId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EventTicket_eventId_idx" ON public."EventTicket" USING btree ("eventId");


--
-- Name: EventTicket_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EventTicket_userId_idx" ON public."EventTicket" USING btree ("userId");


--
-- Name: Notification_userId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_userId_createdAt_idx" ON public."Notification" USING btree ("userId", "createdAt");


--
-- Name: PasswordReset_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PasswordReset_userId_idx" ON public."PasswordReset" USING btree ("userId");


--
-- Name: Payment_bookingId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Payment_bookingId_idx" ON public."Payment" USING btree ("bookingId");


--
-- Name: Payment_transactionCode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Payment_transactionCode_key" ON public."Payment" USING btree ("transactionCode");


--
-- Name: Payment_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Payment_userId_idx" ON public."Payment" USING btree ("userId");


--
-- Name: PriceRule_venueId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PriceRule_venueId_idx" ON public."PriceRule" USING btree ("venueId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: VenueBadge_venueId_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VenueBadge_venueId_code_key" ON public."VenueBadge" USING btree ("venueId", code);


--
-- Name: VenueEvent_venueId_eventDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "VenueEvent_venueId_eventDate_idx" ON public."VenueEvent" USING btree ("venueId", "eventDate");


--
-- Name: Venue_sportId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Venue_sportId_idx" ON public."Venue" USING btree ("sportId");


--
-- Name: Booking Booking_courtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES public."Court"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CourtBlock CourtBlock_courtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourtBlock"
    ADD CONSTRAINT "CourtBlock_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES public."Court"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CourtGroup CourtGroup_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CourtGroup"
    ADD CONSTRAINT "CourtGroup_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Court Court_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Court"
    ADD CONSTRAINT "Court_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."CourtGroup"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Court Court_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Court"
    ADD CONSTRAINT "Court_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventTicket EventTicket_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."VenueEvent"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventTicket EventTicket_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PasswordReset PasswordReset_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordReset"
    ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PriceRule PriceRule_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PriceRule"
    ADD CONSTRAINT "PriceRule_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VenueBadge VenueBadge_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VenueBadge"
    ADD CONSTRAINT "VenueBadge_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VenueEvent VenueEvent_venueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VenueEvent"
    ADD CONSTRAINT "VenueEvent_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Venue Venue_sportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES public."SportCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict tjVuT7iL2wepQtgOMQTEoFFXGLVuwHx1UJJbzh0YILbkWBDlCDaf5WavpTiV2hJ


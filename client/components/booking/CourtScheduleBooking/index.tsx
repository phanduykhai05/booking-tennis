import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import CourtPriceSheet from "@/components/booking/CourtScheduleBooking/components/CourtPriceSheet";
import ScheduleConfirmSheet from "@/components/booking/CourtScheduleBooking/components/ScheduleConfirmSheet";
import ScheduleFooter from "@/components/booking/CourtScheduleBooking/components/ScheduleFooter";
import ScheduleGrid from "@/components/booking/CourtScheduleBooking/components/ScheduleGrid";
import type { ScheduleGridHandle } from "@/components/booking/CourtScheduleBooking/components/ScheduleGrid";
import ScheduleHeader from "@/components/booking/CourtScheduleBooking/components/ScheduleHeader";
import ScheduleNotice from "@/components/booking/CourtScheduleBooking/components/ScheduleNotice";
import ScheduleScrollSlider from "@/components/booking/CourtScheduleBooking/components/ScheduleScrollSlider";
import ScheduleStatePanel from "@/components/booking/CourtScheduleBooking/components/ScheduleStatePanel";
import SepayCheckoutSheet from "@/components/payments/SepayCheckoutSheet";
import { courtScheduleContent } from "@/components/booking/CourtScheduleBooking/content";
import type { CourtScheduleData } from "@/components/booking/CourtScheduleBooking/types";
import {
  getSelectedSlots,
  getSelectionRanges,
  getSelectionTotal,
  getTimeSlots,
  slotKey,
} from "@/components/booking/CourtScheduleBooking/utils";
import Screen from "@/components/ui/Screen";
import { createBooking, createSepayCheckout, getVenueSchedule } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";
import type { ApiSepayCheckout } from "@/lib/api/types";

type CourtScheduleBookingProps = {
  backHref: string;
  initialDate: string;
  initialSchedule: CourtScheduleData;
  venueId: string;
};

export default function CourtScheduleBooking({ backHref, initialDate, initialSchedule, venueId }: CourtScheduleBookingProps) {
  const router = useRouter();
  const { token } = useSession();
  const [date, setDate] = useState(initialDate);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isPriceSheetOpen, setPriceSheetOpen] = useState(false);
  const [isConfirmSheetOpen, setConfirmSheetOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [sepayCheckout, setSepayCheckout] = useState<ApiSepayCheckout | null>(null);
  const [isSepaySettled, setSepaySettled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [scrollRatio, setScrollRatio] = useState(0);
  const gridRef = useRef<ScheduleGridHandle>(null);

  const loadSchedule = useCallback(
    async (nextDate: string) => {
      try {
        const next = await getVenueSchedule(venueId, nextDate);
        setSchedule(next);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error instanceof ApiError ? error.message : courtScheduleContent.errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [venueId],
  );

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (date === initialDate) return;

    let isActive = true;

    getVenueSchedule(venueId, date)
      .then((next) => {
        if (!isActive) return;
        setSchedule(next);
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof ApiError ? error.message : courtScheduleContent.errorMessage);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [date, initialDate, venueId]);

  const timeSlots = useMemo(() => getTimeSlots(schedule.config), [schedule.config]);
  const selectedSlots = useMemo(
    () => getSelectedSlots(selectedKeys, schedule.groups, schedule.priceRules, schedule.config.slotMinutes),
    [schedule.config.slotMinutes, schedule.groups, schedule.priceRules, selectedKeys],
  );
  const selectionRanges = useMemo(() => getSelectionRanges(selectedSlots), [selectedSlots]);
  const total = getSelectionTotal(selectedSlots);

  const toggleSlot = (courtId: string, startMinute: number) => {
    const key = slotKey(courtId, startMinute);
    setSuccessMessage("");
    setSelectedKeys((keys) => (keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key]));
  };

  const changeDate = (nextDate: string) => {
    if (nextDate !== initialDate) setIsLoading(true);
    setDate(nextDate);
    setSelectedKeys([]);
    setSuccessMessage("");
  };

  const seekGrid = (ratio: number) => {
    setScrollRatio(ratio);
    gridRef.current?.seek(ratio);
  };

  const confirmSelection = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const result = await createBooking(token, {
        date,
        slots: selectionRanges.map((range) => ({
          courtId: range.courtId,
          endMinute: range.endMinute,
          startMinute: range.startMinute,
        })),
        venueId,
      });

      setSelectedKeys([]);
      setConfirmSheetOpen(false);
      setSuccessMessage(courtScheduleContent.confirmSheet.successMessage);
      await loadSchedule(date);

      // Mỗi khung giờ là một booking riêng; trả tiền gộp thì cần nhiều QR, nên
      // chỉ mở sẵn QR khi người dùng đặt đúng một khung.
      //
      // try riêng: lịch đã đặt xong rồi, QR chỉ là bước trả tiền thêm. Gộp chung
      // try ở trên thì SePay lỗi (hoặc chưa cấu hình) sẽ xoá thông báo thành công
      // và báo đặt lịch thất bại, khiến khách đặt lại lần nữa.
      if (result.bookings.length === 1) {
        try {
          setSepayCheckout(await createSepayCheckout(token, { bookingId: result.bookings[0].id }));
        } catch {
          // Không mở được QR thì khách vẫn trả được tại quầy; lịch đặt không đổi.
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : courtScheduleContent.errorMessage);
      setConfirmSheetOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen backgroundColor="#0b6b3e" edges={["bottom", "top"]} statusBarStyle="light">
      <View className="flex-1 bg-[#f2fbf5]">
        <ScheduleHeader
          backHref={backHref}
          content={courtScheduleContent}
          date={date}
          onDateChange={changeDate}
          onPriceListOpen={() => setPriceSheetOpen(true)}
          venueName={schedule.venue.name}
        />

        <ScheduleNotice
          hotline={schedule.venue.phone || courtScheduleContent.hotline}
          prefix={courtScheduleContent.notice.prefix}
          suffix={courtScheduleContent.notice.suffix}
          text={courtScheduleContent.notice.text}
        />

        <ScrollView className="flex-1">
          {isLoading ? (
            <ScheduleStatePanel message={courtScheduleContent.loadingMessage} />
          ) : (
            <ScheduleGrid
              content={courtScheduleContent}
              entries={schedule.entries}
              groups={schedule.groups}
              onScrollRatioChange={setScrollRatio}
              onSlotToggle={toggleSlot}
              ref={gridRef}
              selectedKeys={selectedKeys}
              slotMinutes={schedule.config.slotMinutes}
              timeSlots={timeSlots}
            />
          )}
        </ScrollView>

        <View className="bg-[#f2fbf5] pt-2">
          <ScheduleScrollSlider label={courtScheduleContent.scrollLabel} onSeek={seekGrid} ratio={scrollRatio} />
          <ScheduleFooter
            content={courtScheduleContent}
            errorMessage={errorMessage}
            onNext={() => setConfirmSheetOpen(true)}
            selectedCount={selectedSlots.length}
            successMessage={successMessage}
            total={total}
          />
        </View>

        <CourtPriceSheet
          content={courtScheduleContent}
          groups={schedule.groups}
          isOpen={isPriceSheetOpen}
          onClose={() => setPriceSheetOpen(false)}
          priceRules={schedule.priceRules}
        />

        <ScheduleConfirmSheet
          content={courtScheduleContent}
          date={date}
          isOpen={isConfirmSheetOpen}
          isSubmitting={isSubmitting}
          onClose={() => setConfirmSheetOpen(false)}
          onConfirm={() => void confirmSelection()}
          ranges={selectionRanges}
          requiresSignIn={!token}
          total={total}
        />

        {/* Tải lại lưới lịch sau khi đóng sheet, để thông báo nhận tiền không bị màn loading nuốt mất. */}
        <SepayCheckoutSheet
          checkout={sepayCheckout}
          isOpen={sepayCheckout !== null}
          onClose={() => {
            setSepayCheckout(null);
            if (isSepaySettled) {
              setSepaySettled(false);
              void loadSchedule(date);
            }
          }}
          onPaid={() => setSepaySettled(true)}
        />
      </View>
    </Screen>
  );
}

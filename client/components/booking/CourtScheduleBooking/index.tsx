"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CourtPriceSheet from "@/components/booking/CourtScheduleBooking/components/CourtPriceSheet";
import ScheduleConfirmSheet from "@/components/booking/CourtScheduleBooking/components/ScheduleConfirmSheet";
import ScheduleFooter from "@/components/booking/CourtScheduleBooking/components/ScheduleFooter";
import ScheduleGrid from "@/components/booking/CourtScheduleBooking/components/ScheduleGrid";
import ScheduleHeader from "@/components/booking/CourtScheduleBooking/components/ScheduleHeader";
import ScheduleNotice from "@/components/booking/CourtScheduleBooking/components/ScheduleNotice";
import ScheduleScrollSlider from "@/components/booking/CourtScheduleBooking/components/ScheduleScrollSlider";
import ScheduleStatePanel from "@/components/booking/CourtScheduleBooking/components/ScheduleStatePanel";
import { courtScheduleContent } from "@/components/booking/CourtScheduleBooking/content";
import type { CourtScheduleData } from "@/components/booking/CourtScheduleBooking/types";
import {
  getSelectedSlots,
  getSelectionRanges,
  getSelectionTotal,
  getTimeSlots,
  slotKey,
} from "@/components/booking/CourtScheduleBooking/utils";
import { createBooking, getVenueSchedule } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

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
  const [successMessage, setSuccessMessage] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

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

  const confirmSelection = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      await createBooking(token, {
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
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : courtScheduleContent.errorMessage);
      setConfirmSheetOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col bg-[#f2fbf5]">
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

      {isLoading ? (
        <ScheduleStatePanel message={courtScheduleContent.loadingMessage} />
      ) : (
        <ScheduleGrid
          content={courtScheduleContent}
          entries={schedule.entries}
          groups={schedule.groups}
          onSlotToggle={toggleSlot}
          priceRules={schedule.priceRules}
          scrollRef={gridRef}
          selectedKeys={selectedKeys}
          slotMinutes={schedule.config.slotMinutes}
          timeSlots={timeSlots}
        />
      )}

      <div className="sticky bottom-0 mt-auto bg-[#f2fbf5] pt-2">
        <ScheduleScrollSlider label={courtScheduleContent.scrollLabel} targetRef={gridRef} />
        <ScheduleFooter
          content={courtScheduleContent}
          errorMessage={errorMessage}
          onNext={() => setConfirmSheetOpen(true)}
          selectedCount={selectedSlots.length}
          successMessage={successMessage}
          total={total}
        />
      </div>

      {isPriceSheetOpen && (
        <CourtPriceSheet
          content={courtScheduleContent}
          groups={schedule.groups}
          onClose={() => setPriceSheetOpen(false)}
          priceRules={schedule.priceRules}
        />
      )}

      {isConfirmSheetOpen && (
        <ScheduleConfirmSheet
          content={courtScheduleContent}
          date={date}
          isSubmitting={isSubmitting}
          onClose={() => setConfirmSheetOpen(false)}
          onConfirm={() => void confirmSelection()}
          ranges={selectionRanges}
          requiresSignIn={!token}
          total={total}
        />
      )}
    </main>
  );
}

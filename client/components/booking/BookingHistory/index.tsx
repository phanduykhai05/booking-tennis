"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import BookingHistoryCard from "@/components/booking/BookingHistory/components/BookingHistoryCard";
import DateFilter from "@/components/booking/BookingHistory/components/DateFilter";
import { bookingHistoryContent } from "@/components/booking/BookingHistory/content";
import { cancelBooking, getMyBookings } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";
import type { ApiBooking } from "@/lib/api/types";

export default function BookingHistory() {
  const { isReady, token } = useSession();
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancellingId, setCancellingId] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (!isReady || !token) return;

    let isActive = true;

    getMyBookings(token)
      .then((items) => {
        if (!isActive) return;
        setBookings(items);
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof ApiError ? error.message : "Không tải được lịch đặt");
      })
      .finally(() => {
        if (isActive) setIsFetching(false);
      });

    return () => {
      isActive = false;
    };
  }, [isReady, token]);

  const isLoading = token ? isFetching : !isReady;

  const cancel = async (bookingId: string) => {
    if (!token) return;
    setCancellingId(bookingId);
    setErrorMessage("");

    try {
      const updated = await cancelBooking(token, bookingId);
      setBookings((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Không huỷ được lịch");
    } finally {
      setCancellingId("");
    }
  };

  const dates = [...new Set(bookings.map((booking) => booking.date))];
  const visibleBookings = selectedDate === "all" ? bookings : bookings.filter((booking) => booking.date === selectedDate);
  const emptyMessage = token ? bookingHistoryContent.empty : bookingHistoryContent.signInRequired;

  return (
    <main className="flex min-h-[100dvh] flex-col bg-white">
      <header className="relative flex h-[59px] shrink-0 items-center justify-center bg-[linear-gradient(100deg,#007346,#00ae58)] text-white shadow-sm">
        <Link aria-label="Quay lại trang tài khoản" className="absolute left-5 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/account">
          <ArrowLeft aria-hidden="true" size={21} strokeWidth={2.6} />
        </Link>
        <h1 className="text-[17px] font-bold">{bookingHistoryContent.title}</h1>
      </header>

      <div className="flex justify-end px-[10px] pt-[9px]">
        <DateFilter allDatesLabel={bookingHistoryContent.allDates} dates={dates} onChange={setSelectedDate} value={selectedDate} />
      </div>

      {errorMessage && <p className="mx-[10px] mt-2 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">{errorMessage}</p>}

      <section aria-label={bookingHistoryContent.title} className="flex-1 px-[10px] py-3 pb-24">
        {isLoading ? (
          <p className="py-16 text-center text-[14px] text-[#064b30]">{bookingHistoryContent.loading}</p>
        ) : visibleBookings.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-[#064b30]">{emptyMessage}</p>
        ) : (
          <div className="space-y-3">
            {visibleBookings.map((booking) => (
              <BookingHistoryCard booking={booking} isCancelling={cancellingId === booking.id} key={booking.id} onCancel={(id) => void cancel(id)} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

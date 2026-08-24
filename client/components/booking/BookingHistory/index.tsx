import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import BookingHistoryCard from "@/components/booking/BookingHistory/components/BookingHistoryCard";
import DateFilter from "@/components/booking/BookingHistory/components/DateFilter";
import { bookingHistoryContent } from "@/components/booking/BookingHistory/content";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { cancelBooking, getMyBookings } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";
import type { ApiBooking } from "@/lib/api/types";

export default function BookingHistory() {
  const router = useRouter();
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
    <Screen backgroundColor="#007346" statusBarStyle="light">
      <View className="flex-1 bg-white">
        <View className="h-[59px] flex-row items-center justify-center bg-[#00925a]">
          <Touch
            accessibilityLabel="Quay lại trang tài khoản"
            className="absolute left-5 rounded p-1"
            onPress={() => router.navigate("/account")}
          >
            <ArrowLeft color="#ffffff" size={21} strokeWidth={2.6} />
          </Touch>
          <Text className="text-[17px] font-bold text-white">{bookingHistoryContent.title}</Text>
        </View>

        <View className="flex-row justify-end px-[10px] pt-[9px]">
          <DateFilter
            allDatesLabel={bookingHistoryContent.allDates}
            dates={dates}
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </View>

        {errorMessage ? (
          <View className="mx-[10px] mt-2">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : null}

        {isLoading ? (
          <LoadingState label={bookingHistoryContent.loading} />
        ) : visibleBookings.length === 0 ? (
          <Text className="py-16 text-center text-[14px] text-[#064b30]">{emptyMessage}</Text>
        ) : (
          <ScrollView contentContainerClassName="gap-3 px-[10px] py-3 pb-10">
            {visibleBookings.map((booking) => (
              <BookingHistoryCard
                booking={booking}
                isCancelling={cancellingId === booking.id}
                key={booking.id}
                onCancel={(id) => void cancel(id)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

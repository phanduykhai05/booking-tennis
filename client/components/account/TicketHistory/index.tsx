import { useRouter } from "expo-router";
import { ArrowLeft, CalendarDays, Clock3, Phone, Ticket } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import { ticketHistoryContent } from "@/components/account/TicketHistory/content";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { shadow } from "@/components/ui/theme";
import { getMyTickets } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import type { ApiEventTicket } from "@/lib/api/types";
import { useAsync } from "@/lib/useAsync";

export default function TicketHistory() {
  const router = useRouter();
  const { isReady, token } = useSession();

  const { data, errorMessage, isLoading } = useAsync<ApiEventTicket[]>(
    () => (token ? getMyTickets(token) : Promise.resolve([])),
    [token],
    ticketHistoryContent.errorMessage,
  );

  const tickets = data ?? [];
  const isBusy = token ? isLoading : !isReady;
  const emptyMessage = token ? ticketHistoryContent.empty : ticketHistoryContent.signInRequired;

  return (
    <Screen backgroundColor="#007346" statusBarStyle="light">
      <View className="flex-1 bg-[#f5f6f5]">
        <View className="h-[59px] flex-row items-center justify-center bg-[#00925a]">
          <Touch
            accessibilityLabel={ticketHistoryContent.backLabel}
            className="absolute left-5 rounded p-1"
            onPress={() => router.navigate("/account")}
          >
            <ArrowLeft color="#ffffff" size={21} strokeWidth={2.6} />
          </Touch>
          <Text className="text-[17px] font-bold text-white">{ticketHistoryContent.title}</Text>
        </View>

        {errorMessage ? (
          <View className="mx-[10px] mt-2">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : null}

        {isBusy ? (
          <LoadingState label={ticketHistoryContent.loading} />
        ) : tickets.length === 0 ? (
          <Text className="py-16 text-center text-[14px] text-[#064b30]">{emptyMessage}</Text>
        ) : (
          <ScrollView contentContainerClassName="gap-3 px-[10px] py-3 pb-10">
            {tickets.map((ticket) => (
              <View className="rounded-xl bg-white p-3" key={ticket.id} style={shadow.card}>
                <View className="flex-row items-start gap-2">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-[#e1f7eb]">
                    <Ticket color="#008447" size={20} />
                  </View>
                  <View className="min-w-0 flex-1">
                    <Text className="text-[15px] font-bold text-[#18221e]">{ticket.title}</Text>
                    <Text className="mt-0.5 text-[13px] text-[#68716d]">{ticket.venueName}</Text>
                  </View>
                  <View className="items-end gap-1">
                    <View className="rounded bg-[#e5f8ee] px-2 py-1">
                      <Text className="text-[12px] font-semibold text-[#007b44]">
                        {ticketHistoryContent.quantityLabel(ticket.quantity)}
                      </Text>
                    </View>
                    <Text
                      className={`text-[11px] font-semibold ${ticket.status === "paid" ? "text-[#007b44]" : ticket.status === "pending" ? "text-[#df9000]" : "text-[#87918c]"}`}
                    >
                      {ticketHistoryContent.statusLabels[ticket.status]}
                    </Text>
                  </View>
                </View>

                <View className="mt-3 gap-1.5 border-t border-[#eef1ef] pt-3">
                  <View className="flex-row items-center gap-1.5">
                    <CalendarDays color="#68716d" size={15} />
                    <Text className="text-[13px] text-[#3c4742]">{ticket.eventDate}</Text>
                  </View>
                  <View className="flex-row items-center gap-1.5">
                    <Clock3 color="#68716d" size={15} />
                    <Text className="text-[13px] text-[#3c4742]">
                      {ticket.timeStart} - {ticket.timeEnd}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5">
                    <Phone color="#68716d" size={15} />
                    <Text className="text-[13px] text-[#3c4742]">
                      {ticketHistoryContent.phoneLabel}: {ticket.phone}
                    </Text>
                  </View>
                </View>

                <View className="mt-3 flex-row items-center justify-between border-t border-[#eef1ef] pt-3">
                  <Text className="text-[13px] text-[#68716d]">{ticketHistoryContent.totalLabel}</Text>
                  <Text className="text-[15px] font-bold text-[#008447]">{ticket.priceLabel}</Text>
                </View>

                <Touch
                  className="mt-2 self-start"
                  onPress={() => router.push(`/product/${ticket.venueId}`)}
                >
                  <Text className="text-[13px] font-semibold text-[#007b44] underline">{ticketHistoryContent.venueLabel}</Text>
                </Touch>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

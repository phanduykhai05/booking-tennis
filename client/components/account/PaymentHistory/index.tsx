import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import {
  paymentHistoryContent,
  paymentMethodLabels,
  paymentStatusLabels,
  paymentStatusTones,
} from "@/components/account/PaymentHistory/content";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import Tag from "@/components/ui/Tag";
import { shadow } from "@/components/ui/theme";
import { getMyPayments } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import type { ApiPayment } from "@/lib/api/types";
import { useAsync } from "@/lib/useAsync";

/** ISO -> "17:05 • 17/08/2026"; giữ nguyên chuỗi gốc nếu không phân tích được. */
function formatMoment(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const pad = (input: number) => input.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())} • ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export default function PaymentHistory() {
  const router = useRouter();
  const { isReady, token } = useSession();

  const { data, errorMessage, isLoading } = useAsync<ApiPayment[]>(
    () => (token ? getMyPayments(token) : Promise.resolve([])),
    [token],
    paymentHistoryContent.errorMessage,
  );

  const payments = data ?? [];
  const isBusy = token ? isLoading : !isReady;
  const emptyMessage = token ? paymentHistoryContent.empty : paymentHistoryContent.signInRequired;

  return (
    <Screen backgroundColor="#007346" statusBarStyle="light">
      <View className="flex-1 bg-[#f5f6f5]">
        <View className="h-[59px] flex-row items-center justify-center bg-[#00925a]">
          <Touch
            accessibilityLabel={paymentHistoryContent.backLabel}
            className="absolute left-5 rounded p-1"
            onPress={() => router.navigate("/account")}
          >
            <ArrowLeft color="#ffffff" size={21} strokeWidth={2.6} />
          </Touch>
          <Text className="text-[17px] font-bold text-white">{paymentHistoryContent.title}</Text>
        </View>

        {errorMessage ? (
          <View className="mx-[10px] mt-2">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : null}

        {isBusy ? (
          <LoadingState label={paymentHistoryContent.loading} />
        ) : payments.length === 0 ? (
          <Text className="py-16 text-center text-[14px] text-[#064b30]">{emptyMessage}</Text>
        ) : (
          <ScrollView contentContainerClassName="gap-3 px-[10px] py-3 pb-10">
            {payments.map((payment) => (
              <View className="rounded-xl bg-white p-3" key={payment.id} style={shadow.card}>
                <View className="flex-row items-start gap-2">
                  <View className="min-w-0 flex-1">
                    <Text className="text-[15px] font-bold text-[#18221e]">{payment.venueName}</Text>
                    <Text className="mt-0.5 text-[13px] text-[#68716d]">
                      {payment.courtName} • {payment.bookingDate}
                    </Text>
                  </View>
                  <Tag label={paymentStatusLabels[payment.status]} tone={paymentStatusTones[payment.status]} />
                </View>

                <View className="mt-3 gap-1 border-t border-[#eef1ef] pt-3">
                  <View className="flex-row justify-between">
                    <Text className="text-[13px] text-[#68716d]">
                      {payment.kind === "ticket" ? paymentHistoryContent.eventLabel : paymentHistoryContent.bookingLabel}
                    </Text>
                    <Text className="text-[13px] font-semibold text-[#3c4742]">{payment.bookingCode}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[13px] text-[#68716d]">{paymentHistoryContent.transactionLabel}</Text>
                    <Text className="text-[13px] text-[#3c4742]">{payment.transactionCode}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[13px] text-[#68716d]">{paymentHistoryContent.methodLabel}</Text>
                    <Text className="text-[13px] text-[#3c4742]">{paymentMethodLabels[payment.method]}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[13px] text-[#68716d]">{paymentHistoryContent.paidAtLabel}</Text>
                    <Text className="text-[13px] text-[#3c4742]">{formatMoment(payment.paidAt)}</Text>
                  </View>
                </View>

                <View className="mt-3 flex-row items-center justify-end border-t border-[#eef1ef] pt-3">
                  <Text className="text-[16px] font-bold text-[#008447]">{payment.amountLabel}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

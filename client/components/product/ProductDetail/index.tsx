import { useRouter } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import BookingDateStrip from "@/components/product/ProductDetail/components/BookingDateStrip";
import EventCard from "@/components/product/ProductDetail/components/EventCard";
import PaymentConfirmSheet from "@/components/product/ProductDetail/components/PaymentConfirmSheet";
import ProductHero from "@/components/product/ProductDetail/components/ProductHero";
import { productDetailContent } from "@/components/product/ProductDetail/content";
import type { BookingDateItem, BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";
import Screen from "@/components/ui/Screen";
import { buyEventTicket } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

type ProductDetailProps = {
  bookingDates: BookingDateItem[];
  onPaid: () => void;
  product: ProductDetailData;
};

type CheckoutSelection = { event: BookingEvent; quantity: number };

export default function ProductDetail({ bookingDates, onPaid, product }: ProductDetailProps) {
  const router = useRouter();
  const { session, token } = useSession();
  const [checkout, setCheckout] = useState<CheckoutSelection | null>(null);
  const [paidEventIds, setPaidEventIds] = useState<string[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const completePayment = async (phone: string) => {
    if (!checkout) return;

    if (!token) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const result = await buyEventTicket(token, checkout.event.id, { phone, quantity: checkout.quantity });

      if (!result.success) {
        setErrorMessage(result.error ?? "Không mua được vé");
        return;
      }

      setPaidEventIds((eventIds) => [...new Set([...eventIds, checkout.event.id])]);
      setCheckout(null);
      onPaid();
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Không mua được vé");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen backgroundColor="#012215" statusBarStyle="light">
      <ScrollView className="flex-1 bg-[#efefef]" contentContainerClassName="pb-8">
        <ProductHero
          address={product.address}
          bookLabel={productDetailContent.book}
          onBook={() => router.push(`/product/${product.slug}/schedule`)}
          venue={product.venue}
        />
        <BookingDateStrip dates={bookingDates} />

        <View className="px-2.5 pt-2.5">
          <View className="mb-2 flex-row items-center gap-1">
            <CalendarDays color="#005ecd" size={16} />
            <Text className="text-[14px] font-bold text-[#1b3128]">{productDetailContent.upcomingTitle}</Text>
            <Text className="text-[14px] text-[#777777]">
              {product.events.length} {productDetailContent.eventCountLabel}
            </Text>
          </View>

          {product.events.length === 0 ? (
            <Text className="rounded-lg bg-white px-3 py-6 text-center text-[14px] text-[#68716d]">
              {productDetailContent.emptyEvents}
            </Text>
          ) : (
            <View className="gap-3">
              {product.events.map((event) => (
                <EventCard
                  actions={productDetailContent.actions}
                  event={event}
                  isPaid={paidEventIds.includes(event.id)}
                  key={event.id}
                  onPayment={(selectedEvent, quantity) => setCheckout({ event: selectedEvent, quantity })}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {checkout ? (
        <PaymentConfirmSheet
          accountInitial={session?.user.avatarInitial ?? "?"}
          accountName={session?.user.fullName ?? "Khách"}
          errorMessage={errorMessage}
          event={checkout.event}
          isOpen
          isSubmitting={isSubmitting}
          labels={productDetailContent.checkout}
          onClose={() => setCheckout(null)}
          onConfirm={(phone) => void completePayment(phone)}
          quantity={checkout.quantity}
          requiresSignIn={!token}
        />
      ) : null}
    </Screen>
  );
}

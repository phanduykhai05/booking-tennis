"use client";

import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BookingDateStrip from "@/components/product/ProductDetail/components/BookingDateStrip";
import EventCard from "@/components/product/ProductDetail/components/EventCard";
import PaymentConfirmSheet from "@/components/product/ProductDetail/components/PaymentConfirmSheet";
import ProductHero from "@/components/product/ProductDetail/components/ProductHero";
import { productDetailContent } from "@/components/product/ProductDetail/content";
import type { BookingDateItem, BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";
import { buyEventTicket } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

type ProductDetailProps = {
  bookingDates: BookingDateItem[];
  product: ProductDetailData;
};

type CheckoutSelection = { event: BookingEvent; quantity: number };

export default function ProductDetail({ bookingDates, product }: ProductDetailProps) {
  const router = useRouter();
  const { token } = useSession();
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
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Không mua được vé");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-[410px] bg-[#efefef] pb-8">
      <ProductHero address={product.address} bookLabel={productDetailContent.book} scheduleHref={`/product/${product.slug}/schedule`} venue={product.venue} />
      <BookingDateStrip dates={bookingDates} />
      <section className="px-2.5 pt-2.5">
        <h2 className="mb-2 flex items-center gap-1 text-[14px] font-bold text-[#1b3128]"><CalendarDays aria-hidden="true" className="text-[#005ecd]" size={16} />{productDetailContent.upcomingTitle}<span className="font-normal text-[#777]">{product.events.length} {productDetailContent.eventCountLabel}</span></h2>
        {product.events.length === 0 ? (
          <p className="rounded-lg bg-white px-3 py-6 text-center text-[14px] text-[#68716d]">{productDetailContent.emptyEvents}</p>
        ) : (
          <div className="space-y-3">
            {product.events.map((event) => <EventCard actions={productDetailContent.actions} event={event} isPaid={paidEventIds.includes(event.id)} key={event.id} onPayment={(selectedEvent, quantity) => setCheckout({ event: selectedEvent, quantity })} />)}
          </div>
        )}
      </section>
      {checkout && (
        <PaymentConfirmSheet
          errorMessage={errorMessage}
          event={checkout.event}
          isSubmitting={isSubmitting}
          labels={productDetailContent.checkout}
          onClose={() => setCheckout(null)}
          onConfirm={(phone) => void completePayment(phone)}
          quantity={checkout.quantity}
          requiresSignIn={!token}
        />
      )}
    </main>
  );
}

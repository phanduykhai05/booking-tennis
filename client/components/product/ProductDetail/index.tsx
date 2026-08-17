"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";

import BookingDateStrip from "@/components/product/ProductDetail/components/BookingDateStrip";
import EventCard from "@/components/product/ProductDetail/components/EventCard";
import PaymentConfirmSheet from "@/components/product/ProductDetail/components/PaymentConfirmSheet";
import ProductHero from "@/components/product/ProductDetail/components/ProductHero";
import { bookingDates } from "@/components/product/ProductDetail/mockData";
import type { BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";

type ProductDetailProps = { product: ProductDetailData };
type CheckoutSelection = { event: BookingEvent; quantity: number };

export default function ProductDetail({ product }: ProductDetailProps) {
  const [checkout, setCheckout] = useState<CheckoutSelection | null>(null);
  const [paidEventIds, setPaidEventIds] = useState<string[]>([]);

  const completePayment = () => {
    if (!checkout) return;
    setPaidEventIds((eventIds) => [...new Set([...eventIds, checkout.event.id])]);
    setCheckout(null);
  };

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-[410px] bg-[#efefef] pb-8">
      <ProductHero address={product.address} bookLabel={product.book} venue={product.venue} />
      <BookingDateStrip dates={bookingDates} />
      <section className="px-2.5 pt-2.5">
        <h2 className="mb-2 flex items-center gap-1 text-[14px] font-bold text-[#1b3128]"><CalendarDays aria-hidden="true" className="text-[#005ecd]" size={16} />{product.upcomingTitle}<span className="font-normal text-[#777]">{product.events.length} sự kiện</span></h2>
        <div className="space-y-3">
          {product.events.map((event) => <EventCard actions={product.actions} event={event} isPaid={paidEventIds.includes(event.id)} key={event.id} onPayment={(selectedEvent, quantity) => setCheckout({ event: selectedEvent, quantity })} />)}
        </div>
      </section>
      {checkout && <PaymentConfirmSheet event={checkout.event} labels={product.checkout} onClose={() => setCheckout(null)} onConfirm={completePayment} quantity={checkout.quantity} />}
    </main>
  );
}

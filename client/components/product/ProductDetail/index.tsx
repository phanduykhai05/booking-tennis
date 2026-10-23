import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import SepayCheckoutSheet from "@/components/payments/SepayCheckoutSheet";
import BookingDateStrip from "@/components/product/ProductDetail/components/BookingDateStrip";
import EventCard from "@/components/product/ProductDetail/components/EventCard";
import PaymentConfirmSheet from "@/components/product/ProductDetail/components/PaymentConfirmSheet";
import type { TicketPaymentMethod } from "@/components/product/ProductDetail/components/PaymentConfirmSheet";
import ProductHero from "@/components/product/ProductDetail/components/ProductHero";
import { productDetailContent } from "@/components/product/ProductDetail/content";
import type { BookingDateItem, BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";
import Screen from "@/components/ui/Screen";
import { buyEventTicket } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";
import type { ApiSepayCheckout } from "@/lib/api/types";

type ProductDetailProps = {
  bookingDates: BookingDateItem[];
  onPaid: () => void;
  product: ProductDetailData;
};

type CheckoutSelection = { event: BookingEvent; quantity: number };

export default function ProductDetail({ bookingDates, onPaid, product }: ProductDetailProps) {
  const navigate = useNavigate();
  const { session, token } = useSession();
  const [checkout, setCheckout] = useState<CheckoutSelection | null>(null);
  const [sepayCheckout, setSepayCheckout] = useState<ApiSepayCheckout | null>(null);
  /** Sự kiện của QR đang mở, và có id ở đây nghĩa là tiền đã vào nhưng sheet còn đang mở. */
  const [sepayEventId, setSepayEventId] = useState("");
  const [settledEventId, setSettledEventId] = useState("");
  const [paidEventIds, setPaidEventIds] = useState<string[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const completePayment = async (phone: string, method: TicketPaymentMethod) => {
    if (!checkout) return;

    if (!token) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const result = await buyEventTicket(token, checkout.event.id, {
        paymentMethod: method,
        phone,
        quantity: checkout.quantity,
      });

      if (!result.success) {
        setErrorMessage(result.error ?? "Không mua được vé");
        return;
      }

      setCheckout(null);

      // SePay: vé mới ở trạng thái chờ, phải quét QR xong mới tính là đã mua.
      if (method === "sepay" && result.checkout) {
        setSepayEventId(checkout.event.id);
        setSepayCheckout(result.checkout);
        return;
      }

      setPaidEventIds((eventIds) => [...new Set([...eventIds, checkout.event.id])]);
      onPaid();
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Không mua được vé");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen backgroundColor="#012215" statusBarStyle="light">
      <div className="grow shrink overflow-y-auto overflow-x-hidden flex-1 bg-[#efefef]">
        <div className="pb-8">
          <ProductHero
            address={product.address}
            bookLabel={productDetailContent.book}
            onBook={() => navigate(`/product/${product.slug}/schedule`)}
            venue={product.venue}
          />
          <BookingDateStrip dates={bookingDates} />
  
          <div className="px-2.5 pt-2.5">
            <div className="mb-2 flex-row items-center gap-1">
              <CalendarDays color="#005ecd" size={16} />
              <span className="text-[14px] font-bold text-[#1b3128]">{productDetailContent.upcomingTitle}</span>
              <span className="text-[14px] text-[#777777]">
                {product.events.length} {productDetailContent.eventCountLabel}
              </span>
            </div>
  
            {product.events.length === 0 ? (
              <span className="rounded-lg bg-white px-3 py-6 text-center text-[14px] text-[#68716d]">
                {productDetailContent.emptyEvents}
              </span>
            ) : (
              <div className="gap-3">
                {product.events.map((event) => (
                  <EventCard
                    actions={productDetailContent.actions}
                    event={event}
                    isPaid={paidEventIds.includes(event.id)}
                    key={event.id}
                    onPayment={(selectedEvent, quantity) => setCheckout({ event: selectedEvent, quantity })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
          onConfirm={(phone, method) => void completePayment(phone, method)}
          quantity={checkout.quantity}
          requiresSignIn={!token}
        />
      ) : null}

      {/*
        Tải lại dữ liệu ngay lúc nhận tiền sẽ làm màn này unmount, kéo sheet đóng theo
        trước khi người dùng kịp đọc thông báo. Vì vậy chỉ ghi nhận, đợi đóng sheet mới tải lại.
      */}
      <SepayCheckoutSheet
        checkout={sepayCheckout}
        isOpen={sepayCheckout !== null}
        onClose={() => {
          setSepayCheckout(null);

          if (settledEventId) {
            setPaidEventIds((eventIds) => [...new Set([...eventIds, settledEventId])]);
            setSettledEventId("");
            onPaid();
          }
        }}
        onPaid={() => setSettledEventId(sepayEventId)}
      />
    </Screen>
  );
}

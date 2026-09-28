import { useRouter } from "expo-router";
import { CircleX, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { formatCurrency, matchesQuery } from "@/lib/format";

type SearchHit = {
  href: string;
  id: string;
  nhom: string;
  phu: string;
  tieuDe: string;
};

type AdminGlobalSearchProps = {
  placeholder: string;
};

const minQueryLength = 2;
const maxPerGroup = 3;

/**
 * Tìm nhanh trên toàn khu quản trị. Dữ liệu lấy từ AdminDataProvider (đã tải sẵn) nên
 * không phát sinh request; bấm vào kết quả sẽ mở đúng màn và điền sẵn bộ lọc tương ứng.
 */
export default function AdminGlobalSearch({ placeholder }: AdminGlobalSearchProps) {
  const router = useRouter();
  const { bookings, courts, customers, payments, venues } = useAdminData();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const hits = useMemo<SearchHit[]>(() => {
    const keyword = query.trim();
    if (keyword.length < minQueryLength) return [];

    const customerById = new Map(customers.map((customer) => [customer.id, customer]));
    const venueById = new Map(venues.map((venue) => [venue.id, venue]));
    const courtById = new Map(courts.map((court) => [court.id, court]));

    const ketQua: SearchHit[] = [];

    const themNhom = (nhom: string, rows: SearchHit[]) => {
      ketQua.push(...rows.slice(0, maxPerGroup).map((row) => ({ ...row, nhom })));
    };

    themNhom(
      "Lịch đặt sân",
      bookings
        .filter((booking) => {
          const customer = customerById.get(booking.customerId);
          return matchesQuery(booking.code, keyword) || Boolean(customer && matchesQuery(customer.name, keyword));
        })
        .map((booking) => ({
          href: `/admin/bookings?code=${encodeURIComponent(booking.code)}`,
          id: `booking-${booking.id}`,
          nhom: "",
          phu: `${booking.bookingDate} · ${courtById.get(booking.courtId)?.name ?? ""} · ${customerById.get(booking.customerId)?.name ?? "Khách chưa rõ"}`,
          tieuDe: booking.code,
        })),
    );

    themNhom(
      "Khách hàng",
      customers
        .filter(
          (customer) =>
            matchesQuery(customer.name, keyword) ||
            matchesQuery(customer.phone, keyword) ||
            matchesQuery(customer.email, keyword),
        )
        .map((customer) => ({
          href: `/admin/customers?q=${encodeURIComponent(customer.name)}`,
          id: `customer-${customer.id}`,
          nhom: "",
          phu: `${customer.phone}${customer.email ? ` · ${customer.email}` : ""}`,
          tieuDe: customer.name,
        })),
    );

    themNhom(
      "Sân",
      courts
        .filter((court) => matchesQuery(court.name, keyword))
        .map((court) => ({
          href: `/admin/courts?q=${encodeURIComponent(court.name)}`,
          id: `court-${court.id}`,
          nhom: "",
          phu: `${venueById.get(court.venueId)?.name ?? ""} · ${formatCurrency(court.hourlyRate)}/giờ`,
          tieuDe: court.name,
        })),
    );

    themNhom(
      "Giao dịch",
      payments
        .filter((payment) => matchesQuery(payment.transactionCode, keyword))
        .map((payment) => ({
          href: `/admin/payments?q=${encodeURIComponent(payment.transactionCode)}`,
          id: `payment-${payment.id}`,
          nhom: "",
          phu: `${formatCurrency(payment.amount)} · ${payment.status}`,
          tieuDe: payment.transactionCode,
        })),
    );

    themNhom(
      "Cơ sở",
      venues
        .filter((venue) => matchesQuery(venue.name, keyword) || matchesQuery(venue.address, keyword))
        .map((venue) => ({
          href: `/admin/bookings?venue=${encodeURIComponent(venue.id)}`,
          id: `venue-${venue.id}`,
          nhom: "",
          phu: venue.address,
          tieuDe: venue.name,
        })),
    );

    return ketQua;
  }, [bookings, courts, customers, payments, query, venues]);

  const isOpen = isFocused && query.trim().length >= minQueryLength;

  const chon = (hit: SearchHit) => {
    setQuery("");
    setIsFocused(false);
    router.push(hit.href);
  };

  return (
    <View className="z-50 h-11 max-w-md flex-1">
      <View className="h-11 flex-row items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
        <Search color="#94a3b8" size={17} />
        <TextInput
          accessibilityLabel={placeholder}
          className="min-w-0 flex-1 text-[14px] text-slate-800"
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={query}
        />
        {query ? (
          <Touch accessibilityLabel="Xoá từ khoá" onPress={() => setQuery("")}>
            <CircleX color="#94a3b8" size={16} />
          </Touch>
        ) : null}
      </View>

      {isOpen ? (
        <View
          className="absolute left-0 right-0 top-12 max-h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white"
          style={shadow.raised}
        >
          {hits.length === 0 ? (
            <Text className="px-4 py-4 text-[13px] text-slate-500">Không tìm thấy kết quả phù hợp.</Text>
          ) : (
            hits.map((hit, index) => {
              const laDauNhom = index === 0 || hits[index - 1].nhom !== hit.nhom;

              return (
                <View key={hit.id}>
                  {laDauNhom ? (
                    <Text className="bg-slate-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {hit.nhom}
                    </Text>
                  ) : null}
                  <Touch
                    accessibilityLabel={`${hit.nhom}: ${hit.tieuDe}`}
                    accessibilityRole="button"
                    className="px-4 py-2.5"
                    onPress={() => chon(hit)}
                  >
                    <Text className="text-[14px] font-semibold text-slate-900">{hit.tieuDe}</Text>
                    <Text className="mt-0.5 text-[12px] text-slate-500" numberOfLines={1}>
                      {hit.phu}
                    </Text>
                  </Touch>
                </View>
              );
            })
          )}
        </View>
      ) : null}
    </View>
  );
}

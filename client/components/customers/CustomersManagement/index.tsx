import { Calendar, DollarSign, User, Users } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import { getCustomerBookingCount, getCustomerTotalSpend, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { Customer, CustomerStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { customersContent } from "@/components/customers/CustomersManagement/content";
import Avatar, { getInitials } from "@/components/ui/Avatar";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import MetricGrid from "@/components/ui/MetricGrid";
import Touch from "@/components/ui/Pressable";
import SearchField from "@/components/ui/SearchField";
import Select from "@/components/ui/Select";
import { formatDayMonthYear } from "@/lib/date";
import { formatCurrency, matchesQuery } from "@/lib/format";

const statusFilterOptions = [
  { label: customersContent.allStatusesLabel, value: "all" as const },
  ...(Object.entries(customersContent.statusLabels) as [CustomerStatus, string][]).map(([value, label]) => ({ label, value })),
];

export default function CustomersManagement() {
  const { bookings, customers, payments, updateCustomerStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CustomerStatus>("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = status === "all" || customer.status === status;
    const matchesText =
      !query.trim() || [customer.name, customer.email, customer.phone].some((value) => matchesQuery(value ?? "", query));

    return matchesStatus && matchesText;
  });

  const repeatCustomerCount = customers.filter((customer) => getCustomerBookingCount(bookings, customer.id) > 1).length;

  const columns: Column<Customer>[] = [
    {
      key: "customer",
      render: (customer) => (
        <View className="flex-row items-center gap-2">
          <Avatar label={getInitials(customer.name)} size={34} />
          <Text className="flex-1 text-[14px] font-bold text-slate-900">{customer.name}</Text>
        </View>
      ),
      title: "Khách hàng",
      width: 210,
    },
    {
      key: "contact",
      render: (customer) => (
        <View>
          <Text className="text-[14px] text-slate-800">{customer.phone}</Text>
          <Text className="text-[12px] text-slate-500">{customer.email || "Chưa có email"}</Text>
        </View>
      ),
      title: "Liên hệ",
      width: 200,
    },
    {
      key: "joinedAt",
      render: (customer) => <Text className="text-[14px] text-slate-700">{formatDayMonthYear(customer.joinedAt)}</Text>,
      sorter: (first, second) => first.joinedAt.localeCompare(second.joinedAt),
      title: "Ngày tham gia",
      width: 150,
    },
    {
      key: "bookingCount",
      render: (customer) => (
        <Text className="text-[14px] font-bold text-slate-900">{getCustomerBookingCount(bookings, customer.id)}</Text>
      ),
      sorter: (first, second) => getCustomerBookingCount(bookings, first.id) - getCustomerBookingCount(bookings, second.id),
      title: "Số booking",
      width: 130,
    },
    {
      key: "totalSpend",
      render: (customer) => (
        <Text className="text-[14px] font-bold text-slate-900">{formatCurrency(getCustomerTotalSpend(payments, customer.id))}</Text>
      ),
      sorter: (first, second) => getCustomerTotalSpend(payments, first.id) - getCustomerTotalSpend(payments, second.id),
      title: "Tổng chi tiêu",
      width: 160,
    },
    {
      key: "status",
      render: (customer) => (
        <StatusBadge label={customersContent.statusLabels[customer.status]} tone={customer.status === "active" ? "emerald" : "slate"} />
      ),
      title: "Trạng thái",
      width: 150,
    },
    {
      align: "right",
      key: "actions",
      render: (customer) => {
        const nextStatus: CustomerStatus = customer.status === "active" ? "inactive" : "active";

        return (
          <Touch
            className="h-9 justify-center rounded-md border border-slate-200 px-3"
            onPress={() => void updateCustomerStatus(customer.id, nextStatus)}
          >
            <Text className="text-[13px] text-slate-700">{nextStatus === "active" ? "Kích hoạt" : "Tạm ngưng"}</Text>
          </Touch>
        );
      },
      title: "Thao tác",
      width: 130,
    },
  ];

  return (
    <View className="gap-5">
      <AdminPageHeader description={customersContent.description} eyebrow="Quan hệ khách hàng" title={customersContent.title} />

      <MetricGrid minItemWidth={230}>
        <MetricCard icon={<Users color={metricIconColor.emerald} size={20} />} label="Tổng khách hàng" value={`${customers.length}`} />
        <MetricCard
          icon={<User color={metricIconColor.blue} size={20} />}
          label="Đang hoạt động"
          tone="blue"
          value={`${customers.filter((customer) => customer.status === "active").length}`}
        />
        <MetricCard
          icon={<Calendar color={metricIconColor.orange} size={20} />}
          label="Khách quay lại"
          tone="orange"
          value={`${repeatCustomerCount}`}
        />
        <MetricCard
          icon={<DollarSign color={metricIconColor.violet} size={20} />}
          label="Tổng chi tiêu"
          tone="violet"
          value={formatCurrency(getReceivedRevenue(payments))}
        />
      </MetricGrid>

      <AdminTableCard
        description={`${filteredCustomers.length} khách hàng phù hợp`}
        title="Danh sách khách hàng"
        toolbar={
          <>
            <SearchField
              accessibilityLabel={customersContent.searchPlaceholder}
              onChange={setQuery}
              placeholder={customersContent.searchPlaceholder}
              value={query}
              width={250}
            />
            <Select
              accessibilityLabel="Lọc trạng thái khách hàng"
              onChange={setStatus}
              options={statusFilterOptions}
              value={status}
              width={180}
            />
          </>
        }
      >
        <DataTable
          columns={columns}
          emptyText={customersContent.emptyLabel}
          rowKey={(customer) => customer.id}
          rows={filteredCustomers}
        />
      </AdminTableCard>
    </View>
  );
}

"use client";

import { CalendarOutlined, DollarOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Row, Select, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import { getCustomerBookingCount, getCustomerTotalSpend, getReceivedRevenue } from "@/components/admin/AdminData/selectors";
import type { Customer, CustomerStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import { customersContent } from "@/components/customers/CustomersManagement/content";

const joinedFormatter = new Intl.DateTimeFormat("vi-VN");

const statusFilterOptions = [
  { label: customersContent.allStatusesLabel, value: "all" },
  ...Object.entries(customersContent.statusLabels).map(([value, label]) => ({ label, value })),
];

function getInitials(name: string) {
  return name.split(" ").slice(-2).map((part) => part[0]).join("");
}

export default function CustomersManagement() {
  const { bookings, customers, payments, updateCustomerStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CustomerStatus>("all");

  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = status === "all" || customer.status === status;
    const matchesQuery = !normalizedQuery
      || [customer.name, customer.email, customer.phone].some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });
  const repeatCustomerCount = customers.filter((customer) => getCustomerBookingCount(bookings, customer.id) > 1).length;

  const columns: TableProps<Customer>["columns"] = [
    {
      key: "customer",
      render: (_, customer) => (
        <Space>
          <Avatar className="!bg-emerald-50 !text-emerald-700">{getInitials(customer.name)}</Avatar>
          <Typography.Text strong>{customer.name}</Typography.Text>
        </Space>
      ),
      title: "Khách hàng",
    },
    {
      key: "contact",
      render: (_, customer) => (
        <div>
          <Typography.Paragraph className="!mb-0">{customer.phone}</Typography.Paragraph>
          <Typography.Text className="!text-xs" type="secondary">{customer.email || "Chưa có email"}</Typography.Text>
        </div>
      ),
      title: "Liên hệ",
    },
    {
      dataIndex: "joinedAt",
      key: "joinedAt",
      render: (joinedAt: string) => joinedFormatter.format(new Date(`${joinedAt}T12:00:00`)),
      sorter: (first, second) => first.joinedAt.localeCompare(second.joinedAt),
      title: "Ngày tham gia",
    },
    {
      key: "bookingCount",
      render: (_, customer) => <Typography.Text strong>{getCustomerBookingCount(bookings, customer.id)}</Typography.Text>,
      sorter: (first, second) => getCustomerBookingCount(bookings, first.id) - getCustomerBookingCount(bookings, second.id),
      title: "Số booking",
    },
    {
      key: "totalSpend",
      render: (_, customer) => <Typography.Text strong>{formatCurrency(getCustomerTotalSpend(payments, customer.id))}</Typography.Text>,
      sorter: (first, second) => getCustomerTotalSpend(payments, first.id) - getCustomerTotalSpend(payments, second.id),
      title: "Tổng chi tiêu",
    },
    {
      dataIndex: "status",
      key: "status",
      render: (value: CustomerStatus) => <StatusBadge label={customersContent.statusLabels[value]} tone={value === "active" ? "emerald" : "slate"} />,
      title: "Trạng thái",
    },
    {
      align: "right",
      key: "actions",
      render: (_, customer) => {
        const nextStatus: CustomerStatus = customer.status === "active" ? "inactive" : "active";
        return (
          <Button onClick={() => updateCustomerStatus(customer.id, nextStatus)} size="small">
            {nextStatus === "active" ? "Kích hoạt" : "Tạm ngưng"}
          </Button>
        );
      },
      title: "Thao tác",
    },
  ];

  return (
    <div className="space-y-5">
      <AdminPageHeader description={customersContent.description} eyebrow="Quan hệ khách hàng" title={customersContent.title} />

      <Row gutter={[16, 16]}>
        <Col span={24} md={12} xl={6}><MetricCard icon={<TeamOutlined />} label="Tổng khách hàng" value={`${customers.length}`} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<UserOutlined />} label="Đang hoạt động" tone="blue" value={`${customers.filter((customer) => customer.status === "active").length}`} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<CalendarOutlined />} label="Khách quay lại" tone="orange" value={`${repeatCustomerCount}`} /></Col>
        <Col span={24} md={12} xl={6}><MetricCard icon={<DollarOutlined />} label="Tổng chi tiêu" tone="violet" value={formatCurrency(getReceivedRevenue(payments))} /></Col>
      </Row>

      <AdminTableCard
        description={`${filteredCustomers.length} khách hàng phù hợp`}
        title="Danh sách khách hàng"
        toolbar={
          <>
            <Input.Search allowClear className="!w-[250px]" onChange={(event) => setQuery(event.target.value)} placeholder={customersContent.searchPlaceholder} value={query} />
            <Select aria-label="Lọc trạng thái khách hàng" className="!w-[180px]" onChange={setStatus} options={statusFilterOptions} value={status} />
          </>
        }
      >
        <Table<Customer>
          columns={columns}
          dataSource={filteredCustomers}
          locale={{ emptyText: customersContent.emptyLabel }}
          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
          rowKey="id"
          scroll={{ x: 980 }}
        />
      </AdminTableCard>
    </div>
  );
}

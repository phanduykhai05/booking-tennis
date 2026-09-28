import { CalendarDays, Pencil, Plus, Ticket, Trash2, Users } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import type { EventPayload, EventTicket, VenueEvent } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import EventFormPanel from "@/components/events/EventsManagement/components/EventFormPanel";
import {
  eventsContent,
  ticketStatusLabels,
  ticketStatusTones,
} from "@/components/events/EventsManagement/content";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import Drawer from "@/components/ui/Drawer";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import MetricGrid from "@/components/ui/MetricGrid";
import Touch from "@/components/ui/Pressable";
import SearchField from "@/components/ui/SearchField";
import Select from "@/components/ui/Select";
import { adminEventList, adminEventTickets } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";
import { useAsync } from "@/lib/useAsync";
import { formatCurrency, formatMinutes, matchesQuery } from "@/lib/format";

export default function EventsManagement() {
  const { courts, createEvent, deleteEvent, updateEvent, venues } = useAdminData();
  const { token } = useSession();
  // Danh sách sự kiện tải riêng ở đây để payload dùng chung của khu admin không phải cõng theo.
  const {
    data: eventData,
    isLoading: isLoadingEvents,
    reload: reloadEvents,
  } = useAsync<VenueEvent[]>(
    () => (token ? adminEventList(token) : Promise.resolve([])),
    [token],
    "Không tải được danh sách sự kiện",
  );

  const events = eventData ?? [];
  const [query, setQuery] = useState("");
  const [venueFilter, setVenueFilter] = useState("all");
  const [editingEvent, setEditingEvent] = useState<VenueEvent | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [ticketsFor, setTicketsFor] = useState<VenueEvent | null>(null);
  const [tickets, setTickets] = useState<EventTicket[]>([]);
  const [isLoadingTickets, setLoadingTickets] = useState(false);

  const courtNameById = new Map(courts.map((court) => [court.id, court.name]));
  const venueNameById = new Map(venues.map((venue) => [venue.id, venue.name]));

  const visibleEvents = events.filter(
    (event) =>
      (venueFilter === "all" || event.venueId === venueFilter) &&
      (!query.trim() || matchesQuery(event.title, query)),
  );

  const totalSold = events.reduce((sum, event) => sum + event.soldCount, 0);
  const totalRevenue = events.reduce((sum, event) => sum + event.soldCount * event.price, 0);

  const handleSave = async (payload: EventPayload) => {
    setSaveError("");

    try {
      if (editingEvent) await updateEvent(editingEvent.id, payload);
      else await createEvent(payload);

      reloadEvents();
      setIsPanelOpen(false);
      setEditingEvent(null);
    } catch (error) {
      setSaveError(error instanceof ApiError ? error.message : "Không lưu được sự kiện");
    }
  };

  const openTickets = async (event: VenueEvent) => {
    if (!token) return;

    setTicketsFor(event);
    setTickets([]);
    setLoadingTickets(true);

    try {
      setTickets(await adminEventTickets(token, event.id));
    } catch {
      setTickets([]);
    } finally {
      setLoadingTickets(false);
    }
  };

  const columns: Column<VenueEvent>[] = [
    {
      key: "title",
      render: (event) => (
        <View>
          <Text className="text-[14px] font-bold text-slate-900">{event.title}</Text>
          <Text className="mt-0.5 text-[12px] text-slate-500">{venueNameById.get(event.venueId) ?? event.venueId}</Text>
        </View>
      ),
      title: "Sự kiện",
      width: 200,
    },
    {
      key: "eventDate",
      render: (event) => (
        <View>
          <Text className="text-[14px] text-slate-700">{event.eventDate}</Text>
          <Text className="mt-0.5 text-[12px] text-slate-500">
            {formatMinutes(event.startMinute)} - {formatMinutes(event.endMinute)}
          </Text>
        </View>
      ),
      sorter: (first, second) => first.eventDate.localeCompare(second.eventDate),
      title: "Thời gian",
      width: 150,
    },
    {
      key: "courtId",
      render: (event) =>
        event.courtId ? (
          <Text className="text-[14px] text-slate-700">{courtNameById.get(event.courtId) ?? event.courtLabel}</Text>
        ) : (
          <StatusBadge label={eventsContent.noCourtLabel} tone="slate" />
        ),
      title: eventsContent.courtLabel,
      width: 140,
    },
    {
      key: "price",
      render: (event) => <Text className="text-[14px] font-bold text-slate-900">{formatCurrency(event.price)}</Text>,
      sorter: (first, second) => first.price - second.price,
      title: "Giá vé",
      width: 130,
    },
    {
      key: "soldCount",
      render: (event) => (
        <Text className="text-[14px] text-slate-700">
          {event.soldCount}/{event.capacity}
        </Text>
      ),
      title: eventsContent.soldLabel,
      width: 110,
    },
    {
      align: "right",
      key: "actions",
      render: (event) => (
        <View className="flex-row justify-end gap-2">
          <Touch
            accessibilityLabel={`${eventsContent.viewTicketsLabel} ${event.title}`}
            className="h-9 w-9 items-center justify-center rounded-md border border-slate-200"
            onPress={() => void openTickets(event)}
          >
            <Ticket color="#334155" size={16} />
          </Touch>
          <Touch
            accessibilityLabel={`${eventsContent.editLabel} ${event.title}`}
            className="h-9 w-9 items-center justify-center rounded-md border border-slate-200"
            onPress={() => {
              setEditingEvent(event);
              setSaveError("");
              setIsPanelOpen(true);
            }}
          >
            <Pencil color="#334155" size={16} />
          </Touch>
          <Touch
            accessibilityLabel={`${eventsContent.deleteLabel} ${event.title}`}
            className="h-9 w-9 items-center justify-center rounded-md border border-rose-200"
            disabled={event.ticketCount > 0}
            onPress={() => void deleteEvent(event.id).then(reloadEvents)}
          >
            <Trash2 color={event.ticketCount > 0 ? "#cbd5e1" : "#e11d48"} size={16} />
          </Touch>
        </View>
      ),
      title: "Thao tác",
      width: 160,
    },
  ];

  const ticketColumns: Column<EventTicket>[] = [
    {
      key: "customerName",
      render: (ticket) => <Text className="text-[14px] font-bold text-slate-900">{ticket.customerName}</Text>,
      title: "Khách hàng",
      width: 160,
    },
    {
      key: "phone",
      render: (ticket) => <Text className="text-[14px] text-slate-700">{ticket.phone}</Text>,
      title: "Điện thoại",
      width: 130,
    },
    {
      key: "quantity",
      render: (ticket) => <Text className="text-[14px] text-slate-700">{ticket.quantity}</Text>,
      title: "Số vé",
      width: 80,
    },
    {
      key: "totalPrice",
      render: (ticket) => <Text className="text-[14px] font-bold text-slate-900">{formatCurrency(ticket.totalPrice)}</Text>,
      title: "Thành tiền",
      width: 130,
    },
    {
      key: "status",
      render: (ticket) => (
        <StatusBadge label={ticketStatusLabels[ticket.status]} tone={ticketStatusTones[ticket.status]} />
      ),
      title: "Trạng thái",
      width: 140,
    },
  ];

  return (
    <View className="gap-5">
      <AdminPageHeader
        actions={
          <Button
            icon={<Plus color="#ffffff" size={17} />}
            label={eventsContent.createLabel}
            onPress={() => {
              setEditingEvent(null);
              setSaveError("");
              setIsPanelOpen(true);
            }}
            size="large"
          />
        }
        description={eventsContent.description}
        eyebrow="Kinh doanh"
        title={eventsContent.title}
      />

      <MetricGrid minItemWidth={240}>
        <MetricCard
          icon={<CalendarDays color={metricIconColor.emerald} size={20} />}
          label="Tổng sự kiện"
          value={`${events.length}`}
        />
        <MetricCard
          icon={<Users color={metricIconColor.orange} size={20} />}
          label="Vé đã bán"
          tone="orange"
          value={`${totalSold}`}
        />
        <MetricCard
          icon={<Ticket color={metricIconColor.violet} size={20} />}
          label="Doanh thu vé"
          tone="violet"
          value={formatCurrency(totalRevenue)}
        />
      </MetricGrid>

      {saveError && !isPanelOpen ? <ErrorMessage text={saveError} /> : null}

      <AdminTableCard
        description={`${visibleEvents.length} sự kiện phù hợp`}
        title="Danh sách sự kiện"
        toolbar={
          <>
            <SearchField
              accessibilityLabel={eventsContent.searchPlaceholder}
              onChange={setQuery}
              placeholder={eventsContent.searchPlaceholder}
              value={query}
              width={220}
            />
            <Select
              accessibilityLabel="Lọc theo cơ sở"
              onChange={setVenueFilter}
              options={[
                { label: eventsContent.allVenuesLabel, value: "all" },
                ...venues.map((venue) => ({ label: venue.name, value: venue.id })),
              ]}
              value={venueFilter}
              width={200}
            />
          </>
        }
      >
        {isLoadingEvents ? (
          <LoadingState label="Đang tải danh sách sự kiện…" />
        ) : (
          <DataTable
            columns={columns}
            emptyText={eventsContent.emptyLabel}
            rowKey={(event) => event.id}
            rows={visibleEvents}
          />
        )}
      </AdminTableCard>

      <EventFormPanel
        courts={courts}
        errorMessage={saveError}
        event={editingEvent ?? undefined}
        isOpen={isPanelOpen}
        key={editingEvent?.id ?? "create"}
        onClose={() => {
          setIsPanelOpen(false);
          setEditingEvent(null);
        }}
        onSave={(payload) => void handleSave(payload)}
        venues={venues}
      />

      <Drawer
        isOpen={ticketsFor !== null}
        onClose={() => setTicketsFor(null)}
        title={`${eventsContent.ticketsLabel}: ${ticketsFor?.title ?? ""}`}
        width={560}
      >
        {isLoadingTickets ? (
          <LoadingState label="Đang tải danh sách vé…" />
        ) : (
          <DataTable
            columns={ticketColumns}
            emptyText={eventsContent.emptyTickets}
            rowKey={(ticket) => ticket.id}
            rows={tickets}
          />
        )}
      </Drawer>
    </View>
  );
}

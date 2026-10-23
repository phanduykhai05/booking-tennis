import { ArrowLeft, CalendarDays, Clock3, Phone, Ticket } from "lucide-react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
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
      <div className="flex-1 bg-[#f5f6f5]">
        <div className="h-[59px] flex-row items-center justify-center bg-[#00925a]">
          <Touch
            accessibilityLabel={ticketHistoryContent.backLabel}
            className="absolute left-5 rounded p-1"
            onPress={() => navigate("/account")}
          >
            <ArrowLeft color="#ffffff" size={21} strokeWidth={2.6} />
          </Touch>
          <span className="text-[17px] font-bold text-white">{ticketHistoryContent.title}</span>
        </div>

        {errorMessage ? (
          <div className="mx-[10px] mt-2">
            <ErrorMessage text={errorMessage} />
          </div>
        ) : null}

        {isBusy ? (
          <LoadingState label={ticketHistoryContent.loading} />
        ) : tickets.length === 0 ? (
          <span className="py-16 text-center text-[14px] text-[#064b30]">{emptyMessage}</span>
        ) : (
          <div className="grow shrink overflow-y-auto overflow-x-hidden">
            <div className="gap-3 px-[10px] py-3 pb-10">
              {tickets.map((ticket) => (
                <div className="rounded-xl bg-white p-3" key={ticket.id} style={shadow.card}>
                  <div className="flex-row items-start gap-2">
                    <div className="h-10 w-10 items-center justify-center rounded-full bg-[#e1f7eb]">
                      <Ticket color="#008447" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[15px] font-bold text-[#18221e]">{ticket.title}</span>
                      <span className="mt-0.5 text-[13px] text-[#68716d]">{ticket.venueName}</span>
                    </div>
                    <div className="items-end gap-1">
                      <div className="rounded bg-[#e5f8ee] px-2 py-1">
                        <span className="text-[12px] font-semibold text-[#007b44]">
                          {ticketHistoryContent.quantityLabel(ticket.quantity)}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-semibold ${ticket.status === "paid" ? "text-[#007b44]" : ticket.status === "pending" ? "text-[#df9000]" : "text-[#87918c]"}`}
                      >
                        {ticketHistoryContent.statusLabels[ticket.status]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 gap-1.5 border-t border-[#eef1ef] pt-3">
                    <div className="flex-row items-center gap-1.5">
                      <CalendarDays color="#68716d" size={15} />
                      <span className="text-[13px] text-[#3c4742]">{ticket.eventDate}</span>
                    </div>
                    <div className="flex-row items-center gap-1.5">
                      <Clock3 color="#68716d" size={15} />
                      <span className="text-[13px] text-[#3c4742]">
                        {ticket.timeStart} - {ticket.timeEnd}
                      </span>
                    </div>
                    <div className="flex-row items-center gap-1.5">
                      <Phone color="#68716d" size={15} />
                      <span className="text-[13px] text-[#3c4742]">
                        {ticketHistoryContent.phoneLabel}: {ticket.phone}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex-row items-center justify-between border-t border-[#eef1ef] pt-3">
                    <span className="text-[13px] text-[#68716d]">{ticketHistoryContent.totalLabel}</span>
                    <span className="text-[15px] font-bold text-[#008447]">{ticket.priceLabel}</span>
                  </div>

                  <Touch
                    className="mt-2 self-start"
                    onPress={() => navigate(`/product/${ticket.venueId}`)}
                  >
                    <span className="text-[13px] font-semibold text-[#007b44] underline">{ticketHistoryContent.venueLabel}</span>
                  </Touch>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}

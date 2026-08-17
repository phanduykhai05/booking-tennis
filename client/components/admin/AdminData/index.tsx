"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import type {
  AdminDataContextValue,
  AdminDataState,
  BookingStatus,
  CourtPayload,
  CreateBookingPayload,
  CustomerStatus,
  PaymentStatus,
} from "@/components/admin/AdminData/types";
import {
  adminCreateBooking,
  adminCreateCourt,
  adminUpdateBookingStatus,
  adminUpdateCourt,
  adminUpdateCustomerStatus,
  adminUpdatePaymentStatus,
  getAdminData,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const emptyState: AdminDataState = {
  activityEvents: [],
  bookings: [],
  courts: [],
  customers: [],
  payments: [],
  venues: [],
};

type AdminDataProviderProps = {
  children: React.ReactNode;
};

export default function AdminDataProvider({ children }: AdminDataProviderProps) {
  const { isReady, token } = useSession();
  const [state, setState] = useState<AdminDataState>(emptyState);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const refresh = useCallback(async () => {
    if (!token) return;

    try {
      const data = await getAdminData(token);
      setState(data);
      setFetchError("");
    } catch (error) {
      setFetchError(error instanceof ApiError ? error.message : "Không tải được dữ liệu quản trị");
    } finally {
      setIsFetching(false);
    }
  }, [token]);

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (!isReady || !token) return;

    let isActive = true;

    getAdminData(token)
      .then((data) => {
        if (!isActive) return;
        setState(data);
        setFetchError("");
      })
      .catch((error: unknown) => {
        if (isActive) setFetchError(error instanceof ApiError ? error.message : "Không tải được dữ liệu quản trị");
      })
      .finally(() => {
        if (isActive) setIsFetching(false);
      });

    return () => {
      isActive = false;
    };
  }, [isReady, token]);

  const errorMessage = isReady && !token ? "Đăng nhập bằng tài khoản quản trị để xem dữ liệu." : fetchError;
  const isLoading = token ? isFetching : false;

  // Mọi thao tác ghi đều gọi API rồi tải lại state để client không tự suy diễn dữ liệu.
  const runMutation = async <T,>(action: (activeToken: string) => Promise<T>) => {
    if (!token) throw new ApiError("Bạn cần đăng nhập bằng tài khoản quản trị", 401);

    const result = await action(token);
    await refresh();
    return result;
  };

  const value: AdminDataContextValue = {
    ...state,
    createBooking: (payload: CreateBookingPayload) =>
      runMutation(async (activeToken) => (await adminCreateBooking(activeToken, payload)).id),
    createCourt: (payload: CourtPayload) => runMutation((activeToken) => adminCreateCourt(activeToken, payload)).then(() => undefined),
    errorMessage,
    isLoading,
    refresh,
    updateBookingStatus: (bookingId: string, status: BookingStatus) =>
      runMutation((activeToken) => adminUpdateBookingStatus(activeToken, bookingId, status)).then(() => undefined),
    updateCourt: (courtId: string, payload: CourtPayload) =>
      runMutation((activeToken) => adminUpdateCourt(activeToken, courtId, payload)).then(() => undefined),
    updateCustomerStatus: (customerId: string, status: CustomerStatus) =>
      runMutation((activeToken) => adminUpdateCustomerStatus(activeToken, customerId, status)).then(() => undefined),
    updatePaymentStatus: (paymentId: string, status: PaymentStatus) =>
      runMutation((activeToken) => adminUpdatePaymentStatus(activeToken, paymentId, status)).then(() => undefined),
  };

  return (
    <AdminDataContext.Provider value={value}>
      {errorMessage && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {errorMessage}
        </div>
      )}
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const value = useContext(AdminDataContext);
  if (!value) throw new Error("useAdminData phải được sử dụng bên trong AdminDataProvider.");
  return value;
}

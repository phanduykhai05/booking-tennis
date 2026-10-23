import { apiBaseUrl } from "@/lib/api/config";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiRequest = {
  body?: unknown;
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  token?: string | null;
};

type ErrorPayload = { message?: string | string[] };

/**
 * Điểm vào duy nhất để gọi API. Mọi lỗi đều được chuẩn hoá thành ApiError với
 * thông điệp tiếng Việt do server trả về, nên component chỉ cần hiển thị lại.
 * Lỗi mạng của React Native ném TypeError chứ không có response, nên được bọc lại thành ApiError 0.
 */
export async function apiFetch<T>(path: string, options: ApiRequest = {}): Promise<T> {
  const { body, method = "GET", token } = options;

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method,
    });
  } catch {
    throw new ApiError("Không kết nối được máy chủ", 0);
  }

  if (response.status === 204) return undefined as T;

  const payload = (await response.json().catch(() => null)) as (T & ErrorPayload) | null;

  if (!response.ok) {
    const message = payload?.message;
    throw new ApiError(
      Array.isArray(message) ? message.join(", ") : (message ?? "Không kết nối được máy chủ"),
      response.status,
    );
  }

  return payload as T;
}

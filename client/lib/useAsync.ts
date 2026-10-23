import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/http";

type AsyncState<T> = {
  data: T | null;
  errorMessage: string;
  isLoading: boolean;
  reload: () => void;
};

type Result<T> = { data: T | null; errorMessage: string; key: string };

/**
 * Thay cho việc fetch trong server component của Next: màn hình gọi API ngay khi mount.
 * `deps` là danh sách giá trị làm mới dữ liệu (ví dụ slug, ngày đang chọn).
 *
 * `isLoading` suy ra từ việc kết quả đang giữ có thuộc về lần yêu cầu hiện tại hay không,
 * nhờ vậy effect chỉ setState trong callback của promise — không tạo render dây chuyền.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: readonly unknown[], fallbackMessage: string): AsyncState<T> {
  const [reloadToken, setReloadToken] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);

  const key = `${reloadToken}|${JSON.stringify(deps)}`;
  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    let isActive = true;

    loader()
      .then((data) => {
        if (isActive) setResult({ data, errorMessage: "", key });
      })
      .catch((error: unknown) => {
        if (isActive) {
          setResult({ data: null, errorMessage: error instanceof ApiError ? error.message : fallbackMessage, key });
        }
      });

    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const isCurrent = result?.key === key;

  return {
    data: isCurrent ? result.data : null,
    errorMessage: isCurrent ? result.errorMessage : "",
    isLoading: !isCurrent,
    reload,
  };
}

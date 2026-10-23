import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";

export type Column<T> = {
  align?: "left" | "right";
  key: string;
  render: (row: T) => ReactNode;
  /** Có sorter thì tiêu đề cột bấm được để đổi chiều sắp xếp. */
  sorter?: (first: T, second: T) => number;
  title: string;
  width: number;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  emptyText: string;
  pageSize?: number;
  rowKey: (row: T) => string;
  rows: T[];
};

type SortState = { direction: "asc" | "desc"; key: string } | null;

/**
 * Bảng dữ liệu thay cho antd Table: cuộn ngang theo tổng bề rộng cột, sắp xếp và
 * phân trang phía client. Cột có bề rộng cố định để phần thân luôn khớp với header.
 */
export default function DataTable<T>({ columns, emptyText, pageSize = 10, rowKey, rows }: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(0);

  const totalWidth = columns.reduce((total, column) => total + column.width, 0);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;

    const column = columns.find((item) => item.key === sort.key);
    if (!column?.sorter) return rows;

    const sorted = [...rows].sort(column.sorter);
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [columns, rows, sort]);

  const pageCount = Math.max(Math.ceil(sortedRows.length / pageSize), 1);
  const safePage = Math.min(page, pageCount - 1);
  const visibleRows = sortedRows.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const toggleSort = (key: string) => {
    setPage(0);
    setSort((current) =>
      current?.key === key
        ? current.direction === "asc"
          ? { direction: "desc", key }
          : null
        : { direction: "asc", key },
    );
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div style={{ width: totalWidth }}>
          <div className="flex-row border-b border-slate-200 bg-slate-50">
            {columns.map((column) => {
              const heading = (
                <div className={`flex-row items-center gap-1 ${column.align === "right" ? "justify-end" : ""}`}>
                  <span className="text-[12px] font-bold uppercase tracking-wide text-slate-500">{column.title}</span>
                  {column.sorter && sort?.key === column.key ? (
                    sort.direction === "asc" ? <ChevronUp color="#0f9b58" size={13} /> : <ChevronDown color="#0f9b58" size={13} />
                  ) : null}
                </div>
              );

              // Cột không sắp xếp được dựng bằng div: dùng Touch disabled sẽ làm mờ tiêu đề.
              return column.sorter ? (
                <Touch className="px-3 py-3" key={column.key} onPress={() => toggleSort(column.key)} style={{ width: column.width }}>
                  {heading}
                </Touch>
              ) : (
                <div className="px-3 py-3" key={column.key} style={{ width: column.width }}>
                  {heading}
                </div>
              );
            })}
          </div>

          {visibleRows.length === 0 ? (
            <div className="items-center px-4 py-12" style={{ width: totalWidth }}>
              <span className="text-[14px] text-slate-500">{emptyText}</span>
            </div>
          ) : (
            visibleRows.map((row) => (
              <div className="flex-row border-b border-slate-100" key={rowKey(row)}>
                {columns.map((column) => (
                  <div
                    className={`justify-center px-3 py-3 ${column.align === "right" ? "items-end" : ""}`}
                    key={column.key}
                    style={{ width: column.width }}
                  >
                    {column.render(row)}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {pageCount > 1 ? (
        <div className="flex-row items-center justify-end gap-3 border-t border-slate-200 px-4 py-2.5">
          <span className="text-[12px] text-slate-500">
            Trang {safePage + 1}/{pageCount} · {sortedRows.length} dòng
          </span>
          <Touch
            accessibilityLabel="Trang trước"
            className="rounded-md border border-slate-200 p-1.5"
            disabled={safePage === 0}
            onPress={() => setPage(safePage - 1)}
          >
            <ChevronLeft color="#334155" size={16} />
          </Touch>
          <Touch
            accessibilityLabel="Trang sau"
            className="rounded-md border border-slate-200 p-1.5"
            disabled={safePage + 1 >= pageCount}
            onPress={() => setPage(safePage + 1)}
          >
            <ChevronRight color="#334155" size={16} />
          </Touch>
        </div>
      ) : null}
    </div>
  );
}

import { cn } from "@/lib/cn";

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  headClassName?: string;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  dense = false,
  className,
  mono = false,
}: {
  columns: readonly Column<T>[];
  rows: readonly T[];
  rowKey: (row: T, index: number) => string | number;
  dense?: boolean;
  className?: string;
  mono?: boolean;
}) {
  const td = dense ? "px-3 py-1.5" : "px-3.5 py-2.5";
  return (
    <table
      className={cn(
        "w-full border-separate border-spacing-0 text-[13px]",
        mono && "font-mono text-[12px]",
        className,
      )}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                "text-left font-medium",
                "bg-bg-subtle shadow-[0_1px_0_var(--color-line)]",
                "font-mono text-[11px] uppercase tracking-[0.06em] text-fg-subtle",
                td,
                col.align === "right" && "text-right",
                col.align === "center" && "text-center",
                col.headClassName,
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={rowKey(row, i)} className="transition-colors hover:bg-bg-subtle">
            {columns.map((col, ci) => (
              <td
                key={col.key}
                className={cn(
                  td,
                  "align-middle shadow-[0_1px_0_var(--color-line-subtle)]",
                  "group-last:shadow-none",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  i === rows.length - 1 && "!shadow-none",
                  col.className,
                )}
              >
                {col.cell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

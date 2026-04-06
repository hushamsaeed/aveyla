"use client";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T extends { id: number }> {
  columns: Column<T>[];
  rows: T[];
  editHref: (row: T) => string;
  onDelete: (id: number) => void;
}

export default function AdminTable<T extends { id: number }>({
  columns,
  rows,
  editHref,
  onDelete,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-100">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-center font-body text-sm text-driftwood"
              >
                No records found.
              </td>
            </tr>
          )}
          {rows.map((row, idx) => (
            <tr
              key={row.id}
              className={
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-3 font-body text-sm text-dark-driftwood align-top"
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3 text-right align-top">
                <div className="flex items-center justify-end gap-3">
                  <a
                    href={editHref(row)}
                    className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this record? This cannot be undone.")) {
                        onDelete(row.id);
                      }
                    }}
                    className="font-body text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

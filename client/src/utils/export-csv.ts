export function exportTableToCSV<T>(rows: T[], columns: string[], filename = "table.csv") {
  if (!rows.length || !columns.length) return;

  const csvHeader = columns.join(",");
  const csvBody = rows.map((row: any) =>
    columns.map((key) => `"${(row[key] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );

  const csvContent = [csvHeader, ...csvBody].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

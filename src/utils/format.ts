const WEEKDAYS = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Nhận "YYYY-MM-DD", tự tách chuỗi để tránh lệch múi giờ. */
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatWeekday(dateStr: string): string {
  return WEEKDAYS[parseDate(dateStr).getDay()];
}

export function formatDayMonth(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

/** Nhận "YYYY-MM-DDTHH:mm" → "HH:mm, dd/MM/yyyy". */
export function formatUpdateTime(isoStr: string): string {
  const [datePart, timePart = ''] = isoStr.split('T');
  const [y, m, d] = datePart.split('-');
  return `${timePart.slice(0, 5)}, ${d}/${m}/${y}`;
}

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import { ZonedDateTime } from "@internationalized/date";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("id");

// getRelativeTimeRaw
export function getRelativeTimeRaw(dateString: string): string {
  const now = dayjs();
  // const date = dayjs.tz(dateString, "YYYY-MM-DDTHH:mm:ss", "Asia/Jakarta")
  const date = dayjs.utc(dateString);
  return calculateRelative(date, now);
}

// calculateRelative
function calculateRelative(date: dayjs.Dayjs, now: dayjs.Dayjs): string {
  const isFuture = date.isAfter(now);
  const suffix = isFuture ? "yang akan datang" : "yang lalu";

  let from = isFuture ? now : date;
  let to = isFuture ? date : now;

  const units = {
    tahun: to.diff(from, "year"),
    bulan: 0,
    minggu: 0,
    hari: 0,
    jam: 0,
    menit: 0,
  };

  from = from.add(units.tahun, "year");
  units.bulan = to.diff(from, "month");
  from = from.add(units.bulan, "month");
  units.minggu = to.diff(from, "week");
  from = from.add(units.minggu, "week");
  units.hari = to.diff(from, "day");
  from = from.add(units.hari, "day");
  units.jam = to.diff(from, "hour");
  from = from.add(units.jam, "hour");
  units.menit = to.diff(from, "minute");

  const { tahun, bulan, minggu, hari, jam, menit } = units;

  if (tahun > 0) return `${tahun} tahun ${suffix}`;
  if (bulan > 0) return `${bulan} bulan ${suffix}`;
  if (minggu > 0) return `${minggu} minggu ${suffix}`;
  if (hari > 0 && jam > 0) return `${hari} hari ${jam} jam ${suffix}`;
  if (hari > 0) return `${hari} hari ${suffix}`;
  if (jam > 0 && menit > 0) return `${jam} jam ${menit} menit ${suffix}`;
  if (jam > 0) return `${jam} jam ${suffix}`;
  if (menit > 0) return `${menit} menit ${suffix}`;

  return "Baru saja";
}

// getFullTimeRaw
export function getFullTimeRaw(dateString: string): string {
  return dayjs.utc(dateString).format("DD MMMM YYYY, HH:mm" + " WIB");
}

// getDateOnlyRaw
export function getDateOnlyRaw(dateString: string): string {
  return dayjs.utc(dateString).format("DD MMMM YYYY");
}

// getDurationRaw
export function getDurationRaw(startDate: string, endDate: string): string {
  return calculateDuration(dayjs.utc(startDate), dayjs.utc(endDate));
}

// calculateDuration
function calculateDuration(start: dayjs.Dayjs, end: dayjs.Dayjs): string {
  const years = end.diff(start, "year");
  const afterYears = start.add(years, "year");

  const months = end.diff(afterYears, "month");
  const afterMonths = afterYears.add(months, "month");

  const weeks = end.diff(afterMonths, "week");
  const afterWeeks = afterMonths.add(weeks, "week");

  const days = end.diff(afterWeeks, "day");

  if (years > 0 && months === 0) return `${years} tahun`;
  if (years > 0 && months > 0) return `${years} tahun ${months} bulan`;
  if (months > 0 && weeks === 0) return `${months} bulan`;
  if (months > 0 && weeks > 0) return `${months} bulan ${weeks} minggu`;
  if (weeks > 0 && days === 0) return `${weeks} minggu`;
  if (weeks > 0 && days > 0) return `${weeks} minggu ${days} hari`;

  return `${days} hari`;
}

// getDateOnly
export function getDateOnly(dateString: string, useUKFormat: boolean = false): string {
  const format = useUKFormat ? "D MMMM YYYY" : "MMMM D, YYYY";
  return dayjs.utc(dateString).locale("en").format(format);
}

export function formatZonedDateTimeToMySQL(zdt: ZonedDateTime): string {
  const year = zdt.year;
  const month = String(zdt.month).padStart(2, "0");
  const day = String(zdt.day).padStart(2, "0");
  const hour = String(zdt.hour).padStart(2, "0");
  const minute = String(zdt.minute).padStart(2, "0");
  const second = String(zdt.second).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

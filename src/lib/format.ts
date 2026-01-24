import { format, isValid, parse, parseISO } from 'date-fns';

export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts
    }).format(new Date(date));
  } catch (_err) {
    return '';
  }
}

export function formatDateLocal(date: Date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateLocalSlash(date: Date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export function formatDisplayDateForDocuments(date?: string | Date) {
  if (!date) return '';

  let d: Date;
  if (typeof date === 'string') {
    d = parseISO(date);
  } else {
    d = date;
  }

  if (Number.isNaN(d.getTime())) return String(date);

  return format(d, 'MMM d, yyyy'); // e.g. Jan 8, 2022
}

export function formatHhmmssToAmPm(timeStr: string) {
  if (!timeStr) return '';

  const s = timeStr.trim();
  const hasSeconds = /^\d{1,2}:\d{2}:\d{2}$/.test(s);
  const parseFormat = hasSeconds ? 'HH:mm:ss' : 'HH:mm';

  const d = parse(s, parseFormat, new Date());
  return isValid(d) ? format(d, 'hh:mm a') : '';
}

export function formatToMonthYear(date?: string | Date) {
  if (!date) return '';

  let d: Date;
  if (typeof date === 'string') {
    d = parseISO(date);
  } else {
    d = date;
  }

  if (Number.isNaN(d.getTime())) return String(date);

  return format(d, 'MMM yyyy'); // e.g. Jan 2022
}

export function formatToYear(date?: string | Date) {
  if (!date) return '';

  let d: Date;
  if (typeof date === 'string') {
    d = parseISO(date);
  } else {
    d = date;
  }

  if (Number.isNaN(d.getTime())) return String(date);

  return format(d, 'yyyy'); // e.g. 2022
}

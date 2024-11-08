type Timestamp = { seconds: number; nanoseconds: number };

export function formatDate(date: Date | Timestamp | null): string {
  if (!date) return '';
  let dateObject: Date;

  if (typeof date === 'object' && 'seconds' in date && 'nanoseconds' in date) {
    dateObject = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  } else if (date instanceof Date) {
    dateObject = date;
  } else {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = dateObject
    .toLocaleString('ru-RU', options)
    .replace(',', '');

  return formattedDate;
}

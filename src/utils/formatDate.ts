type Timestamp = { seconds: number; nanoseconds: number };

export function formatDate(date: Date | Timestamp | null): string {
  if (!date) return ''; // если дата равна null, возвращаем пустую строку

  let dateObject: Date;

  // Если это объект с `seconds` и `nanoseconds`, создаём объект Date
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

  console.log('Before Formatting Date:', dateObject);
  const formattedDate = dateObject
    .toLocaleString('ru-RU', options)
    .replace(',', '');
  console.log('After Formatting Date:', formattedDate);

  return formattedDate;
}

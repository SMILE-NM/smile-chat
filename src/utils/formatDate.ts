export function formatDate(date: Date): string {
  // Опции форматирования
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short', // Укороченное название месяца
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-часовой формат
  };

  // Получаем отформатированную строку
  const formattedDate = date.toLocaleString('ru-RU', options).replace(',', '');

  return formattedDate;
}

import dayjs from "dayjs";

export function getDatesOfMonthWithOutsideDays(year, month) {
  const monthStart = dayjs(new Date(year, month, 1));
  const monthEnd = monthStart.endOf("month");
  const daysInMonth = monthEnd.date();

  const startDayOfWeek = monthStart.weekday();
  const daysFromPrevMonth = startDayOfWeek;

  const totalDaysNeeded = 7 * 5;
  const coreDaysCount = daysFromPrevMonth + daysInMonth;
  const daysFromNextMonth =
    totalDaysNeeded > coreDaysCount ? totalDaysNeeded - coreDaysCount : 0;

  // Get dates from previous month
  const prevMonth = monthStart.subtract(1, "month");
  const daysInPrevMonth = prevMonth.daysInMonth();
  const prevMonthDays = Array.from({ length: daysFromPrevMonth }, (_, i) => {
    return dayjs(
      new Date(prevMonth.year(), prevMonth.month(), daysInPrevMonth - i)
    );
  }).reverse();

  // Get dates from current month
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
    return dayjs(new Date(year, month, i + 1));
  });

  // Get dates from next month
  const nextMonth = monthEnd.add(1, "day");
  const nextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => {
    return dayjs(new Date(nextMonth.year(), nextMonth.month(), i + 1));
  });

  // Combine all dates
  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

export function splitArrayIntoChunks(arr, size) {
  let result = [];

  for (let i = 0; i < arr.length; i += size) {
    let chunk = arr.slice(i, i + size);
    result.push(chunk);
  }

  return result;
}

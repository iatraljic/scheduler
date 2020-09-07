import { daysByMonth } from '../constants';

export function getTomorrow() {
  const today = new Date();

  today.setDate(today.getDate() + 1);

  return today;
}

export function getWeek(date, month) {
  const tempDate = new Date();
  const newYearsDay = new Date(tempDate.getFullYear(), 0, 1);
  let dayOfYear = 0;
  for (let i = 0; i < month; i++) {
    dayOfYear += daysByMonth[i];
  }
  dayOfYear += date + (7 - newYearsDay.getDay());
  const week = Math.floor(dayOfYear / (month + 1));

  return week;
}

export function formatTime(timeFloat) {
  const hour = Math.floor(timeFloat);
  const min = Math.floor((timeFloat - hour) * 60);
  return `${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}`;
}

export function toISODateString(date) {
  return date.toISOString().substr(0, 10);
}

export function isEven(n) {
  return n % 2 === 0;
}

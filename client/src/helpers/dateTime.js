import { formatDate } from '@fullcalendar/core';

export const formatDateTime = (date, showTime = true) => {
  // const dateFormat = +date ? (new Date(+date)).toDateString() : date;
  
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...((showTime && date?.includes('T')) && (
      {
        hour: "numeric",
        minute: 'numeric'
      }
    ))
  })
}
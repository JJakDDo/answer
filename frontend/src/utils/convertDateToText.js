const MONTH_MAP = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function convertDateToText(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${MONTH_MAP[date.getMonth()]} ${date.getDate()}`;
}

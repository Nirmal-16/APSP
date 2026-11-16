// "2026-06-01" → "June 1, 2026". Dates are parsed as UTC, so formatting in
// UTC keeps them from shifting a day in time zones behind it.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

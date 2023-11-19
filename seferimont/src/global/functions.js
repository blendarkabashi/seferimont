export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function formatDateString(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

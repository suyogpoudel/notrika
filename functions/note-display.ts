export function formatDateWithOrdinal(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb...
  const year = date.getFullYear();

  let ordinal = "th";
  if (day % 10 === 1 && day !== 11) ordinal = "st";
  else if (day % 10 === 2 && day !== 12) ordinal = "nd";
  else if (day % 10 === 3 && day !== 13) ordinal = "rd";

  return `${day}${ordinal} ${month}, ${year}`;
}

export function timeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

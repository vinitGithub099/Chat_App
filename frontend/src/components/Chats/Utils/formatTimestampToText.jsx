export function formatTimestampToText(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the current date for comparison
  const currentDate = new Date();

  // Check if it's today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `Today at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }
  // Check if it's yesterday
  else if (
    date.getDate() === currentDate.getDate() - 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `Yesterday at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }
  // For other days, display the full date and time
  else {
    return `${date.toLocaleDateString()} at ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
}

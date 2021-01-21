export function formatDate(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return (
    day +
    " " +
    monthNames[monthIndex] +
    " " +
    year +
    " " +
    "at " +
    hours +
    ":" +
    minutes
  );
}

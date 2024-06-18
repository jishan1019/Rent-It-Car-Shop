export const calculateTotalCost = (
  startTime: string,
  endTime: string,
  pricePerHour: number
) => {
  // Convert start time to total hours
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const startTotalHours = startHour + startMinute / 60;

  // Convert end time to total hours
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const endTotalHours = endHour + endMinute / 60;

  // Calculate duration in hours
  const durationHours = endTotalHours - startTotalHours;

  // Calculate total cost
  const totalCost = durationHours * pricePerHour;

  return totalCost;
};

function timeToMinutes(timeStr) {
  const [time, modifier] = timeStr.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) hours = 0;
  if (modifier.toUpperCase() === "PM") hours += 12;

  return hours * 60 + minutes;
}

// Checks if the new time overlaps with any existing activities
export function hasTimeConflict(newTimeRange, existingActivities) {
  const [newStartStr, newEndStr] = newTimeRange.split("-");
  
  if (!newStartStr || !newEndStr) return false; 

  const newStart = timeToMinutes(newStartStr);
  const newEnd = timeToMinutes(newEndStr);

  // Loop through all existing activities to check for overlaps
  return existingActivities.some((activity) => {
    const [existStartStr, existEndStr] = activity.recommendedTime.split("-");
    if (!existStartStr || !existEndStr) return false;

    const existStart = timeToMinutes(existStartStr);
    const existEnd = timeToMinutes(existEndStr);

    // The mathematical formula to check if two time ranges overlap
    return newStart < existEnd && existStart < newEnd;
  });
}
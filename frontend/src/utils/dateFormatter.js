export const formatTripDates = (startDateString, numberOfDays) => {
    if (!startDateString) return "Dates TBD";

    const startDate = new Date(startDateString);

    // Calculate the end date by adding the number of days
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (numberOfDays - 1));

    const startStr = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    // Combing
    return `${startStr} – ${endStr}`;
  };
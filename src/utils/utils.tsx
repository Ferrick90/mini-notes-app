const convertTimestampToFormattedDate = (
  timestamp: number,
  format: string = "Y-M-D h:m:s"
): string => {
  const date = new Date(timestamp);

  // Helper function to zero-pad numbers
  const zeroPad = (value: number) => value.toString().padStart(2, "0");

  // Extract individual date components
  const year = date.getFullYear();
  const month = zeroPad(date.getMonth() + 1); // Months are 0-indexed
  const day = zeroPad(date.getDate());
  const hour = zeroPad(date.getHours());
  const minute = zeroPad(date.getMinutes());
  const second = zeroPad(date.getSeconds());

  // Map format placeholders to actual values
  const replacements: { [key: string]: string } = {
    Y: year.toString(),
    M: month,
    D: day,
    h: hour,
    m: minute,
    s: second,
  };

  // Replace placeholders in the format string
  return format.replace(
    /Y|M|D|h|m|s/g,
    (match) => replacements[match] || match
  );
};

export { convertTimestampToFormattedDate };

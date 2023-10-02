export const isMonth = (month: string): boolean => {
  if (isNaN(parseInt(month)) || parseInt(month) < 0 || parseInt(month) > 12) return false;
  return true;
};
export const isYear = (year: string): boolean => {
  if (isNaN(parseInt(year))) return false;
  return true;
};

export const isValidMonth = (value?: string | null) =>
  /^(0[1-9]|1[0-2])$/.test(value ?? "");

export const isValidYear = (value?: string | null) =>
  /^\d{4}$/.test(value ?? "");

export const getCurrentMonth = () =>
  String(new Date().getMonth() + 1).padStart(2, "0");

export const getCurrentYear = () => String(new Date().getFullYear());

export const getResolvedMonthYear = (
  month?: string | null,
  year?: string | null
) => ({
  month: isValidMonth(month) ? month! : getCurrentMonth(),
  year: isValidYear(year) ? year! : getCurrentYear(),
});

export const getMonthDateRange = (month: string, year: string) => {
  const numericYear = Number(year);
  const numericMonth = Number(month);

  return {
    startDate: new Date(numericYear, numericMonth - 1, 1),
    endDate: new Date(numericYear, numericMonth, 1),
  };
};

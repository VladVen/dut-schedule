export const getParsedDate = (d: Date, date1: Date) => {
  let date2 = new Date(
    d.setDate(d.getDate() + 6 + ((1 + 7 - d.getDay()) % 7 || 7))
  );
  let parsedDate1 =
    date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear();
  let parsedDate2 =
    date2.getDate() + "." + (date2.getMonth() + 1) + "." + date2.getFullYear();
  return [parsedDate1, parsedDate2];
};

export const getDate1 = (number = 0) => {
  let d = new Date();
  const date1 = new Date(
    d.setDate(d.getDate() + number + ((1 + 7 - d.getDay()) % 7 || 7))
  );
  return [d, date1];
};

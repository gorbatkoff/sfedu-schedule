/*const weekDays = ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"];*/

export enum TableCellColor {
  DEFAULT_COLOR = "",
  LMS_COLOR = "#1378d6",
  AUDIENCE_COLOR = "#13d685",
  MILITARY_COLOR = "#1c523b",
}

const regex = /[А-К]-\d{3}/g;

export const getInfoAboutElement = (element: string) => {
  if (element.length === 0) return TableCellColor.DEFAULT_COLOR;
  if (element.includes("LMS")) return TableCellColor.LMS_COLOR;
  if (element.includes("Военная подготовка"))
    return TableCellColor.MILITARY_COLOR;
  if (element.match(regex)) return TableCellColor.AUDIENCE_COLOR;
  return TableCellColor.DEFAULT_COLOR;
};

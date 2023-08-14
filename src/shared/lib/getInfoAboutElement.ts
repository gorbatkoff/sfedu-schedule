const weekDays = ["Пнд,", "Втр,", "Срд,", "Чтв,", "Птн,", "Сбт,"];

export enum TableCellColor {
  DEFAULT_COLOR = "",
  DAY_COLOR = "var(--secondary-color)",
  LMS_COLOR = "#054785",
  AUDIENCE_COLOR = "#008038",
  MILITARY_COLOR = "#1c523b",
}

const auditoryRegex = /[А-К]-\d{3}/g;
const LMSRegex = /LMS(|-\d+)/g;

export const getInfoAboutElement = (element: string) => {
  if (element.length === 0) return TableCellColor.DEFAULT_COLOR;
  if (weekDays.includes(element.slice(0, 4))) return TableCellColor.DAY_COLOR;
  if (element.match(LMSRegex)) return TableCellColor.LMS_COLOR;
  if (element.includes("Военная подготовка"))
    return TableCellColor.MILITARY_COLOR;
  if (element.match(auditoryRegex)) return TableCellColor.AUDIENCE_COLOR;
  return TableCellColor.DEFAULT_COLOR;
};

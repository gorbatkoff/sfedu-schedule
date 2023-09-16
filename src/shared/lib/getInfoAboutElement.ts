import { auditoryRegex, LMSRegex, VPKRegex } from "../regex";
import { weekDays } from "../const";

export enum TableCellColor {
  DEFAULT_COLOR = "",
  DAY_COLOR = "var(--secondary-color)",
  LMS_COLOR = "#054785",
  AUDIENCE_COLOR = "#008038",
  MILITARY_COLOR = "#1c523b",
  EXAM_COLOR = "#8b1111",
  VPK_COLOR = "#3182ce",
}

export const getInfoAboutElement = (element: string) => {
  if (element.length === 0) return TableCellColor.DEFAULT_COLOR;
  if (element.startsWith("экз.")) return TableCellColor.EXAM_COLOR;
  if (weekDays.includes(element.slice(0, 3))) return TableCellColor.DAY_COLOR;
  if (element.match(LMSRegex)) return TableCellColor.LMS_COLOR;
  if (element.includes("Военная подготовка"))
    return TableCellColor.MILITARY_COLOR;
  if (element.match(auditoryRegex)) return TableCellColor.AUDIENCE_COLOR;
  if (element.includes("ТК ИТА ЮФУ")) return TableCellColor.AUDIENCE_COLOR;
  if (element.match(VPKRegex)) return TableCellColor.VPK_COLOR;
  return TableCellColor.DEFAULT_COLOR;
};

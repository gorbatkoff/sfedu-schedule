import { memo, useCallback } from "react";

import { Tr, useColorMode, useToast } from "@chakra-ui/react";

import { IScheduleTable, TableCell } from "/src/entities/ScheduleTable";

import { CELL_INFO_COPY_SUCCESS } from "/src/shared/const/toast/toast";

import styles from "./TableBody.module.scss";

interface ITableBodyProps {
  schedule: IScheduleTable;
  isCurrentWeek: boolean;
}

const currentDay = new Date().getDay() - 1;

const shouldHighlightCell = (
  rowIndex: number,
  cellIndex: number,
  isCurrentWeek: boolean
) => {
  if (!isCurrentWeek) return false;
  if (cellIndex === 0) return false;
  if (currentDay === 6) return false;
  if (rowIndex < currentDay) return true;
};

export const TableBody = memo((props: ITableBodyProps) => {
  const { schedule, isCurrentWeek } = props;

  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleCellDoubleClick = useCallback(
    (cellInfo: string) => {
      if (!cellInfo) return;

      navigator.clipboard.writeText(cellInfo).then(() => {
        toast(CELL_INFO_COPY_SUCCESS);
      });
    },
    [toast]
  );

  return (
    <>
      {schedule.table.table.slice(2).map((row, rowIndex) => {
        return (
          <Tr key={rowIndex}>
            {row.map((element, index) => {
              return (
                <TableCell
                  className={
                    shouldHighlightCell(rowIndex, index, isCurrentWeek)
                      ? styles.element
                      : undefined
                  }
                  key={index}
                  element={element}
                  colorMode={colorMode}
                  onClick={handleCellDoubleClick}
                />
              );
            })}
          </Tr>
        );
      })}
    </>
  );
});

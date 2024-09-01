import { memo, useCallback } from "react";

import { Tr, useColorMode, useToast } from "@chakra-ui/react";

import { IScheduleTable, TableCell } from "/src/entities/ScheduleTable";

import { CELL_INFO_COPY_SUCCESS } from "/src/shared/const/toast/toast";

interface ITableBodyProps {
  schedule: IScheduleTable;
}

export const TableBody = memo((props: ITableBodyProps) => {
  const { schedule } = props;

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
                  key={index}
                  element={element}
                  colorMode={colorMode}
                  onDoubleClick={handleCellDoubleClick}
                />
              );
            })}
          </Tr>
        );
      })}
    </>
  );
});

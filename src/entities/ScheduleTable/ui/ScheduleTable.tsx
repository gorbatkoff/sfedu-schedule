import { memo, useCallback, useEffect } from "react";

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { fetchVPKByWeek } from "/src/features/SelectVPK";
import { WeeksList } from "/src/features/WeeksList/WeeksList";

import { getScheduleTable, tableActions } from "/src/entities/ScheduleTable";
import { ScheduleInfo } from "/src/entities/ScheduleTable/ui/ScheduleInfo/ScheduleInfo";
import { TableBody } from "/src/entities/ScheduleTable/ui/TableBody/TableBody";
import { TableSkeleton } from "/src/entities/ScheduleTable/ui/TableSkeleton/TableSkeleton";

import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./ScheduleTable.module.scss";

interface TableProps {
  className?: string;
  isLoading: boolean;
}

const ScheduleTable = memo(({ className, isLoading }: TableProps) => {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { week: currentWeek } = useCurrentWeek();
  const textColor = useColorModeValue("black", "white");
  const schedule = useSelector(getScheduleTable);
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

  useEffect(() => {
    if (vpkInfo.group) {
      dispatch(fetchVPKByWeek({ week: currentWeek, vpk: vpkInfo }));
    }
  }, []);

  useEffect(() => {
    if (vpkData?.table?.group) {
      mergeVPKAndSchedule();
    }
  }, [vpkData]);

  const mergeVPKAndSchedule = useCallback(() => {
    const header = schedule.table.table.slice(0, 2);
    const slicedSchedule = schedule.table.table.slice(2);

    if (vpkData?.table?.group) {
      const slicedVPK = vpkData.table.table.slice(2);

      const mergedSchedule = slicedSchedule.map((row, rowIndex) => {
        return row.map((item, itemIndex) => {
          if (item.includes("Дисциплины ВПК")) {
            item = slicedVPK[rowIndex][itemIndex];
            return item;
          }
          return item;
        });
      });

      dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
    }
  }, [
    dispatch,
    schedule?.table?.table,
    vpkData?.table?.group,
    vpkData?.table?.table,
  ]);

  if (isLoading) return <TableSkeleton />;

  if (schedule.result === "no_entries" || schedule.result === "cleared")
    return null;
  if (schedule?.result === null) return null;

  return (
    <Box className={classNames(styles.Table, {}, [className])}>
      <ScheduleInfo schedule={schedule} />

      <WeeksList
        weeks={schedule.weeks}
        week={schedule.table.week}
        group={schedule.table.group}
        isMobileDevice={false}
      />

      <TableContainer sx={{ height: "100%", overflowY: "auto" }}>
        <Table variant="simple" sx={{ color: textColor }}>
          <Thead className={classNames(styles.tableHead, styles[colorMode])}>
            {schedule.table.table.slice(0, 2).map((row, index) => {
              return (
                <Tr key={index}>
                  {row.map((element, index) => {
                    return <Td key={index}>{element}</Td>;
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody className={styles.tableBody}>
            <TableBody schedule={schedule} />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default ScheduleTable;

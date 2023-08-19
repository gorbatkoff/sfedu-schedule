import { memo } from "react";

import classNames from "classnames";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import TableCell from "/src/widgets/Table/ui/TableCell/TableCell";

import { $api } from "/src/shared/api/api";
import { IScheduleTable } from "/src/entities/ScheduleTable";

import styles from "./Table.module.scss";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

interface TableProps {
  className?: string;
  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;
}

export const ScheduleTable = memo(
  ({ className, schedule, updateData }: TableProps) => {
    const textColor = useColorModeValue("black", "white");
    const { week } = useCurrentWeek();
    async function fetchDataByWeek(week: number) {
      try {
        const request = await $api.get("/", {
          params: {
            group: schedule.table.group,
            week,
          },
        });

        updateData(request.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (schedule.result === "no_entries") return null;

    return (
      <div className={classNames(styles.Table, {}, [className])}>
        {schedule && (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                padding: "1em",
              }}
            >
              {schedule.weeks.map((week, index) => {
                return (
                  <Button
                    className={styles.weekButton}
                    onClick={() => fetchDataByWeek(week)}
                    key={index}
                    isDisabled={schedule.table.week === index + 1}
                    colorScheme={
                      schedule.table.week === index + 1 ? "green" : "twitter"
                    }
                  >
                    {week}
                  </Button>
                );
              })}
            </div>
            <TableContainer sx={{ height: "100%", overflowY: "auto" }}>
              <Table variant="simple" sx={{ color: textColor }}>
                <Thead
                  sx={{
                    position: "sticky",
                    top: 0,
                    background: "#262D3F",
                    zIndex: 1,
                    color: "white",
                  }}
                >
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
                  {schedule.table.table.slice(2).map((row, index) => {
                    return (
                      <Tr key={index}>
                        {row.map((element, index) => {
                          return (
                            <TableCell
                              key={index}
                              element={element}
                              textColor={textColor}
                            />
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    );
  },
);

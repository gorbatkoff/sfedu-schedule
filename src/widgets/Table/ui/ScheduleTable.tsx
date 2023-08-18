import React, { memo, useState } from "react";

import styles from "./Table.module.scss";
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
  useToast,
} from "@chakra-ui/react";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";
import TableCell from "/src/widgets/Table/ui/TableCell/TableCell";

interface TableProps {
  className?: string;
  schedule: IScheduleTable;
}

export const ScheduleTable = memo(({ className, schedule }: TableProps) => {
  const textColor = useColorModeValue("black", "white");
  const toast = useToast();

  const [scheduleData, setScheduleData] = useState<IScheduleTable>({
    table: {
      group: "",
      link: "",
      name: "",
      table: [],
      type: "",
      week: 0,
    },
    weeks: [],
  });

  /*  const getScheduleData = async () => {
    try {
      const request = await $api.get("/?group=102.html&week=21");

      setScheduleData(request.data);
    } catch (error) {
      toast({
        title: "Ошибка загрузки данных",
        description:
          "Произошла ошибка при загрузке данных. Попробуйте обновить страницу",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };*/

  /*  useEffect(() => {
    getScheduleData();
  }, []);*/

  /*  if (scheduleData.table.table.length === 0 || !scheduleData) return <Loader />;*/

  return (
    <div className={classNames(styles.Table, {}, [className])}>
      {schedule && (
        <>
          <div className={styles.weeksList}>
            {schedule.weeks.map((week, index) => {
              return <Button>{week}</Button>;
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
});

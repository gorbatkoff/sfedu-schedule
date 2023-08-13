import React, { memo, useEffect, useState } from "react";

import styles from "./Table.module.scss";
import classNames from "classnames";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { $api } from "/src/shared/api/api";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";
import TableCell from "/src/widgets/Table/ui/TableCell/TableCell";

interface TableProps {
  className?: string;
  schedule: any;
}

export const ScheduleTable = memo(({ className }: TableProps) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const tableColor = colorMode === "light" ? "black" : "white";

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

  const getScheduleData = async () => {
    try {
      const request = await $api.get("/?group=53.html&week=11");

      setScheduleData(request.data);
    } catch (error) {
      toast({
        title: "Ошибка загрузки данных",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getScheduleData();
  }, []);

  console.log(scheduleData);

  return (
    <div className={classNames(styles.Table, {}, [className])}>
      {scheduleData ? <h1>Есть данные</h1> : <h1>Нету лол</h1>}

      {scheduleData && (
        <TableContainer sx={{ height: "100%", overflowY: "auto" }}>
          <Table variant="simple" sx={{ color: tableColor }}>
            <Thead
              sx={{
                position: "sticky",
                top: 0,
                background: "#262D3F",
                zIndex: 1,
              }}
            >
              {scheduleData.table.table.slice(0, 2).map((row) => {
                return (
                  <Tr>
                    {row.map((element) => {
                      return <Td>{element}</Td>;
                    })}
                  </Tr>
                );
              })}
            </Thead>
            <Tbody className={styles.tableBody}>
              {scheduleData.table.table.slice(2).map((row) => {
                return (
                  <Tr>
                    {row.map((element) => {
                      return <TableCell element={element} />;
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
});

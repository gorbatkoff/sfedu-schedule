import React, { memo, useEffect, useState } from "react";

import styles from "./Table.module.scss";
import classNames from "classnames";
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { $api } from "/src/shared/api/api";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";
import TableCell from "/src/widgets/Table/ui/TableCell/TableCell";
import Loader from "/src/shared/ui/Loader/Loader";

interface TableProps {
  className?: string;
  schedule?: any;
}

export const ScheduleTable = memo(({ className }: TableProps) => {
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

  const getScheduleData = async () => {
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
  };

  useEffect(() => {
    getScheduleData();
  }, []);

  if (scheduleData.table.table.length === 0 || !scheduleData) return <Loader />;

  return (
    <div className={classNames(styles.Table, {}, [className])}>
      {scheduleData && (
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
              {scheduleData.table.table.slice(0, 2).map((row, index) => {
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
              {scheduleData.table.table.slice(2).map((row, index) => {
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
      )}
    </div>
  );
});

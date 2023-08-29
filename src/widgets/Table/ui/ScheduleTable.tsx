import { memo, useEffect, useState } from "react";

import classNames from "classnames";
import {
  Button,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import TableCell from "/src/widgets/Table/ui/TableCell/TableCell";

import { $api } from "/src/shared/api/api";
import { IScheduleTable } from "/src/entities/ScheduleTable";

import styles from "./ScheduleTable.module.scss";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { StarIcon } from "@chakra-ui/icons";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";

interface TableProps {
  className?: string;
  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;
}

export interface IFavoriteChoice {
  group: string;
  name: string;
}

const localStorageGroups = JSON.parse(
  localStorage.getItem("USER_FAVORITE_SEARCH") || "[]",
);

export const ScheduleTable = memo(
  ({ className, schedule, updateData }: TableProps) => {
    const textColor = useColorModeValue("black", "white");
    const [favoriteChoices, setFavoriteChoices] =
      useState<IFavoriteChoice[]>(localStorageGroups);
    const toast = useToast();
    const { week: currentWeek } = useCurrentWeek();

    const isFavorite =
      favoriteChoices.filter((item) => item.name === schedule.table?.name)
        .length > 0;

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

    const handleFavoriteSearch = () => {
      const favoriteSearch = {
        group: schedule.table.group,
        name: schedule.table.name,
      };

      const response = addSearchToFavorite(schedule, favoriteSearch);

      if (response) {
        setFavoriteChoices([...favoriteChoices, favoriteSearch]);
        toast({
          title: "Добавлено!",
          description:
            "Успех! Данное расписание было добавлено в список избранных.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const filteredChoices = favoriteChoices.filter(
          (item) => item.name !== favoriteSearch.name,
        );
        setFavoriteChoices(filteredChoices);
        toast({
          title: "Удалено!",
          description: "Данное расписание было удалено из списка избранных.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (schedule.result === "no_entries") return null;

    console.log(schedule);

    return (
      <div className={classNames(styles.Table, {}, [className])}>
        {schedule && (
          <>
            {schedule.table.name && (
              <div className={styles.groupActions}>
                <div className={styles.groupActionsFirst}>
                  <Heading color="white" className={styles.tableTitle}>
                    Расписание {schedule.table.name}{" "}
                    <span className={styles.week}>
                      Неделя {schedule.table.week}
                    </span>
                  </Heading>
                </div>
                <IconButton
                  aria-label="Добавить в избранное"
                  onClick={handleFavoriteSearch}
                >
                  <StarIcon color={isFavorite ? "yellow" : ""} />
                </IconButton>
              </div>
            )}
            <div className={styles.weeksList}>
              {schedule.weeks.map((week, index) => {
                return (
                  <Button
                    className={styles.weekButton}
                    onClick={() => fetchDataByWeek(week)}
                    key={index}
                    backgroundColor={week === currentWeek ? "#3be7cb" : ""}
                    isDisabled={schedule.table.week === index + 1}
                    opacity={week < currentWeek ? "0.5" : "1"}
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
                <Thead className={styles.tableHead}>
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

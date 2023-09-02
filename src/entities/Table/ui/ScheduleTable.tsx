import { memo, useEffect } from "react";

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
import TableCell from "/src/entities/Table/ui/TableCell/TableCell";

import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { StarIcon } from "@chakra-ui/icons";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";

import styles from "./ScheduleTable.module.scss";
import { useSelector } from "react-redux";
import { getScheduleTable } from "/src/entities/Table/model/selectors/getSchedule";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import {
  fetchScheduleByWeek,
  tableActions,
} from "/src/entities/Table/model/slice/tableSlice";
import { favoriteSearchActions } from "/src/entities/Table/model/slice/favoriteSearchSlice";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { fetchVPKByWeek } from "/src/features/SelectVPK/model/slice/selectVPKSlice";

interface TableProps {
  className?: string;
  /*  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;*/
}

export interface IFavoriteChoice {
  group: string;
  name: string;
}

const localStorageGroups = JSON.parse(
  localStorage.getItem("USER_FAVORITE_SEARCH") || "[]",
);

export const ScheduleTable = memo(({ className }: TableProps) => {
  const textColor = useColorModeValue("black", "white");
  const toast = useToast();
  const { week: currentWeek } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const favoriteChoices = useSelector(
    (state: StateSchema) => state.favoriteSearch,
  );
  const schedule = useSelector(getScheduleTable);
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

  useEffect(() => {
    if (vpkInfo.group) {
      dispatch(fetchVPKByWeek({ week: currentWeek, vpk: vpkInfo }));
    }
  }, []);

  useEffect(() => {
    console.log("vpkData", vpkData);
    if (vpkData) {
      mergeVPKAndSchedule();
    }
  }, [vpkData]);

  const mergeVPKAndSchedule = () => {
    const header = schedule.table.table.slice(0, 2);
    const slicedSchedule = schedule.table.table.slice(2);
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
  };

  const isFavorite =
    favoriteChoices.filter((item) => item.name === schedule.table?.name)
      .length > 0;

  const handleFavoriteSearch = () => {
    const favoriteSearch = {
      group: schedule.table.group,
      name: schedule.table.name,
    };

    const response = addSearchToFavorite(schedule, favoriteSearch);

    if (response) {
      dispatch(favoriteSearchActions.addSearchToFavorite(favoriteSearch));
      toast({
        title: "Добавлено!",
        description:
          "Успех! Данное расписание было добавлено в список избранных.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(
        favoriteSearchActions.removeSearchFromFavorite(favoriteSearch.name),
      );
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

  const fetchDataByWeek = async (week: number) => {
    await dispatch(
      fetchScheduleByWeek({
        week: week,
        group: schedule.table.group,
      }),
    );
    await dispatch(
      fetchVPKByWeek({
        week: week,
        vpk: {
          group: schedule.table.group,
          name: "", // should be fixed
          id: "",
        },
      }),
    );
  };

  return (
    <div className={classNames(styles.Table, {}, [className])}>
      {schedule && (
        <>
          {schedule.table?.name && (
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
});

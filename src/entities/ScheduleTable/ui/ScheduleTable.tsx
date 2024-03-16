import { useEffect } from "react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { fetchVPKByWeek } from "/src/features/SelectVPK";
import { WeeksList } from "/src/features/WeeksList/WeeksList";

import {
  IScheduleTable,
  TableCell,
  favoriteSearchActions,
  getFavoriteSearch,
  getScheduleTable,
  tableActions,
} from "/src/entities/ScheduleTable";
import { TableSkeleton } from "/src/entities/ScheduleTable/ui/TableSkeleton/TableSkeleton";

import {
  ADD_TO_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE,
} from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";

import styles from "./ScheduleTable.module.scss";

interface TableProps {
  className?: string;
  isLoading: boolean;
}

const userGroup = JSON.parse(localStorage.getItem("USER_GROUP") || "{}");

const ScheduleTable = ({ className, isLoading }: TableProps) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { week: currentWeek } = useCurrentWeek();
  const textColor = useColorModeValue("black", "white");
  const favoriteChoices = useSelector(getFavoriteSearch);
  const schedule = useSelector(getScheduleTable);
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

  const isFavorite =
    favoriteChoices.filter((item) => item.name === schedule.table?.name)
      .length > 0;

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

  const mergeVPKAndSchedule = () => {
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
  };

  const handleFavoriteSearch = (schedule: IScheduleTable) => {
    const favoriteSearch = {
      group: schedule.table.group,
      name: schedule.table.name,
    };

    const response = addSearchToFavorite(favoriteSearch);

    if (response) {
      dispatch(favoriteSearchActions.addSearchToFavorite(favoriteSearch));
      toast(ADD_TO_FAVORITE_SUCCESS);
    } else if (isFavorite) {
      dispatch(
        favoriteSearchActions.removeSearchFromFavorite(favoriteSearch.name)
      );
      toast(REMOVE_FROM_FAVORITE);
    }
  };

  if (isLoading) return <TableSkeleton />;

  if (schedule.result === "no_entries" || schedule.result === "cleared")
    return null;
  if (schedule?.result === null) return null;

  return (
    <Box className={classNames(styles.Table, {}, [className])}>
      <Box className={styles.groupActions}>
        <Heading color={textColor} className={styles.tableTitle}>
          Расписание {schedule.table.name}{" "}
          <span className={styles.week}>Неделя {schedule.table.week}</span>
        </Heading>
        <IconButton
          aria-label="Добавить в избранное"
          onClick={() => handleFavoriteSearch(schedule)}
        >
          <StarIcon color={isFavorite ? "yellow" : ""} />
        </IconButton>
      </Box>

      <WeeksList
        weeks={schedule.weeks}
        week={schedule.table.week}
        group={schedule.table.group}
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
            {schedule.table.table.slice(2).map((row, rowIndex) => {
              return (
                <Tr key={rowIndex}>
                  {row.map((element, index) => {
                    return (
                      <TableCell
                        key={index}
                        colorMode={colorMode}
                        element={element}
                        indexOfCell={index}
                        indexOfRow={rowIndex}
                        tableHead={schedule.table.table.slice(1, 2)[0].slice(1)}
                      />
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScheduleTable;

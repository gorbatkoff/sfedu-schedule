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
import TableCell from "/src/entities/ScheduleTable/ui/TableCell/TableCell";

import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { StarIcon } from "@chakra-ui/icons";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";

import { useSelector } from "react-redux";
import { getScheduleTable } from "/src/entities/ScheduleTable/model/selectors/getSchedule";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import {
  fetchScheduleByWeek,
  tableActions,
} from "/src/entities/ScheduleTable/model/slice/tableSlice";
import { favoriteSearchActions } from "/src/entities/ScheduleTable/model/slice/favoriteSearchSlice";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { fetchVPKByWeek } from "/src/features/SelectVPK/model/slice/selectVPKSlice";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/Table";

import styles from "./ScheduleTable.module.scss";

import {
  ADD_TO_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE,
} from "/src/shared/const/toast/toast";

interface TableProps {
  className?: string;
}

export interface IFavoriteChoice {
  group: string;
  name: string;
}

const ScheduleTable = memo(({ className }: TableProps) => {
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
    if (vpkData) {
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

  const isFavorite =
    favoriteChoices.filter((item) => item.name === schedule.table?.name)
      .length > 0;

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
        favoriteSearchActions.removeSearchFromFavorite(favoriteSearch.name),
      );
      toast(REMOVE_FROM_FAVORITE);
    }
  };

  if (schedule.result === "no_entries") return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userVPK = useSelector((state: StateSchema) => state.selectVPK.VPK);

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
          group: userVPK.group,
          name: "", // should be fixed
          id: "",
        },
      }),
    );
  };

  console.log(schedule?.result === null);

  if (!schedule?.table?.name || schedule?.result === null) return null;

  return (
    <div className={classNames(styles.Table, {}, [className])}>
      <div className={styles.groupActions}>
        <div className={styles.groupActionsFirst}>
          <Heading color="white" className={styles.tableTitle}>
            Расписание {schedule.table.name}{" "}
            <span className={styles.week}>Неделя {schedule.table.week}</span>
          </Heading>
        </div>
        <IconButton
          aria-label="Добавить в избранное"
          onClick={() => handleFavoriteSearch(schedule)}
        >
          <StarIcon color={isFavorite ? "yellow" : ""} />
        </IconButton>
      </div>
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
    </div>
  );
});

export default ScheduleTable;

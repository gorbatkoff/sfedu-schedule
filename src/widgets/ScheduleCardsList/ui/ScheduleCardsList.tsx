import { FC, memo, useEffect, useState } from "react";

import {
  Button,
  Heading,
  IconButton,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import classNames from "classnames";

import { ScheduleCard } from "/src/entities/ScheduleCard";
import { weekDays } from "/src/shared/const";

import styles from "./ScheduleCardsList.module.scss";
import Carousel from "/src/features/Carousel/Carousel";
import { StarIcon } from "@chakra-ui/icons";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";
import { USER_FAVORITE_SEARCH } from "/src/shared/const/localStorageKeys";
import { useSelector } from "react-redux";
import { getScheduleTable } from "/src/entities/ScheduleTable/model/selectors/getSchedule";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { favoriteSearchActions } from "/src/entities/ScheduleTable/model/slice/favoriteSearchSlice";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/Table";
import { IFavoriteChoice } from "/src/entities/ScheduleTable/ui/ScheduleTable";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { fetchVPKByWeek } from "/src/features/SelectVPK/model/slice/selectVPKSlice";
import { tableActions } from "/src/entities/ScheduleTable/model/slice/tableSlice";

interface TableProps {
  className?: string;
}

const favoriteChoices = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]",
);

const ScheduleCardsList: FC<TableProps> = memo(({ className }) => {
  const [day, setDay] = useState<number>(0);
  const toast = useToast();
  const { week } = useCurrentWeek();
  const schedule = useSelector(getScheduleTable);
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vpkInfo.group) {
      dispatch(fetchVPKByWeek({ week: week, vpk: vpkInfo }));
    }

    const currentDay = new Date().getDay();
    0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(0);
  }, []);

  useEffect(() => {
    if (vpkData) {
      mergeVPKAndSchedule();
    }
  }, [vpkData]);

  const { colorMode } = useColorMode();

  const dayHandler = (index: number) => {
    setDay(index);
  };

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
    favoriteChoices.filter(
      (item: IFavoriteChoice) => item.name === schedule.table?.name,
    ).length > 0;

  const handleFavoriteSearch = (schedule: IScheduleTable) => {
    const favoriteSearch = {
      group: schedule.table.group,
      name: schedule.table.name,
    };

    const response = addSearchToFavorite(favoriteSearch);

    if (response) {
      dispatch(favoriteSearchActions.addSearchToFavorite(favoriteSearch));
      toast({
        title: "Добавлено! ",
        description:
          "Успех! Данное расписание было добавлено в список избранных.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (isFavorite) {
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

  if (schedule.result === "no_entries") return;
  if (schedule.table.table.length == 0) return null;

  return (
    <div className={classNames("", {}, [className])}>
      <div className={styles.groupActions}>
        <div className={styles.groupActionsFirst}>
          <Heading
            color={colorMode === "dark" ? "white" : "var(--secondary-color)"}
            className={styles.tableTitle}
            size="md"
          >
            Расписание {schedule.table.name}
          </Heading>
        </div>
        <IconButton
          size="sm"
          aria-label="Добавить в избранное"
          onClick={() => handleFavoriteSearch(schedule)}
        >
          <StarIcon color={isFavorite ? "yellow" : ""} />
        </IconButton>
      </div>

      <Carousel
        carouselItems={schedule.weeks}
        week={schedule.table.week}
        group={schedule.table.group}
      />

      <div className={classNames(styles.weekDayBtns)}>
        {weekDays.map((dayItem, index) => {
          return (
            <Button
              key={index}
              onClick={() => dayHandler(index)}
              isDisabled={day === index}
              colorScheme={day === index ? "green" : "gray"}
            >
              {dayItem}
            </Button>
          );
        })}
      </div>

      <div className={classNames(styles.ScheduleCardList)}>
        {schedule.table.table.slice(2)[day] &&
          schedule.table.table
            .slice(2)
            // eslint-disable-next-line no-unexpected-multiline
            [day].slice(1)
            .map((item: string, index: number) => {
              const weekDay = schedule.table.table.slice(2)[day][0];

              return (
                <ScheduleCard
                  lessonTime={schedule.table.table[1][index + 1]}
                  lessonNumber={index + 1}
                  day={weekDay}
                  key={index}
                  element={item}
                  className={colorMode === "light" ? styles.whiteMode : ""}
                />
              );
            })}
      </div>
    </div>
  );
});

export default ScheduleCardsList;

import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { fetchVPKByWeek } from "/src/features/SelectVPK";
import { WeeksList } from "/src/features/WeeksList/WeeksList";

import { ScheduleCard } from "/src/entities/ScheduleCard";
import {
  IFavoriteChoice,
  IScheduleTable,
  favoriteSearchActions,
  getScheduleTable,
  tableActions,
} from "/src/entities/ScheduleTable";

import { weekDays } from "/src/shared/const/global/const";
import { USER_FAVORITE_SEARCH } from "/src/shared/const/localStorage/localStorageKeys";
import {
  ADD_TO_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE,
} from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";
import { randomInteger } from "/src/shared/lib/randomInteger";

import styles from "./ScheduleCardsList.module.scss";
import { ScheduleCardsListSkeleton } from "./ScheduleCardsListSkeleton/ScheduleCardsListSkeleton";

interface TableProps {
  isLoading?: boolean;
}

const favoriteChoices = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]"
) as IFavoriteChoice[];

const ScheduleCardsList: FC<TableProps> = memo(({ isLoading }) => {
  const [day, setDay] = useState(0);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const { week } = useCurrentWeek();
  const { colorMode } = useColorMode();

  const schedule = useSelector(getScheduleTable);
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);
  const isShowEmptyLessons = useSelector(
    (state: StateSchema) => state.userGroup.userSettings.isShowEmptyLessons
  );

  const defaultFavorite = useMemo(
    () =>
      favoriteChoices.some(
        (choice: IFavoriteChoice) => choice.group === schedule?.table?.group
      ),
    [schedule?.table?.group]
  );

  const [isFavorite, setFavorite] = useState(defaultFavorite);

  useEffect(() => {
    if (vpkInfo.group) {
      dispatch(fetchVPKByWeek({ week: week, vpk: vpkInfo }));
    }

    const currentDay = new Date().getDay();
    0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(5);
  }, []);

  useEffect(() => {
    if (schedule?.result !== null) {
      setFavorite(
        favoriteChoices.some(
          (choice: IFavoriteChoice) => choice.group === schedule?.table?.group
        )
      );
    }
  }, [schedule]);

  useEffect(() => {
    if (vpkData) {
      mergeVPKAndSchedule();
    }
  }, [vpkData]);

  const dayHandler = (index: number) => {
    if (day !== index) {
      setDay(index);
    }
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

  const handleFavoriteSearch = useCallback(
    (schedule: IScheduleTable) => {
      const favoriteSearch = {
        group: schedule.table.group,
        name: schedule.table.name,
      };

      const response = addSearchToFavorite(favoriteSearch);

      if (response) {
        dispatch(favoriteSearchActions.addSearchToFavorite(favoriteSearch));
        toast(ADD_TO_FAVORITE_SUCCESS);
        setFavorite(true);
      } else {
        dispatch(
          favoriteSearchActions.removeSearchFromFavorite(favoriteSearch.name)
        );
        toast(REMOVE_FROM_FAVORITE);
        setFavorite(false);
      }
    },
    [dispatch, toast]
  );

  const lessons = useMemo(
    () =>
      schedule.table.table.slice(2)[day] &&
      schedule.table.table.slice(2)[day].slice(1),
    [day, schedule.table.table]
  );

  const generateRandomImage = useCallback(() => {
    const randomNumber = randomInteger(1, 3);
    console.log("randomNumber :>>", randomNumber);
    return `/src/shared/assets/Relax${randomNumber}.svg`;
  }, []);

  if (isLoading) return <ScheduleCardsListSkeleton />;
  if (schedule.result === "no_entries") return;
  if (schedule.table.table.length == 0) return;

  return (
    <div className={styles.wrapper}>
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

      <WeeksList
        weeks={schedule.weeks}
        week={schedule.table.week}
        group={schedule.table.group}
        isMobileDevice={true}
      />

      <div className={styles.weekDayBtns}>
        {weekDays.map((dayItem, index) => {
          return (
            <Button
              key={index}
              onClick={() => dayHandler(index)}
              colorScheme={day === index ? "green" : "gray"}
              className={styles.weekDayButton}
            >
              {dayItem}
            </Button>
          );
        })}
      </div>

      <div className={classNames(styles.ScheduleCardList)}>
        {lessons.map((item: string, index: number) => {
          const weekDay = schedule.table.table.slice(2)[day][0];

          if (!isShowEmptyLessons && item === "") return null;

          return (
            <ScheduleCard
              lessonTime={schedule.table.table[1][index + 1]}
              lessonNumber={index + 1}
              day={weekDay}
              key={index}
              element={item}
              className={classNames(
                colorMode === "light" ? styles.whiteMode : styles.darkMode,
                item === "" && styles.emptyLesson
              )}
            />
          );
        })}
        {!isShowEmptyLessons && lessons.every((l) => l === "") && (
          <img src={generateRandomImage()} className={styles.relaxLogo} />
        )}
      </div>
    </div>
  );
});

export default ScheduleCardsList;

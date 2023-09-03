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
import { getScheduleTable } from "/src/entities/Table/model/selectors/getSchedule";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

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

  const [isFavorite, setFavorite] = useState(
    favoriteChoices.includes(schedule.table?.name),
  );

  useEffect(() => {
    const currentDay = new Date().getDay();

    console.log("currentWeek", week);
    console.log("currentDay", currentDay);

    0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(0);
  }, []);

  const { colorMode } = useColorMode();

  const dayHandler = (index: number) => {
    setDay(index);
  };

  const handleFavoriteSearch = () => {
    const favoriteSearch = {
      group: schedule.table.group,
      name: schedule.table.name,
    };

    const response = addSearchToFavorite(schedule, favoriteSearch);

    if (response) {
      setFavorite(true);
      toast({
        title: "Добавлено!",
        description:
          "Успех! Данное расписание было добавлено в список избранных.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setFavorite(false);
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
          onClick={handleFavoriteSearch}
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

import { FC, memo, useEffect, useState } from "react";

import {
  Button,
  Heading,
  IconButton,
  Stack,
  Table,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import classNames from "classnames";

import { IScheduleTable } from "/src/entities/ScheduleTable";
import { ScheduleCard } from "/src/entities/ScheduleCard";
import { weekDays } from "/src/shared/const";

import styles from "./ScheduleCardsList.module.scss";
import Carousel from "/src/features/Carousel/Carousel";
import { $api } from "/src/shared/api/api";
import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import { StarIcon } from "@chakra-ui/icons";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";
import { USER_FAVORITE_SEARCH } from "/src/shared/const/localStorageKeys";

interface TableProps {
  className?: string;
  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;
}

const favoriteChoices = JSON.parse(
  localStorage.getItem(USER_FAVORITE_SEARCH) || "[]",
);

const ScheduleCardsList: FC<TableProps> = memo(
  ({ className, schedule, updateData }) => {
    const [day, setDay] = useState<number>(0);
    const toast = useToast();
    const [isFavorite, setFavorite] = useState(
      favoriteChoices.includes(schedule.table?.name),
    );

    useEffect(() => {
      const currentDay = new Date().getDay();
      0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(0);
    }, []);

    const { colorMode } = useColorMode();

    const dayHandler = (index: number) => {
      setDay(index);
    };

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
          fetchDataByWeek={fetchDataByWeek}
          week={schedule.table.week}
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
              [day].slice(2)
              .map((item: string, index) => {
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
  },
);

export default ScheduleCardsList;

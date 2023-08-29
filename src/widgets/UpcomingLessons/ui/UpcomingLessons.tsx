import { FC, memo, useEffect, useState } from "react";

import { useColorMode } from "@chakra-ui/react";
import classNames from "classnames";
import { ScheduleCard } from "/src/entities/ScheduleCard";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./UpcomingLessons.module.scss";
import { $api } from "/src/shared/api/api";

import { lessonsTime } from "/src/shared/const";
import { ScheduleCardVisual } from "/src/entities/ScheduleCard/ui/ScheduleCardVisual";
import { SAVED_SCHEDULE, USER_GROUP } from "/src/shared/const/localStorageKeys";

interface TableProps {
  className?: string;
}

const isUserOnline = navigator.onLine;
const scheduleFromLocalStorage = JSON.parse(
  localStorage.getItem(SAVED_SCHEDULE) || "{}",
);

export const UpcomingLessons: FC<TableProps> = memo(({ className }) => {
  const { week } = useCurrentWeek();
  const [day, setDay] = useState<number>(0);

  const [currentSchedule, setCurrentSchedule] = useState<any[]>([]);

  const group = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = +currentTime.getHours();
  const currentMinute = +currentTime.getMinutes();

  let currentLesson = 0;

  const { colorMode } = useColorMode();

  lessonsTime.forEach((lessonTime, i) => {
    const [lessonHour, lessonMinute] = lessonTime
      .split(":")
      .map((item) => +item);
    if (
      currentHour > lessonHour ||
      (currentHour === lessonHour && currentMinute >= lessonMinute)
    ) {
      currentLesson = i;
    }
  });

  useEffect(() => {
    if (isUserOnline) {
      fetchData();
    } else if (Object.keys(scheduleFromLocalStorage).length !== 0) {
      setCurrentSchedule(scheduleFromLocalStorage.table.table);
    }
    0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(0);
  }, []);

  async function fetchData() {
    try {
      console.log("group.groupId", group.groupId);

      if (!group.groupId) return;

      const request = await $api.get("/", {
        params: {
          group: group.groupId,
          week,
        },
      });

      console.log(request.data);
      setCurrentSchedule(request.data.table.table);
    } catch (error) {
      console.log(error);
    }
  }

  if (currentSchedule.length == 0 || group.groupId === undefined) {
    return (
      <div className={classNames(styles.UpcomingLessonsList)}>
        <ScheduleCardVisual />
        <ScheduleCardVisual />
      </div>
    );
  }

  return (
    <div className={classNames(styles.UpcomingLessonsList, {}, [className])}>
      {currentSchedule
        .slice(2)
        // eslint-disable-next-line no-unexpected-multiline
        [day].slice(1)
        .slice(currentLesson, currentLesson + 2)
        .map((item: string, index: number) => {
          return (
            <ScheduleCard
              lessonTime={currentSchedule[1][currentLesson + index + 1]}
              lessonNumber={currentLesson + index + 1}
              day={currentSchedule.slice(2)[day][0]}
              key={index}
              element={item}
              className={String([
                colorMode === "light" ? styles.whiteMode : "",
                index === 0 ? styles.currentLesson : "",
              ])}
            />
          );
        })}
    </div>
  );
});

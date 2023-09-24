import { useEffect, useState } from "react";

import { ScheduleCard } from "/src/entities/ScheduleCard";
import { Skeleton, Stack, useColorMode } from "@chakra-ui/react";

import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { lessonsTime } from "/src/shared/const/global/const";
import { USER_GROUP } from "/src/shared/const/localStorage/localStorageKeys";

import { useFetchUpcomingLessonsQuery } from "../api";

import styles from "./UpcomingLessons.module.scss";

const UpcomingLessons = () => {
  const { week } = useCurrentWeek();
  const { colorMode } = useColorMode();

  const [day, setDay] = useState<number>(0);

  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = +currentTime.getHours();
  const currentMinute = +currentTime.getMinutes();

  let currentLesson = 0;

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
    if (currentDay > 0 && currentDay < 7) {
      setDay(currentDay - 1);
    } else {
      setDay(5);
    }
  }, []);

  const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");

  if (!userGroup.groupId) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, status } = useFetchUpcomingLessonsQuery({
    group: userGroup.groupId,
    week: week,
  });

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="150px" width="100%" borderRadius={10} />
        <Skeleton height="150px" width="100%" borderRadius={10} />
      </Stack>
    );
  }

  if (status === "rejected") return null;

  return (
    <div className={styles.UpcomingLessonsList}>
      {data.table.table
        .slice(2)
        // eslint-disable-next-line no-unexpected-multiline
        [day].slice(1)
        .slice(currentLesson, currentLesson + 2)
        .map((item: string, index: number) => {
          return (
            <ScheduleCard
              lessonTime={data.table.table[1][currentLesson + index + 1]}
              lessonNumber={currentLesson + index + 1}
              day={data.table.table.slice(2)[day][0]}
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
};

export default UpcomingLessons;

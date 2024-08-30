import { useEffect, useMemo, useState } from "react";

import { Skeleton, Stack, useColorMode } from "@chakra-ui/react";
import classNames from "classnames";

import { ScheduleCard } from "/src/entities/ScheduleCard";

import { lessonsTime } from "/src/shared/const/global/const";
import { USER_GROUP } from "/src/shared/const/localStorage/localStorageKeys";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import { useFetchUpcomingLessonsQuery } from "../api";
import styles from "./UpcomingLessons.module.scss";

const currentTime = new Date();
const currentDay = currentTime.getDay();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();

const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) ?? "{}");

const UpcomingLessons = () => {
  const { week } = useCurrentWeek();
  const { colorMode } = useColorMode();
  const [day, setDay] = useState(0);

  const currentLesson = useMemo(() => {
    let lesson = 0;

    lessonsTime.forEach((lessonTime, i) => {
      const [lessonHour, lessonMinute] = lessonTime
        .split(":")
        .map((item) => +item);
      if (
        currentHour > lessonHour ||
        (currentHour === lessonHour && currentMinute >= lessonMinute)
      ) {
        lesson = i;
      }
    });

    return lesson;
  }, []);

  useEffect(() => {
    if (currentDay > 0 && currentDay < 7) {
      setDay(currentDay - 1);
    } else {
      setDay(5);
    }
  }, []);

  if (!userGroup?.groupId || +currentHour >= 21) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, status } = useFetchUpcomingLessonsQuery({
    group: userGroup?.groupId,
    week: week,
  });

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="152.225px" width="100%" borderRadius={10} />
        {+currentHour < 18 && (
          <Skeleton height="152.225px" width="100%" borderRadius={10} />
        )}
      </Stack>
    );
  }

  if (status === "rejected" || !data?.table?.group) return null;

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
              lessonTime={data.table.table[1]?.[currentLesson + index + 1]}
              lessonNumber={currentLesson + index + 1}
              day={data.table.table.slice(2)?.[day]?.[0]}
              key={index}
              element={item}
              className={classNames({
                [styles.whiteMode]: colorMode === "light",
                [styles.currentLesson]: index === 0,
              })}
            />
          );
        })}
    </div>
  );
};

export default UpcomingLessons;

import { FC, memo, useEffect, useState } from "react";

import { Button, Table, useColorMode } from "@chakra-ui/react";
import classNames from "classnames";

import { IScheduleTable } from "/src/entities/ScheduleTable";
import { ScheduleCard } from "/src/entities/ScheduleCard";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./UpcomingLessons.module.scss";
import { $api } from "/src/shared/api/api";
import { cardTitle, lessonsTime } from "/src/shared/const";

interface TableProps {
  className?: string;
  updateData: (data: IScheduleTable) => void;
}

export const UpcomingLessons: FC<TableProps> = memo(
  ({ className, updateData }) => {
    const { week } = useCurrentWeek();
    const [day, setDay] = useState<number>(0);
    const [currentSchedule, setCurrentSchedule] = useState<any[]>([]);

    const group = JSON.parse(
      JSON.stringify(localStorage.getItem("USER_GROUP"))
    );

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
      fetchData();
      0 < currentDay && currentDay < 7 ? setDay(currentDay - 1) : setDay(0);
    }, []);

    const { colorMode } = useColorMode();

    async function fetchData() {
      try {
        const request = await $api.get("/", {
          params: {
            group: JSON.parse(group).groupId,
            week,
          },
        });

        setCurrentSchedule(request.data.table.table);
      } catch (error) {
        console.log(error);
      }
    }

    if (!currentSchedule) return;
    if (currentSchedule.length == 0) return null;

    return (
      <div className={classNames("", {}, [className])}>
        <div className={classNames(styles.UpcomingLessonsList)}>
          {currentSchedule &&
            currentSchedule
              .slice(2)
              [day].slice(currentLesson, currentLesson + 2)
              .map((item: string, index: number) => {
                return (
                  <ScheduleCard
                    lessonTime={`${
                      currentSchedule[1][currentLesson + index + 1]
                    }`}
                    index={currentLesson + index + 1}
                    day={cardTitle[index]}
                    key={index}
                    element={item}
                    className={colorMode === "light" ? styles.whiteMode : ""}
                  />
                );
              })}
        </div>
      </div>
    );
  }
);

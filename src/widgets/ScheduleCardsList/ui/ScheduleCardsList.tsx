import { FC, memo, useEffect, useState } from "react";

import { Button, Table, useColorMode } from "@chakra-ui/react";
import classNames from "classnames";

import { IScheduleTable } from "/src/entities/ScheduleTable";
import { ScheduleCard } from "/src/entities/ScheduleCard";
import { weekDays } from "/src/shared/const";

import styles from "./ScheduleCardsList.module.scss";
import Carousel from "/src/features/Carousel/Carousel";
import { $api } from "/src/shared/api/api";

interface TableProps {
  className?: string;
  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;
}

const ScheduleCardsList: FC<TableProps> = memo(
  ({ className, schedule, updateData }) => {
    const [day, setDay] = useState<number>(0);

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
    if (schedule.result === "no_entries") return;
    if (schedule.table.table.length == 0) return null;
    return (
      <div className={classNames("", {}, [className])}>
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
  }
);

export default ScheduleCardsList;

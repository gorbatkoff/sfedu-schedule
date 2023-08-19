import { FC, memo, useState } from "react";

import { Button } from "@chakra-ui/react";
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

export const ScheduleCardsList: FC<TableProps> = memo(
  ({ className, schedule, updateData}) => {
    const [day, setDay] = useState<number>(0);

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

    return (
      <div className={classNames("", {}, [className])}>
        <Carousel carouselItems={schedule.weeks} fetchDataByWeek={fetchDataByWeek}/>
        <div>
          {weekDays.map((day, index) => {
            return (
              <Button key={index} onClick={() => dayHandler(index)}>
                {day}
              </Button>
            );
          })}
        </div>
        {schedule && (
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
                      index={index + 1}
                      day={weekDay}
                      key={index}
                      element={item}
                    />
                  );
                })}
          </div>
        )}
      </div>
    );
  },
);

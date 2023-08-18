import { FC, memo, useState } from "react";

import { Button } from "@chakra-ui/react";
import classNames from "classnames";

import { IScheduleTable } from "/src/entities/ScheduleTable";
import { ScheduleCard } from "/src/entities/ScheduleCard";

const weekDays = ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"];

interface TableProps {
  className?: string;
  dayIndex?: number;
  schedule: IScheduleTable;
}

export const ScheduleCardsList: FC<TableProps> = memo(
  ({ className, dayIndex = 1, schedule }) => {
    const [day, setDay] = useState<number>(0);

    const dayHandler = (index: number) => {
      setDay(index);
    };

    return (
      <div className={classNames("", {}, [className])}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            {schedule.table.table.slice(2)[day] &&
              schedule.table.table
                .slice(2)
                // eslint-disable-next-line no-unexpected-multiline
                [day].slice(2)
                .map((item: string, index) => {
                  const weekDay = schedule.table.table.slice(2)[day][0];

                  console.log(item);

                  return (
                    <ScheduleCard
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

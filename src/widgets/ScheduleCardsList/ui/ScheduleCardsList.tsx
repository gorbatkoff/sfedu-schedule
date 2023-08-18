import React, { memo, useState } from "react";

import classNames from "classnames";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";
import ScheduleCard from "/src/entities/ScheduleCard/ui/ScheduleCard";
import { Button } from "@chakra-ui/react";

const weekDays = ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"];

interface TableProps {
  className?: string;
  dayIndex?: number;
  schedule?: any;
}

export const ScheduleCardsList = memo(
  ({ className, dayIndex = 1, schedule }: TableProps) => {
    const [day, setDay] = useState<number>(0)

    const dayHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  
      const button: HTMLButtonElement = event.currentTarget;
      setDay(Number(button.name))
    };
    
    return (
      <div className={classNames("", {}, [className])}> 
        {weekDays.map((day, index) => {
          return <Button key={index} onClick={dayHandler} name={String(index)}>{day}</Button>;
        })}
        {schedule && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            {
              schedule.table.table.slice(2)[day] && schedule.table.table.slice(2)[day].slice(2).map((item: any, index: number) => {
              return (
                <ScheduleCard
                  index={index + 1}
                  day={schedule.table.table.slice(2)[day][0]}
                  key={index}
                  element={item}
                />
              );
            
          })
        }
          </div>
        )}
      </div>
    );
  }
);

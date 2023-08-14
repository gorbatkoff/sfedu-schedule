import React, { memo } from "react";

import classNames from "classnames";
import ScheduleCard from "/src/entities/ScheduleCard/ui/ScheduleCard";

interface TableProps {
  className?: string;
  schedule?: any;
}

export const ScheduleCardsList = memo(({ className }: TableProps) => {
  return (
    <div className={classNames("", {}, [className])}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "20px",
        }}
      >
        <ScheduleCard
          index={1}
          day={"Пнд,24  апреля"}
          element={"экз.Военная подготовка ВУЦ3 ИКТИБ Г-245"}
        />
        <ScheduleCard
          index={1}
          day={"Пнд,24  апреля"}
          element={
            "лек.Концепции современного естествознания 1 п/г Куповых Г. В. Г-211 2 п/г Куповых Г. В. LMS-1"
          }
        />
        <ScheduleCard
          index={2}
          day={"Пнд,24  апреля"}
          element={
            "пр.Верификация, качество и автоматизированное тестирование программного обеспечения Проскуряков А. В. Г-423"
          }
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={
            "Databases and DBMS (Базы данных и СУБД) Кучеров С. А. Д-211"
          }
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={
            "Введение в инженерную деятельность 1 п/г Беликов А. Н. LMS-1 2 п/г Ищукова Е. А.  3 п/г Козловский А. В.  4 п/г Компаниец В. С.  5 п/г Кучеров С. А.  6 п/г Лапшин В. С.  7 п/г Лихтин С. С.  8 п/г Механцев Б. Е.  9 п/г Мушенко А. С."
          }
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={
            "лек.Инженерия ПО для систем реального времени и Интернета вещей Шкурко А. Н. LMS"
          }
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={"пр.Иностранный язык Иностранный язык LMS"}
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={"пр.Дисциплины ВПК Вакансия ИКТИБ +"}
        />
        <ScheduleCard
          index={3}
          day={"Пнд,24  апреля"}
          element={
            "пр.Психология креативности, одаренности и гениальности Кибальченко И. А. LMS-1"
          }
        />
      </div>
    </div>
  );
});

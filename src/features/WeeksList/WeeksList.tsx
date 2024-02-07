import { FC, memo, useEffect, useRef } from "react";

import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/Providers";

import { fetchVPKByWeek } from "/src/features/SelectVPK";

import {
  fetchScheduleByWeek,
  getSchedule,
  tableActions,
} from "/src/entities/ScheduleTable";

import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./WeeksList.module.scss";

interface WeeksListProps {
  weeks: number[];
  group: string;
  week: number;
}

export const WeeksList: FC<WeeksListProps> = memo(({ weeks, group, week }) => {
  const myRef = useRef<HTMLButtonElement | null>(null);
  const { week: currentWeek } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const schedule = useSelector(getSchedule);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

  useEffect(() => {
    if (vpkInfo.group) {
      dispatch(fetchVPKByWeek({ week: currentWeek, vpk: vpkInfo }));
    }
  }, []);

  const executeScroll = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const fetchDataByWeek = async (week: number, propWeek: number) => {
    if (week === propWeek) return;

    await dispatch(fetchScheduleByWeek({ week, group }));

    if (vpkInfo.group) {
      await dispatch(fetchVPKByWeek({ week: currentWeek, vpk: vpkInfo }));
    }

    dispatch(tableActions.updateScheduleByNewVPKData(schedule));
  };

  useEffect(() => {
    setTimeout(() => executeScroll(), 500);
  }, []);

  console.log(currentWeek);

  return (
    <div className={styles.WeeksList}>
      {weeks.map((item, index) => {
        console.log("week", week, "item", item);
        return (
          <Button
            key={index}
            className={styles.weekButton}
            ref={week === item ? myRef : null}
            onClick={() => fetchDataByWeek(item, week)}
            isDisabled={week === item}
            opacity={item < currentWeek ? "0.5" : "1"}
            colorScheme={item === week ? "green" : "twitter"}
            backgroundColor={item === currentWeek ? "#3be7cb" : ""}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
});

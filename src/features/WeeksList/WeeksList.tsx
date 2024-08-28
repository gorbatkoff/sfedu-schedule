import { FC, memo, useCallback, useEffect, useRef } from "react";

import { Badge, Button, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { fetchVPKByWeek } from "/src/features/SelectVPK";

import {
  fetchScheduleByWeek,
  getSchedule,
  tableActions,
} from "/src/entities/ScheduleTable";

import { SCHEDULE_REQUEST_ERROR } from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./WeeksList.module.scss";

interface WeeksListProps {
  weeks: number[];
  group: string;
  week: number;
  isMobileDevice: boolean;
}

export const WeeksList: FC<WeeksListProps> = memo(
  ({ weeks, group, week, isMobileDevice }) => {
    const myRef = useRef<HTMLButtonElement | null>(null);
    const { week: currentWeek } = useCurrentWeek();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const schedule = useSelector(getSchedule);
    const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

    useEffect(() => {
      if (vpkInfo.group) {
        dispatch(fetchVPKByWeek({ week: currentWeek, vpk: vpkInfo }));
      }
    }, []);

    const executeScroll = useCallback(() => {
      if (myRef.current !== null) {
        myRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, []);

    const fetchDataByWeek = useCallback(
      async (week: number, propWeek: number) => {
        if (week === propWeek) return;

        const response = await dispatch(fetchScheduleByWeek({ week, group }));

        if (vpkInfo.group) {
          await dispatch(fetchVPKByWeek({ week, vpk: vpkInfo }));
        }

        dispatch(tableActions.updateScheduleByNewVPKData(schedule));

        //@ts-ignore
        if (response.error.message === "Rejected") {
          toast(SCHEDULE_REQUEST_ERROR);
        }
      },
      [dispatch, group, schedule, toast, vpkInfo]
    );

    useEffect(() => {
      setTimeout(() => executeScroll(), 500);
    }, [executeScroll]);

    return (
      <div className={styles.WeeksListWrapper}>
        {isMobileDevice && (
          <Badge
            fontSize="1em"
            colorScheme="green"
            sx={{
              textTransform: "capitalize",
              padding: "0.5em",
              borderRadius: "7px",
            }}
          >
            Неделя:
          </Badge>
        )}
        <div
          className={styles.WeeksList}
          style={{ marginLeft: isMobileDevice ? "10px" : "" }}
        >
          {weeks.map((item, index) => {
            return (
              <Button
                key={index}
                className={styles.weekButton}
                ref={week === item ? myRef : null}
                onClick={() => fetchDataByWeek(item, week)}
                opacity={item < currentWeek ? "0.5" : "1"}
                colorScheme={item === week ? "green" : "gray"}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
);

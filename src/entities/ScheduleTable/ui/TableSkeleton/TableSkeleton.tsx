import { useMemo } from "react";

import { Box, Skeleton } from "@chakra-ui/react";

import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "../ScheduleTable.module.scss";

export const TableSkeleton = () => {
  const { week } = useCurrentWeek();

  const countOfVisibleWeeks = week > 20 ? 23 : week + 2;

  const arrayOfVisibleWeeks = useMemo(
    () => new Array(countOfVisibleWeeks).fill(0),
    [countOfVisibleWeeks]
  );

  return (
    <Box className={styles.Table}>
      <Box className={styles.groupActions}>
        <Skeleton height={43} width={530} borderRadius={7} />
        <Skeleton height={38} width={38} borderRadius={7} />
      </Box>

      <Box className={styles.weeksList}>
        {arrayOfVisibleWeeks.map((_: any, index: number) => {
          return (
            <Skeleton key={index} height={38} width={38} borderRadius={7} />
          );
        })}
      </Box>

      <Box className={styles.skeletonTable}>
        <Skeleton width={"100%"} height={914.4} />
      </Box>
    </Box>
  );
};

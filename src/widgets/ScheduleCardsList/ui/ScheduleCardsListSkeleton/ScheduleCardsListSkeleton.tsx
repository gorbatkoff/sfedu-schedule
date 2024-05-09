import { Skeleton } from "@chakra-ui/react";
import classNames from "classnames";

import styles from "../ScheduleCardsList.module.scss";

export const ScheduleCardsListSkeleton = () => {
  return (
    <div className={styles.wrapper} style={{ marginTop: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Skeleton width="200px" height="24px" />
        <Skeleton width="32px" height="32px" borderRadius="6px" />
      </div>

      <div className={styles.weekDayBtns}>
        {[1, 2, 3, 4, 5, 6].map((_, index) => {
          return (
            <Skeleton
              width={index === 0 ? "80px" : "40px"}
              height="40px"
              key={index}
              borderRadius="8px"
            />
          );
        })}
      </div>

      <div className={styles.weekDayBtns}>
        {[1, 2, 3, 4, 5, 6].map((dayItem, index) => {
          return (
            <Skeleton
              width="47px"
              height="40px"
              key={index}
              borderRadius="6px"
            />
          );
        })}
      </div>

      <div className={classNames(styles.ScheduleCardList)}>
        {[1, 2, 3, 4, 5].map((item: number, index: number) => {
          return (
            <Skeleton
              width="100%"
              height="153px"
              borderRadius="10px 10px 0 0"
            />
          );
        })}
      </div>
    </div>
  );
};

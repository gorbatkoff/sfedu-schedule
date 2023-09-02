import { memo } from "react";
import classNames from "classnames";

import styles from "./ScheduleCard.module.scss";

interface ScheduleCardVisualProps {
  className?: string;
}

export const ScheduleCardVisual = memo(
  ({ className }: ScheduleCardVisualProps) => {
    return (
      <button
        className={classNames(styles.ScheduleCard, {}, [
          className,
          styles.ScheduleCardVisual,
        ])}
      >
        + Нажмите, чтобы выбрать свою группу
      </button>
    );
  },
);

import classNames from "classnames";

import { TimeIcon } from "@chakra-ui/icons";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";
import {
  auditoryLMSRegex,
  subgroupRegex,
  groupRegex,
} from "/src/shared/regex/index";

import styles from "./ScheduleCard.module.scss";

interface ScheduleCardProps {
  index: number;
  lessonTime: string;
  day: string;
  element: string;
}

export const ScheduleCard = (props: ScheduleCardProps) => {
  const { index, lessonTime, day, element } = props;

  const groups =
    element.match(groupRegex) || element.match(subgroupRegex) || [];
  const subject = element
    .split(subgroupRegex)[0]
    .replace(groups.join(","), "")
    .split(auditoryLMSRegex)[0];
  const auditory = element.match(auditoryLMSRegex) || [""];

  return (
    <div className={classNames(styles.ScheduleCard)}>
      <div className={styles.cardHeader}>
        <span>{day.split(",").join(", ")}</span>
        <span>{index}-ая пара</span>
      </div>
      <div className={styles.cardContent}>
        <h3>{subject}</h3>
        {groups.map((item, index) => {
          return (
            <p className={styles.subgroup}>
              {item}
              {auditory[index] == undefined
                ? " — Не указано"
                : " — " + auditory[index]}
            </p>
          );
        })}
      </div>

      <div className={styles.cardFooter}>
        <div>
          <TimeIcon boxSize={6} className={styles.icon} />
          {lessonTime}
        </div>
        <div
          style={{
            borderLeft: `${getInfoAboutElement(element)} 4px solid`,
            paddingLeft: "5px",
          }}
        >
          {auditory[0]}
        </div>
      </div>
    </div>
  );
};

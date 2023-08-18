import classNames from "classnames";
import { TimeIcon } from "@chakra-ui/icons";
import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

import styles from "./ScheduleCard.module.scss";

interface ScheduleCardProps {
  index: number;
  day: string;
  element: string;
}

const lessonsTime = [
  "Время",
  "08:00-09:35",
  "09:50-11:25",
  "11:55-13:30",
  "13:45-15:20",
  "15:50-17:25",
  "17:40-19:15",
  "19:30-21:05",
];

const auditoryRegex = /[А-К]-\d{3}|\w{3}{|-\d+}/g;
const subgroupRegex =
  /([А-Яа-я]+ .\. .\.|\d+ п\/г * [А-Яа-я]+ .\. .\.)|[А-Яа-я0-9]+ ИКТИБ | Иностранный язык/g;
const groupRegex = /([А-Яа-я]{4}\d-\d+)/g;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { index, day, element } = props;

  const groups = element.match(groupRegex) || [];
  const subject = element
    .split(subgroupRegex)[0]
    .replace(groups.join(","), "")
    .split(auditoryRegex)[0];
  const subGroups = element.match(subgroupRegex) || [""];
  const auditory = element.match(auditoryRegex) || [""];

  return (
    <div className={classNames(styles.ScheduleCard)}>
      <div className={styles.cardHeader}>
        <span>{day.split(",").join(", ")}</span>
        <span>{index}-ая пара</span>
      </div>
      <div className={styles.cardContent}>
        <h3>{subject}</h3>
        {element === ""
          ? null
          : groups.length == 0
          ? subGroups.map((item, index) => {
              return (
                <p className={styles.subgroup}>
                  {item} &mdash; {auditory[index]}
                </p>
              );
            })
          : groups.map((item, index) => {
              return (
                <p className={styles.subgroup}>
                  {item} &mdash; {auditory[index]}
                </p>
              );
            })}
      </div>

      <div className={styles.cardFooter}>
        <div>
          <TimeIcon boxSize={6} className={styles.icon} />
          {lessonsTime[index]}
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

export default ScheduleCard;

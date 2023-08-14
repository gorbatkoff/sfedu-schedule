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
<<<<<<< HEAD:src/entities/ScheduleCard/ScheduleCard.tsx
const subgroupRegex = /([А-Яа-я]+ .\. .\.|\d+ п\/г * [А-Яа-я]+ .\. .\.)|[А-Яа-я0-9]+ ИКТИБ | Иностранный язык/g;
const groupRegex = /([А-Яа-я]{4}\d-\d+)/g

const ScheduleCard = (props: ScheduleCardProps) => {
  const { index, day, element } = props;
  
  const groups = element.match(groupRegex) || [];
  const subject = element.split(subgroupRegex)[0].replace(groups.join(","),"").split(auditoryRegex)[0];
  const subgroup = element.match(subgroupRegex) || [""];
  const auditory = element.match(auditoryRegex) || [""];
=======
const subgroupRegex =
  /([А-Яа-я]+ .\. .\.|\d+ п\/г * [А-Яа-я]+ .\. .\.)|[А-Яа-я0-9]+ ИКТИБ | Иностранный язык/g;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { index, day, element } = props;

  const subject = element.split(subgroupRegex)[0];
  const subgroup = element.match(subgroupRegex) || ["1 п/г"];
  const auditory = element.match(auditoryRegex) || ["LMS"];
>>>>>>> ef112f625400d16cddb6b7142e0d011a21c4f07a:src/entities/ScheduleCard/ui/ScheduleCard.tsx

  return (
    <div className={classNames(styles.ScheduleCard)}>
      <div className={styles.cardHeader}>
        <span>{day.split(",").join(", ")}</span>
        <span>{String(index)}-ая пара</span>
      </div>
      <div className={styles.cardContent}>
        <span>{subject}</span>
<<<<<<< HEAD:src/entities/ScheduleCard/ScheduleCard.tsx
        <span>{
          groups.length == 0 ? subgroup.map((item, index) => {
          return (
            <p className={styles.subgroup}>
              {item} &mdash; {auditory[index]}
            </p>
          );
          }) :
          groups.map((item, index) => {
            return (
              <p className={styles.subgroup}>
                {item} &mdash; {auditory[index]}
              </p>
            );
            })
        }</span>
=======
        <span>
          {subgroup.map((item, index) => {
            return (
              <p className={styles.subgroup} key={index}>
                {item} &#8212; {auditory[index]}
              </p>
            );
          })}
        </span>
>>>>>>> ef112f625400d16cddb6b7142e0d011a21c4f07a:src/entities/ScheduleCard/ui/ScheduleCard.tsx
      </div>

      <div className={styles.cardFooter}>
        <span>
          <TimeIcon boxSize={6} className={styles.icon} />
          {lessonsTime[index]}
        </span>
        <span
          style={{
            borderLeft: `${getInfoAboutElement(element)} 4px solid`,
            paddingLeft: "5px",
          }}
        >
          {auditory[0]}
        </span>
      </div>
    </div>
  );
};

export default ScheduleCard;

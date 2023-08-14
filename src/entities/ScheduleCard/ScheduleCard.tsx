import styles from "./ScheduleCard.module.scss";
import classNames from "classnames";
import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";
import { Icon } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

interface ScheduleCardProps {
  index: number;
  day: string;
  element: string;
  cardFunc?: Function;
}

const lessonTimes = [
  "Время",
  "08:00-09:35",
  "09:50-11:25",
  "11:55-13:30",
  "13:45-15:20",
  "15:50-17:25",
  "17:40-19:15",
  "19:30-21:05",
];

const auditoryRegex = /[А-К]-\d{3}|\w{3}{|-\d}/g;
const subgroupRegex = /([А-Яа-я]+ .\. .\.|\d+ п\/г * [А-Яа-я]+ .\. .\.)|ИКТИБ/g;

const ScheduleCard = (props: ScheduleCardProps) => {
  const { index, day, element, cardFunc = () => {} } = props;

  const subject = element.split(subgroupRegex)[0];
  const subgroup = element.match(subgroupRegex) || ["1 п/г"];
  const auditory = element.match(auditoryRegex) || ["LMS"];
  // console.log(subject, subgroup, auditory);
  return (
    <div className={classNames(styles.ScheduleCard)}>
      <div className={styles.header}>
        <span>{day.split(",").join(", ")}</span>
        <span>{index.toString()}-ая пара</span>
      </div>
      <div className={styles.body}>
        <span>{subject}</span>
        <span>{subgroup.map((item, index) => {
          return (
            <p className={styles.subgroup}>
              {item} --- {auditory[index]}
            </p>
          );
        })}</span>
      </div>

      <div className={styles.footer}>
        <span>
          <TimeIcon boxSize={6} className={styles.icon} />
          {lessonTimes[index]}
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

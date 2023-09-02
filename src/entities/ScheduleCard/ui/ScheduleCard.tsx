import classNames from "classnames";

import { TimeIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
// import { AccordionTheme } from "/src/shared/ui/Accordion/AccordionTheme";
import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";
import { auditoryLMSRegex, groupRegex, subgroupRegex } from "/src/shared/regex";

import styles from "./ScheduleCard.module.scss";

interface ScheduleCardProps {
  className?: string;
  lessonNumber: number;
  lessonTime: string;
  day: string;
  element: string;
}

export const ScheduleCard = (props: ScheduleCardProps) => {
  const { className, lessonNumber: index, lessonTime, day, element } = props;

  const groups =
    element.match(groupRegex) || element.match(subgroupRegex) || [];
  const subject = element
    .split(subgroupRegex)[0]
    .replace(groups.join(","), "")
    .split(auditoryLMSRegex)[0];
  const auditory = element.match(auditoryLMSRegex) || [""];

  return (
    <div className={classNames(styles.ScheduleCard, {}, [className])}>
      <div className={styles.cardHeader}>
        <span>{day.split(",").join(", ")}</span>
        <span>{index}-ая пара</span>
      </div>
      <div className={styles.cardContent}>
        <h3>{subject || "Нет пары"}</h3>
        {groups.length < 2 ? (
          groups.map((item, index) => {
            return (
              <p className={styles.subgroup} key={index}>
                {item}
                {auditory[index] == undefined
                  ? " — " + auditory[auditory.length - 1]
                  : " — " + auditory[index]}
              </p>
            );
          })
        ) : (
          <Accordion allowToggle>
            <AccordionItem className={styles.accodion}>
              <AccordionButton className={styles.accodionBtn}>
                <Box as="span" flex="1" textAlign="left">
                  Показать больше
                </Box>
                <AccordionIcon />
              </AccordionButton>
              {groups.map((item, index) => {
                return (
                  <AccordionPanel
                    pb={2}
                    className={styles.accodionContent}
                    key={index}
                  >
                    <p className={styles.subgroup}>
                      {item}
                      {auditory[index] == undefined
                        ? " — " + auditory[auditory.length - 1]
                        : " — " + auditory[index]}
                    </p>
                  </AccordionPanel>
                );
              })}
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div>
          <TimeIcon boxSize={6} className={styles.icon} />
          {lessonTime || "--:-- — --:--"}
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

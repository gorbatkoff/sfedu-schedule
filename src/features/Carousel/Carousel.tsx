import { useEffect, useRef } from "react";
import classNames from "classnames";

import { Button } from "@chakra-ui/react";

import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { fetchScheduleByWeek } from "/src/entities/ScheduleTable/model/slice/tableSlice";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  carouselItems: number[];
  group: string;
  week: number;
}

const Carousel = ({ carouselItems, group, week }: CarouselProps) => {
  const myRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);
  const { week: currentWeek } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const executeScroll = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => executeScroll(), 500);
  }, []);

  const fetchDataByWeek = async (week: number) => {
    dispatch(fetchScheduleByWeek({ week, group }));
  };

  return (
    <div className={classNames(styles.Carousel)}>
      {carouselItems.map((item, index) => {
        return (
          <Button
            className={styles.weekButton}
            onClick={() => fetchDataByWeek(item)}
            key={index}
            isDisabled={week === index + 1}
            // @ts-ignore
            ref={week === index + 1 ? myRef : null}
            backgroundColor={index + 1 === currentWeek ? "#5b32e2" : ""}
            opacity={item < currentWeek ? "0.5" : "1"}
            colorScheme={week === index + 1 ? "green" : "twitter"}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default Carousel;

import { useEffect, useRef } from "react";
import classNames from "classnames";

import { Button } from "@chakra-ui/react";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  week: number;
  carouselItems: number[];
  fetchDataByWeek: (week: number) => void;
}

const Carousel = ({ week, carouselItems, fetchDataByWeek }: CarouselProps) => {
  const myRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);

  const executeScroll = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => executeScroll(), 500);
  }, []);

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

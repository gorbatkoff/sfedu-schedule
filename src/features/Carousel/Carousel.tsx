import { Button } from "@chakra-ui/react";
import classNames from "classnames";
import { useState, useEffect } from "react";

import styles from './Carousel.module.scss'

interface CarouselProps {
    week: number;
    carouselItems: number[],
    fetchDataByWeek: (week:number)=>void
}

const Carousel = ({week,carouselItems,fetchDataByWeek}:CarouselProps) => {
    const [active, setActive] = useState(0);
    let scrollInterval: any;
  
    useEffect(() => {
      scrollInterval = setTimeout(() => {
        setActive((active + 1) % carouselItems.length);
      }, 2000);
      
      return () => clearTimeout(scrollInterval);
    });
  
    return (
      <div className={classNames(styles.Carousel)}>
        {carouselItems.map((item, index) => {
          const activeClass = active === index ? ' visible' : '';
            return (
                <Button className={styles.weekButton}
                onClick={() => fetchDataByWeek(item)}
                key={index}
                isDisabled={week === index + 1}
                colorScheme={
                  week === index + 1 ? "green" : "twitter"
                }
                >
                {item}
              </Button>
          )
        })}
      </div>
    );
};
  

export default Carousel
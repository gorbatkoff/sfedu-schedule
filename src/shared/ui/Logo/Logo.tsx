import { memo } from "react";
import classNames from "classnames";
import WinterHat from "/src/shared/assets/WinterHat.svg";
import { Heading, useColorMode } from "@chakra-ui/react";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className }: LogoProps) => {
  const { colorMode } = useColorMode();

  return (
    <div className={classNames(styles.Logo, {}, [className])}>
      <img src={WinterHat} alt="Логотип" className={styles.logoIcon} />
      <Heading size="16px" className={styles.title}>
        Sfedu Schedule
      </Heading>
    </div>
  );
});

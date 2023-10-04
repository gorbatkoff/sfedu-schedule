import { memo } from "react";
import classNames from "classnames";

import LogoIcon from "/src/shared/assets/Logo.svg";
import { Heading, useColorMode } from "@chakra-ui/react";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className }: LogoProps) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={classNames(styles.Logo, {}, [className])}
      style={{ paddingRight: "5px" }}
    >
      <img src={LogoIcon} alt="Logo" className={styles.logoIcon} />
      <Heading size="16px" className={styles.title}>
        Sfedu Schedule
      </Heading>
    </div>
  );
});

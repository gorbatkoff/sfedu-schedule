import { memo } from "react";
import classNames from "classnames";

import LogoIcon from "/src/shared/assets/Logo.svg";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

export const Logo = memo(({ className }: LogoProps) => {
  return (
    <div className={classNames(styles.Logo, {}, [className])}>
      <img src={LogoIcon} alt="Logo" className={styles.logoIcon} />
      <h1 className={styles.title}>Sfedu Schedule</h1>
    </div>
  );
});

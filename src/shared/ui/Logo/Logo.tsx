import { memo } from "react";

import { Typography } from "@snack-uikit/typography";

import Icon from "/src/shared/assets/Logo.svg";

import styles from "./Logo.module.scss";

interface LogoProps {
  onUpdateData?: () => void;
}

export const Logo = memo(({ onUpdateData }: LogoProps) => {
  return (
    <div className={styles.Logo} onClick={onUpdateData}>
      <img src={Icon} alt="Логотип" className={styles.logoIcon} />
      <Typography
        tag={"h1"}
        className={styles.title}
        family={"light"}
        size={"s"}
        purpose={"headline"}
      >
        Sfedu Schedule
      </Typography>
    </div>
  );
});

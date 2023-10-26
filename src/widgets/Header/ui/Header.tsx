import classNames from "classnames";

import { Box, IconButton } from "@chakra-ui/react";

import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { tableActions } from "/src/entities/ScheduleTable";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

import { defaultValue } from "/src/shared/const/global/const";

import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const handleUpdateData = () => {
    window.history.replaceState(null, "group", window.location.pathname);
    dispatch(tableActions.setSchedule(defaultValue));
  };

  return (
    <Box
      bg="var(--secondary-color)"
      as="header"
      className={classNames(styles.Header, {}, [className])}
    >
      <div className={styles.headerWrapper}>
        <IconButton
          aria-label="Логотип"
          bg="transparent"
          onClick={handleUpdateData}
        >
          <Logo />
        </IconButton>
        <div className={styles.menuBlock}>
          <div className={styles.themeSwitcher}>
            <ThemeSwitcher />
          </div>
          <DrawerMenu />
        </div>
      </div>
    </Box>
  );
};

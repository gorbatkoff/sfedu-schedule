import { memo } from "react";

import classNames from "classnames";
import { Box, IconButton } from "@chakra-ui/react";

import { Logo } from "/src/shared/ui/Logo/Logo";
import { defaultValue } from "/src/shared/const";
import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
  updateData: (data: IScheduleTable) => void;
}

export const Header = memo(({ className, updateData }: HeaderProps) => {
  const handleUpdateData = () => {
    updateData(defaultValue);
    window.history.replaceState(null, "group", window.location.pathname);
  };

  return (
    <Box as="header" className={classNames(styles.Header, {}, [className])}>
      <IconButton aria-label="Logo" bg="transparent" onClick={handleUpdateData}>
        <Logo />
      </IconButton>
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
      {window.screen.width <= 600 && <DrawerMenu />}
    </Box>
  );
});

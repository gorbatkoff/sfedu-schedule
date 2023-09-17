import { memo } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { Box, IconButton, useColorMode } from "@chakra-ui/react";

import { Logo } from "/src/shared/ui/Logo/Logo";
import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
  /*  updateData: (data: IScheduleTable) => void;*/
}

export const Header = memo(({ className }: HeaderProps) => {
  const handleUpdateData = () => {
    window.history.replaceState(null, "group", window.location.pathname);
  };

  const { colorMode } = useColorMode();

  const schedule = useSelector((state: StateSchema) => state.schedule);

  return (
    <Box
      bg={"var(--secondary-color)"}
      as="header"
      className={classNames(styles.Header, {}, [className])}
    >
      <div className={styles.headerWrapper}>
        <IconButton
          aria-label="Logo"
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
});

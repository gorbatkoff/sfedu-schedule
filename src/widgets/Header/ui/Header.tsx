import { memo } from "react";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";
import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { Box, IconButton } from "@chakra-ui/react";

interface HeaderProps {
  className?: string;
}

export const Header = memo(({ className }: HeaderProps) => {
  return (
    <Box as="header" className={classNames(styles.Header, {}, [className])}>
      <IconButton aria-label="Logo" background="transparent">
        <Logo />
      </IconButton>
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
      {window.screen.width <= 600 && <DrawerMenu />}
    </Box>
  );
});

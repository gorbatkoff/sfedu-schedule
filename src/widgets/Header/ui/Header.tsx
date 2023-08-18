import { memo } from "react";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { Button, Switch, useColorMode } from "@chakra-ui/react";
import { smoothThemeSwitch } from "/src/shared/lib/smoothThemeSwitch";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

interface HeaderProps {
  className?: string;
}

export const Header = memo(({ className }: HeaderProps) => {
  return (
    <header className={classNames(styles.Header, {}, [className])}>
      <Logo />
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </header>
  );
});

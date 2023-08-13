import { memo } from "react";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { Button, Switch, useColorMode } from "@chakra-ui/react";
import { smoothThemeSwitch } from "/src/shared/lib/smoothThemeSwitch";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface HeaderProps {
  className?: string;
}

export const Header = memo(({ className }: HeaderProps) => {
  const { toggleColorMode } = useColorMode();

  return (
    <header className={classNames(styles.Header, {}, [className])}>
      <Logo />
      <div className={styles.themeSwitcher}>
        <SunIcon boxSize={6} color="white" />
        <Switch size="md" onChange={() => smoothThemeSwitch(toggleColorMode)} />
        <MoonIcon boxSize={6} color="white" />
      </div>
    </header>
  );
});

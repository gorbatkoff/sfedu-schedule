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
    <div className={classNames(styles.Header, {}, [className])}>
      <Logo />

      {/*<Button onClick={() => smoothThemeSwitch(toggleColorMode)}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>*/}
      <div className={styles.themeSwitcher}>
        <SunIcon boxSize={6} color="white" />
        <Switch size="lg" onChange={() => smoothThemeSwitch(toggleColorMode)} />
        <MoonIcon boxSize={6} color="white" />
      </div>
    </div>
  );
});

import { memo } from "react";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";
import { DrawerMenu } from "/src/widgets/DrawerMenu";

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
      {window.screen.width <= 600 && <DrawerMenu />}
    </header>
  );
});

import { FC, memo } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { toggleColorMode } = useColorMode();
  const localStorageTheme = localStorage.getItem("chakra-ui-color-mode");

  const props = {
    boxSize: 6,
    color: "white",
    sx: { cursor: "pointer" },
    onClick: toggleColorMode,
  };

  return (
    <>
      {localStorageTheme === "light" ? (
        <SunIcon {...props} />
      ) : (
        <MoonIcon {...props} />
      )}
    </>
  );
});

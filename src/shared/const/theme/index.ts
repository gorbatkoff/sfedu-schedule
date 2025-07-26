import DefaultBrand from "@snack-uikit/figma-tokens/build/css/brand.module.css";

export enum Theme {
  Light = "Light",
  Dark = "Dark",
}

export const themeMap = {
  [Theme.Light]: DefaultBrand.light,
  [Theme.Dark]: DefaultBrand.dark,
};

export type ThemeContextProps = {
  theme: Theme;
  changeTheme(value: Theme): void;
};

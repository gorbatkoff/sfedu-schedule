import { Suspense, createContext, useEffect, useState } from "react";

import { Sprite, SpriteSVG } from "@snack-uikit/icons";
import { useThemeConfig } from "@snack-uikit/utils";
import Joyride from "react-joyride";
import { Route, Routes } from "react-router-dom";

import { LeaveFeedbackPage } from "/src/pages/LeaveFeedback";
import { MainPage } from "/src/pages/MainPage";
import { ReleaseNotesPage } from "/src/pages/ReleaseNotesPage";
import { ThankYouPage } from "/src/pages/ThankYouPage";

import { RenderFooter } from "/src/processes/RenderFooter";

import { Header } from "/src/widgets/Header";

import { Theme, ThemeContextProps, themeMap } from "/src/shared/const/theme";
import Loader from "/src/shared/ui/Loader/Loader";

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Dark,
  changeTheme() {},
});

const steps = [
  {
    target: "#search",
    content:
      "Для того чтобы просмотреть расписание впишите название группы или преподавателя",
  },
];

const App = () => {
  const { theme, themeClassName, changeTheme } = useThemeConfig<Theme>({
    themeMap,
    defaultTheme: Theme.Dark,
  });

  /*  useEffect(() => {
    const test = setInterval(() => {
      changeTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    }, 1000);

    return () => {
      clearInterval(test);
    };
  }, [theme]);*/

  const [run, setRun] = useState(false);

  const handleClickStart = () => {
    setRun(true);
  };
  const locale = new Intl.Locale("ru-RU"); // Создаем локаль для русского языка (Россия)

  return (
    // todo вынести в провайдер
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={themeClassName}>
        <Suspense fallback={<Loader />}>
          <div className="App">
            <Joyride
              locale={{ close: "Закрыть" }}
              run={true}
              steps={steps}
              styles={{
                options: {
                  arrowColor: "#e3ffeb",
                  backgroundColor: "#fff",
                  overlayColor: "rgba(0, 0, 0, 0.65)",
                  primaryColor: "#9b32e1",
                  textColor: "#004a14",
                  width: 900,
                  zIndex: 1000,
                },
              }}
            />
            <Header />

            <Routes>
              <Route element={<MainPage />} path="*" />
              <Route element={<ThankYouPage />} path="thanks-page" />
              <Route element={<LeaveFeedbackPage />} path="/leave-feedback" />
              <Route element={<ReleaseNotesPage />} path="/release" />
            </Routes>
            <RenderFooter />
          </div>
        </Suspense>
      </div>
      <Sprite content={SpriteSVG} />
    </ThemeContext.Provider>
  );
};

export default App;

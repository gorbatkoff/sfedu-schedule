import { StrictMode } from "react";

import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Snowfall from "react-snowfall";
import { registerSW } from "virtual:pwa-register";

import App from "/src/app/App";
import { ErrorBoundary } from "/src/app/Providers/ErrorBoundary";
import StoreProvider from "/src/app/Providers/StoreProvider/ui/ProviderOfStore";

import "./app/styles/index.scss";

const theme: ThemeConfig = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {},
});

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Есть свежие обновления. Загрузить?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("offline ready");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
            <Snowfall snowflakeCount={75} />
          </ChakraProvider>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>
);

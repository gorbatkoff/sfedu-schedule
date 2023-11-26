import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "/src/app/App";
import { registerSW } from "virtual:pwa-register";

import { ErrorBoundary } from "/src/app/Providers/ErrorBoundary";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

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
          </ChakraProvider>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>,
);

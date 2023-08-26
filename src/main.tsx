import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "/src/app/App";
import { registerSW } from "virtual:pwa-register";

import { ErrorBoundary } from "/src/app/Providers/ErrorBoundary";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

import "./app/styles/index.scss";

const theme: ThemeConfig = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Есть новые обновления, загрузить?")) {
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
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  </StrictMode>,
);

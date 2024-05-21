import { StrictMode } from "react";

import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import App from "/src/app/App";
import { ErrorBoundary } from "/src/app/providers/ErrorBoundary";
import { StoreProvider } from "/src/app/providers/StoreProvider";

import "./app/styles/index.scss";

const theme: ThemeConfig = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
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
  </StrictMode>
);

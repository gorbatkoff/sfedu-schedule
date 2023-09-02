import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "/src/app/App";
import { registerSW } from "virtual:pwa-register";

import { ErrorBoundary } from "/src/app/Providers/ErrorBoundary";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

import "./app/styles/index.scss";
import StoreProvider from "/src/app/Providers/StoreProvider/ui/ProviderOfStore";

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
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>,
);

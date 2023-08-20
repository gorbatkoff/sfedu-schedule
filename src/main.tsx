import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "/src/app/App";

import { registerSW } from "virtual:pwa-register";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./app/styles/index.scss";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("offline ready");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);

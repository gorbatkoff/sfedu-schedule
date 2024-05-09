import { ReactNode } from "react";

import { Provider } from "react-redux";

import { store } from "../config/store";

interface IStoreProvider {
  children: ReactNode;
}

export function StoreProvider({ children }: IStoreProvider) {
  return <Provider store={store}>{children}</Provider>;
}

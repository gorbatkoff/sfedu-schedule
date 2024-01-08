import { useDispatch } from "react-redux";

import { AppDispatch } from "/src/app/Providers/StoreProvider/config/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

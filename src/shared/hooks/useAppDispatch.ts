import { useDispatch } from "react-redux";

import { AppDispatch } from "/src/app/providers/StoreProvider/config/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

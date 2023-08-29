import { AppDispatch } from "/src/app/Providers/StoreProvider/config/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

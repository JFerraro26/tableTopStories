import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AccountDispatch } from "./store";

export const select: TypedUseSelectorHook<RootState> = useSelector;
export const useAccountDispatch: () => AccountDispatch = useDispatch;

import type { RootState } from "./store";

export const selectAccount = (state: RootState) => state.account.account;
export const selectCreateWorld = (state: RootState) => state.world.world;

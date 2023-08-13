import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import accountSliceReducer from "./slices/accountSlice";

export const store = configureStore({
	reducer: { account: accountSliceReducer },
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AccountDispatch = typeof store.dispatch;

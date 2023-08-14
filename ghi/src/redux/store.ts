import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import accountSliceReducer from "./slices/accountSlice";
import worldCreateSliceReducer from "./slices/worldCreateSlice";

export const store = configureStore({
	reducer: { account: accountSliceReducer, world: worldCreateSliceReducer },
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import rootReducer from "../reducers/rootReducer";
import { worldsApi } from "../apis/worldsApi";

export const store = configureStore({
	reducer: { rootReducer, [worldsApi.reducerPath]: worldsApi.reducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(worldsApi.middleware),
});

setupListeners(store.dispatch);

export default store;

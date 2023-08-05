import { combineReducers } from "redux";
import worldCreateSliceReducer from "../slices/worldCreateSlice";
import accountSliceReducer from "../slices/accountSlice";

const rootReducer = combineReducers({
	createdWorld: worldCreateSliceReducer,
	account: accountSliceReducer,
});

export default rootReducer;

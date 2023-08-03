import { combineReducers } from "redux";
import worldCreateSliceReducer from "../slices/worldCreateSlice";

const rootReducer = combineReducers({
	createdWorld: worldCreateSliceReducer,
});

export default rootReducer;

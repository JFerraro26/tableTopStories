import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WorldState {
	world: {
		id?: number;
		name?: string;
		description?: string;
		picture?: string;
		countries?: [
			{
				id?: number;
				name?: string;
				description?: string;
				picture?: string;
				cities?: [
					{
						id?: number;
						name?: string;
						description?: string;
						picture?: string;
						districts: [
							{
								id?: number;
								name?: string;
								description?: string;
								picture?: string;
							}
						];
					}
				];
			}
		];
	};
}

const initialState: WorldState = {
	world: {
		id: undefined,
		name: undefined,
		description: undefined,
		picture: undefined,
		countries: undefined,
	},
};

export const worldCreateSlice = createSlice({
	name: "world",
	initialState,
	reducers: {
		setWorld: (state, action: PayloadAction<object>) => {
			state.world = action.payload;
		},
		clearWorld: (state) => {
			state.world = {
				name: undefined,
				description: undefined,
				picture: undefined,
				countries: undefined,
			};
		},
	},
});

export const { setWorld, clearWorld } = worldCreateSlice.actions;

export default worldCreateSlice.reducer;

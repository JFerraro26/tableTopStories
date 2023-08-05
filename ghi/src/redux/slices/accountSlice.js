import { createSlice } from "@reduxjs/toolkit";

const initialState = { account: null };

export const AccountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccount: (state, action) => {
			state.account = action.payload;
		},
		clearAccount: (state) => {
			state.account = null;
		},
	},
});

export const { setAccount, clearAccount } = AccountSlice.actions;

export default AccountSlice.reducer;

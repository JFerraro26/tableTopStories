import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
	account: {
		expiry?: Date;
		token?: string;
		user?: {
			date_joined: Date;
			email: string;
			id: string;
			is_staff: boolean;
			is_superuser: boolean;
			last_login: Date;
			username: string;
		};
	};
}

const initialState: AccountState = {
	account: { expiry: undefined, token: undefined, user: undefined },
};

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccount: (state, action: PayloadAction<object>) => {
			state.account = action.payload;
		},
		clearAccount: (state) => {
			state.account = {
				expiry: undefined,
				token: undefined,
				user: undefined,
			};
		},
	},
});

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;

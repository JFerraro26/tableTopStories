export const getNewWorldEdit = (state) =>
	state.rootReducer.createdWorld.createdWorld;

export const getWorldData = (state) => state.rootReducer.worldData.worldData;

export const getAccountData = (state) => state.rootReducer.account.account;

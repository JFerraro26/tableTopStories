import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const worldsApi = createApi({
	reducerPath: "worldsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_HOST}/api/`,
	}),
	endpoints: (builder) => ({
		getUserWorlds: builder.query({
			query: () => "worlds",
		}),
	}),
});

export const { useGetUserWorldsQuery } = worldsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const worldsApi = createApi({
	reducerPath: "worldsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_HOST}/api/worlds`,
	}),
	endpoints: (builder) => ({
		getUserWorlds: builder.query({
			query: () => "",
		}),
		deleteWorld: builder.mutation({
			query: (pk) => ({
				url: `/${pk}`,
				method: "delete",
			}),
		}),
	}),
});

export const { useGetUserWorldsQuery, useDeleteWorldMutation } = worldsApi;

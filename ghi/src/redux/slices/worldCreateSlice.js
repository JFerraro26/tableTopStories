import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	createdWorld: null,
};

export const WorldCreateSlice = createSlice({
	name: "createdWorld",
	initialState,
	reducers: {
		setCreatedWorld: (state, action) => {
			state.createdWorld = action.payload;
		},
		clearCreatedWorld: (state) => {
			state.createdWorld = null;
		},
		addCountryToCreatedWorld: (state, action) => {
			state.createdWorld.countries.push(action.payload);
		},
		editCountryInCreatedWorld: (state, action) => {
			const { countryPk, updatedCountry } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				state.createdWorld.countries[countryIndex] = updatedCountry;
			} else {
				console.error("Could Not Find Country Index");
			}
		},
		deleteCountryInCreatedWorld: (state, action) => {
			const countryPk = action.payload;
			const updatedCountries = state.createdWorld.countries.filter(
				(country) => country.pk !== countryPk
			);
			state.createdWorld.countries = updatedCountries;
		},
		addCityToCreatedWorld: (state, action) => {
			const { countryPk, newCity } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				state.createdWorld.countries[countryIndex].cities.push(newCity);
			} else {
				console.error("Something Went Wrong");
			}
		},
		editCityInCreatedWorld: (state, action) => {
			const { countryPk, cityPk, updatedCity } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				const cityIndex = state.createdWorld.countries[
					countryIndex
				].cities.findIndex((city) => city.pk === cityPk);
				if (cityIndex >= 0) {
					state.createdWorld.countries[countryIndex].cities[
						cityIndex
					] = updatedCity;
				} else {
					console.error("Could Not Find City Index");
				}
			} else {
				console.error("Could Not Find Country Index");
			}
		},
		deleteCityInCreatedWorld: (state, action) => {
			const { countryPk, cityPk } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				const updatedCites = state.createdWorld.countries[
					countryIndex
				].cities.filter((city) => city.pk !== cityPk);
				state.createdWorld.countries[countryIndex].cities =
					updatedCites;
			} else {
				console.error("Cound Not Find Country Index");
			}
		},
	},
});

export const {
	setCreatedWorld,
	clearCreatedWorld,
	addCountryToCreatedWorld,
	editCountryInCreatedWorld,
	addCityToCreatedWorld,
	editCityInCreatedWorld,
	deleteCountryInCreatedWorld,
	deleteCityInCreatedWorld,
} = WorldCreateSlice.actions;

export default WorldCreateSlice.reducer;

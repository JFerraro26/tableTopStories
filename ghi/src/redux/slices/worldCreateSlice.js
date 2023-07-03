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
			const { country } = action.payload;
			state.createdWorld.countries.push({ ...country, cities: [] });
		},
		editCountryInCreatedWorld: (state, action) => {
			const { countryPk, updatedCountry } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				state.createdWorld.countries[countryIndex] = updatedCountry;
			} else {
				console.error("Redux Error Could Not Find Country Index");
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
			state.createdWorld.countries
				.find((country) => country.pk === countryPk)
				?.cities.push({ ...newCity, districts: [] });
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
					console.error("Redux Error Could Not Find City Index");
				}
			} else {
				console.error("Redux Error Could Not Find Country Index");
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
				console.error("Redux Error Could Not Find Country Index");
			}
		},
		addDistrictInCreatedWorld: (state, action) => {
			const { countryPk, cityPk, newDistrict } = action.payload;
			state.createdWorld.countries
				.find((country) => country.pk === countryPk)
				?.cities.find((city) => city.pk === cityPk)
				?.districts.push(newDistrict);
		},
		editDistrictInCreatedWorld: (state, action) => {
			const { countryPk, cityPk, districtPk, updatedDistrict } =
				action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				const cityIndex = state.createdWorld.countries[
					countryIndex
				].cities.findIndex((city) => city.pk === cityPk);
				if (cityIndex >= 0) {
					const districtIndex = state.createdWorld.countries[
						countryIndex
					].cities[cityIndex].districts.findIndex(
						(district) => district.pk === districtPk
					);
					if (districtIndex >= 0) {
						state.createdWorld.countries[countryIndex].cities[
							cityIndex
						].districts[districtIndex] = updatedDistrict;
					} else {
						console.error(
							"Redux Error Could not find District Index"
						);
					}
				} else {
					console.error("Redux Error Could not find City Index");
				}
			} else {
				console.error("Redux Error Could not find Country Index");
			}
		},
		deleteDistrictInCreatedWorld: (state, action) => {
			const { countryPk, cityPk, districtPk } = action.payload;
			const countryIndex = state.createdWorld.countries.findIndex(
				(country) => country.pk === countryPk
			);
			if (countryIndex >= 0) {
				const cityIndex = state.createdWorld.countries[
					countryIndex
				].cities.findIndex((city) => city.pk === cityPk);
				if (cityIndex >= 0) {
					const updatedDistricts = state.createdWorld.countries[
						countryIndex
					].cities[cityIndex].districts.filter(
						(district) => district.pk !== districtPk
					);
					state.createdWorld.countries[countryIndex].cities[
						cityIndex
					].districts = updatedDistricts;
				} else {
					console.error("Redux Error Could Not Find City Index");
				}
			} else {
				console.error("Redux Error Could Not Find Country Index");
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
	addDistrictInCreatedWorld,
	editDistrictInCreatedWorld,
	deleteDistrictInCreatedWorld,
} = WorldCreateSlice.actions;

export default WorldCreateSlice.reducer;

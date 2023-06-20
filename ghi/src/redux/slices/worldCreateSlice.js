import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    createdWorld: null,
};

export const WorldCreateSlice = createSlice({
    name: "createdWorld",
    initialState ,
    reducers: {
        setCreatedWorld: (state, action) => {
            state.createdWorld = action.payload;
        },
        clearCreatedWorld: (state) => {
            state.createdWorld = null;
        },
        addCountryToCreatedWorld: (state, action) => {
            state.createdWorld.countries.push(action.payload)
        },
        editCountryInCreatedWorld: (state, action) => {
            const {countryPk, updatedCountry} = action.payload;
            const countryIndex = state.createdWorld.countries.findIndex(
                (country) => country.pk === countryPk
            )
            if (countryIndex >= 0) {
                state.createdWorld.countries[countryIndex] = updatedCountry
            }
        },
    },
})

export const { setCreatedWorld, clearCreatedWorld, addCountryToCreatedWorld, editCountryInCreatedWorld } = WorldCreateSlice.actions;

export default WorldCreateSlice.reducer;

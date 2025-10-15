// template of a slice
// initial state
// define actions
// export actions, reducer

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Location {
    lat: number | null;
    lng: number | null;
    place: string | null;
}

interface LocationSliceState {
    map: Location;
    userLocation: Location;
}


const initialState: LocationSliceState = {

    map: {
        lat: 53.35182114295381,
        lng: -6.240391455198273,
        place: "DUBLIN CITY CENTRE, IRELAND."
    },
    userLocation: {
        lat: null,
        lng: null,
        place: null
    }
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setMap: (state, action: PayloadAction<Location>) => {
            state.map = action.payload
        },
        setUserLocation: (state, action: PayloadAction<Location>) => {
            state.userLocation = action.payload;
        },
    }
});


export const { setMap, setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;
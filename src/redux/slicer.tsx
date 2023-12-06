import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface FractionState {
    data: [];
    isLoading: boolean;
    error: string | null;
}

export const initialState: FractionState = {
    data: [],
    isLoading: false,
    error: "",
} 


export const fractionsFetch = createAsyncThunk('fractions', async () => {
    const data = await axios.get('https://esi.evetech.net/legacy/universe/factions/')
    return data.data;
})

const fractionSlicer = createSlice({
    name: 'fractions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fractionsFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fractionsFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fractionsFetch.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.data = [];
        });
    },
});

export default fractionSlicer.reducer;
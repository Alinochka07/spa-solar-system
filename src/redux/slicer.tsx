import { createSlice, createAsyncThunk, PayloadAction, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";


export interface FractionState {
    data: any[];
    systemData: any | [];
    isLoading: boolean;
    error: string | null;
}

export const initialState: FractionState = {
    data: [],
    systemData: {},
    isLoading: false,
    error: "",
} 


export const fractionsFetch = createAsyncThunk<any[], void>('fractions', async () => {
    try {
        const data = await axios.get('https://esi.evetech.net/legacy/universe/factions/');
        return data.data;
    } catch (error) {
        throw error;
    }
})

export const systemsFetch = createAsyncThunk<any, number>('systems', async (solar_system_id: number, thunkAPI) => {
    try {
        const data = await axios.get(`https://esi.evetech.net/legacy/universe/systems/${solar_system_id}`);
        return data.data;
    } catch (error) {
        return Promise.reject({ error: 'Failed to fetch system data' });
    }
});

const fractionSlicer = createSlice({
    name: 'fractions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fractionsFetch.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fractionsFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fractionsFetch.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.data = [];
        });
    },
});

const systemSlicer = createSlice({
    name: 'systems',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(systemsFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(systemsFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.systemData = action.payload;
            state.error = null;
        });
        builder.addCase(systemsFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.error = action.error?.message;
            state.systemData = {};
        });
    },
});

export const rootReducer = combineReducers({
    fractions: fractionSlicer.reducer,
    systems: systemSlicer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

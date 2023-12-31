import { createSlice, createAsyncThunk, PayloadAction, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";


export interface FractionState {
    data: any[];
    data2: any | [];
    isLoading: boolean;
    error: string | null;
}

export const initialState: FractionState = {
    data: [],
    data2: {},
    isLoading: false,
    error: "",
}

export const fractionsFetch = createAsyncThunk<any[], void>('fractions', async () => {
    try {
        const data = await axios.get('https://esi.evetech.net/latest/universe/factions/');
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

export const corporationsFetch = createAsyncThunk<any, number>('corporations', async (corporation_id: number, thunkAPI) => {
    try {
        const corpData = await axios.get(`https://esi.evetech.net/legacy/corporations/${corporation_id}`);
        return corpData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch corporation data'});
    }
})

export const charactersFetch = createAsyncThunk<any, number>('characters', async (ceo_id: number, thunkAPI) => {
    try {
        const charData = await axios.get(`https://esi.evetech.net/legacy/characters/${ceo_id}`);
        return charData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch character data by ceo_id'});
    }
})

export const raceFetch = createAsyncThunk<any | []>('races', async () => {
    try {
        const raceData = await axios.get('https://esi.evetech.net/legacy/universe/races/');
        return raceData.data;
    } catch (error) {
        throw error;
    }
})

export const alliancesFetch = createAsyncThunk<any | []>('alliances', async () => {
    try {
        const allianceData = await axios.get('https://esi.evetech.net/latest/alliances/');
        return allianceData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch alliances'})
    }
})

export const alliancesByIdFetch = createAsyncThunk<any, number>('alliancesById', async (alliance_id: number, thunkAPI) => {
    try {
        const allianceData = await axios.get(`https://esi.evetech.net/latest/alliances/${alliance_id}`);
        return allianceData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch alliances by ID'})
    }
})

export const constellationsFetch = createAsyncThunk<any | []>('constellations', async () => {
    try {
        const constellationData = await axios.get('https://esi.evetech.net/latest/universe/constellations/');
        return constellationData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch constellations'})
    }
})

export const constellationsByIdFetch = createAsyncThunk<any, number>('constellations', async (constellations_id: number, thunkAPI) => {
    try {
        const constellationData = await axios.get(`https://esi.evetech.net/legacy/universe/constellations/${constellations_id}`);
        return constellationData.data;
    } catch (error) {
        return Promise.reject({error: 'Failed to fetch constellations'})
    }
})


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
            state.data2 = action.payload;
            state.error = null;
        });
        builder.addCase(systemsFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.error = action.error?.message;
            state.data2 = {};
        });
    },
});

const corporationSlicer = createSlice({
    name: 'corporations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(corporationsFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(corporationsFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data2 = action.payload;
            state.error = null;
        });
        builder.addCase(corporationsFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.error = action.error?.message;
            state.data2 = {};
        });
    },
});

const characterSlicer = createSlice({
    name: 'characters',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(charactersFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(charactersFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data2 = action.payload;
            state.error = null;
        })
        builder.addCase(charactersFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data2 = {};
            state.error = action.error?.message;
        })
    },
});

const raceSlicer = createSlice({
    name: 'races',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(raceFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(raceFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        builder.addCase(raceFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error?.message;
        })
    },
});

const allianceSlicer = createSlice({
    name: 'alliances',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(alliancesFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(alliancesFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(alliancesFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error?.message;
        })
    },
});

const allianceByIdSlicer = createSlice({
    name: 'alliancesByID',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(alliancesByIdFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(alliancesByIdFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data2 = action.payload;
            state.error = null;
        })
        builder.addCase(alliancesByIdFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data2 = {};
            state.error = action.error?.message;
        })
    },
});

const constellationSlicer = createSlice({
    name: 'constellations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(constellationsFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(constellationsFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(constellationsFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error?.message;
        })
    },
});

const constellationByIdSlicer = createSlice({
    name: 'constellationsByID',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(constellationsByIdFetch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(constellationsByIdFetch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data2 = action.payload;
            state.error = null;
        })
        builder.addCase(constellationsByIdFetch.rejected, (state, action: any) => {
            state.isLoading = false;
            state.data2 = {};
            state.error = action.error?.message;
        })
    },
});

export const rootReducer = combineReducers({
    fractions: fractionSlicer.reducer,
    systems: systemSlicer.reducer,
    corporations: corporationSlicer.reducer,
    characters: characterSlicer.reducer,
    races: raceSlicer.reducer,
    alliances: allianceSlicer.reducer,
    alliancesByIdD: allianceByIdSlicer.reducer,
    constellations: constellationSlicer.reducer,
    constellationsById: constellationByIdSlicer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

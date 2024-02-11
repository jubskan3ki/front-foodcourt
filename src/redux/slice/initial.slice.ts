// initialSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    value: boolean;
}

const initialState: InitialState = {
    value: false,
};

const initialSlice = createSlice({
    name: 'initial',
    initialState,
    reducers: {
        toggleInitial: (state) => ({
            ...state,
            value: !state.value,
        }),
    },
});

export const { toggleInitial } = initialSlice.actions;

export default initialSlice.reducer;

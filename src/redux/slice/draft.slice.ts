import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Draft {
    name: string;
    email: string;
    id?: number;
    description?: string;
}

interface DraftState {
    value: Draft[];
}

const initialState: DraftState = {
    value: [],
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setDraft: (state, action: PayloadAction<Draft[]>) => {
            // eslint-disable-next-line no-param-reassign
            state.value = action.payload;
        },
    },
});

export const { setDraft } = draftSlice.actions;
export default draftSlice.reducer;

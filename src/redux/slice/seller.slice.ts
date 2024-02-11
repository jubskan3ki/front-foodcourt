import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Seller {
    name: string;
    email: string;
    id?: number;
    description?: string;
}

interface SellerState {
    value: Seller[];
}

const initialState: SellerState = {
    value: [],
};

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setSeller: (state, action: PayloadAction<Seller[]>) => {
            // eslint-disable-next-line no-param-reassign
            state.value = action.payload;
        },
    },
});

export const { setSeller } = sellerSlice.actions;
export default sellerSlice.reducer;

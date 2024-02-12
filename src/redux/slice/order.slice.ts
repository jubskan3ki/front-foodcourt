import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: number;
    date: string;
    content: string;
    userId?: number;
    restaurantId?: number;
    commentaire?: string;
    state?: string;
}

interface OrderState {
    value: Order[];
}

const initialState: OrderState = {
    value: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<Order[]>) => {
            // eslint-disable-next-line no-param-reassign
            state.value = action.payload;
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;

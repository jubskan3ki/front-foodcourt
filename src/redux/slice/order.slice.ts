// order.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    date: string;
    content: string;
    userId?: number;
    restaurantId?: number;
    commentaire?: string;
    state?: string;
}

interface OrderState {
    value: Order | null;
}

const initialState: OrderState = {
    value: {
        date: '',
        content: '',
        userId: 0,
        restaurantId: 0,
        commentaire: '',
        state: '',
    } as Order,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<Order>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;

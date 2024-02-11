import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.slice';
import initialReducer from './slice/initial.slice';
import usersReducer from './slice/users.slice';
import orderReducer from './slice/order.slice';
import sellerReducer from './slice/seller.slice';
import draftReducer from './slice/draft.slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        order: orderReducer,
        seller: sellerReducer,
        draft: draftReducer,
        initial: initialReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

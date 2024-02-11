// user.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    value: any | null;
}

const initialState: UserState = {
    value: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserState>) => ({
            ...state,
            value: action.payload,
        }),
    },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

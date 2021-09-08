import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum StatusType {
    warning,
    message,
    error
}

export type TStatus = { id: number; type: StatusType; value: string };

interface statusState {
    list: Array<TStatus>;
    loading: boolean;
}

const initialState: statusState = {
    list: [],
    loading: false
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        addStatus: (
            state,
            action: PayloadAction<{ id: number; type: StatusType | undefined; value: string }>
        ) => {
            state.list.push({
                id: action.payload.id,
                type: action.payload.type || StatusType.message,
                value: action.payload.value
            });
        },
        removeStatus: (state, action: PayloadAction<number>) => {
            const removableStatusIndex = state.list.findIndex(({ id }) => id === action.payload);
            if (removableStatusIndex !== -1) state.list.splice(removableStatusIndex, 1);
        },
        setLoadAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { addStatus, removeStatus, setLoadAction } = statusSlice.actions;

export default statusSlice.reducer;

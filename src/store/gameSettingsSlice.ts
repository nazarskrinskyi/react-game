import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameSettings {
    size: number;
    target: number;
}

const initialState: GameSettings = {
    size: 4,
    target: 2048,
};

const gameSettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSettings: (state, action: PayloadAction<GameSettings>) => {
            state.size = action.payload.size;
            state.target = action.payload.target;
        },
    },
});

export const { updateSettings } = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;

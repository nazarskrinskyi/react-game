import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameSettings } from "./settingsTypes";

const initialState: GameSettings = {
  size: 4,
  target: 2048,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<GameSettings>) => {
      state.size = action.payload.size;
      state.target = action.payload.target;
    },
  },
});

export const { reducer, actions } = settingsSlice;

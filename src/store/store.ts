import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useBaseSelector,
  useDispatch as useBaseDispatch,
} from "react-redux";

import { reducer as gameReducer } from "./game/gameSlice";
import { reducer as settingsReducer } from "./settings/settingsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;

export const useDispatch = useBaseDispatch;

import { store, useSelector, useDispatch } from "./store";

import { actions as gameActions } from "./game/gameSlice";
import { actions as settingsActions } from "./settings/settingsSlice";

export { store, useSelector, useDispatch, gameActions, settingsActions };

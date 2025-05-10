import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
  gameActions,
  settingsActions,
} from "../../store";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

const Settings: React.FC = () => {
  const current = useSelector((state: RootState) => state.settings);
  const [size, setSize] = useState(current.size);
  const [target, setTarget] = useState(current.target);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    dispatch(settingsActions.updateSettings({ size, target }));
    dispatch(gameActions.restart(size));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blend-difference rounded shadow">
      <h2 className="text-2xl font-bold mb-4">⚙️ Налаштування гри</h2>

      <label className="block mb-2 font-medium">Розмір поля</label>
      <select
        className="w-full border p-2 mb-4"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      >
        {[4, 5, 6].map((val) => (
          <option key={val} value={val}>
            {val} x {val}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Цільове значення</label>
      <select
        className="w-full border p-2 mb-4"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
      >
        {[1024, 2048, 4096].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        💾 Зберегти та почати заново
      </button>
    </div>
  );
};

export default Settings;

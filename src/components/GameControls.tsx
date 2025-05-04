import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {move, restart} from "../hooks/gameSlice";
import {RootState} from "../store/store.ts";

const GameControls: React.FC = () => {
    const dispatch = useDispatch();
    const size = useSelector((state: RootState) => state.settings.size);
    const username = localStorage.getItem("userName");

    return (
        <div className="flex flex-col items-center gap-2">
            {username && <p className="text-lg mb-2">👤 Гравець: {username}</p>}

            <button onClick={() => dispatch(restart(size))}>Почати спочатку</button>
            <div className="grid grid-cols-4 gap-2">
                <button onClick={() => dispatch(move("up"))} className="bg-gray-700 px-4 py-2 text-white rounded">
                    ↑
                </button>
                <button onClick={() => dispatch(move("left"))} className="bg-gray-700 px-4 py-2 text-white rounded">
                    ←
                </button>
                <button onClick={() => dispatch(move("right"))} className="bg-gray-700 px-4 py-2 text-white rounded">
                    →
                </button>
                <button onClick={() => dispatch(move("down"))} className="bg-gray-700 px-4 py-2 text-white rounded">
                    ↓
                </button>
            </div>
        </div>
    );
};

export default GameControls;

import { useDispatch, useSelector, gameActions } from "../store";

const GameControls = () => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.settings.size);
  const username = localStorage.getItem("userName");

  return (
    <div className="flex flex-col items-center gap-2">
      {username && <p className="text-lg mb-2">👤 Гравець: {username}</p>}

      <button onClick={() => dispatch(gameActions.restart(size))}>
        Почати спочатку
      </button>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => dispatch(gameActions.move("up"))}
          className="bg-gray-700 px-4 py-2 text-white rounded"
        >
          ↑
        </button>
        <button
          onClick={() => dispatch(gameActions.move("left"))}
          className="bg-gray-700 px-4 py-2 text-white rounded"
        >
          ←
        </button>
        <button
          onClick={() => dispatch(gameActions.move("right"))}
          className="bg-gray-700 px-4 py-2 text-white rounded"
        >
          →
        </button>
        <button
          onClick={() => dispatch(gameActions.move("down"))}
          className="bg-gray-700 px-4 py-2 text-white rounded"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default GameControls;

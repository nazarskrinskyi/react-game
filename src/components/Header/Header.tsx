import { Link } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

function Header({ onLogout, isLoggedIn }: HeaderProps) {
  return (
    <header className="bg-blend-darken text-white px-6 py-4 flex justify-between items-center">
      <nav className="flex pr-5 gap-6 justify-center text-lg">
        <Link to="/" className="hover:underline">
          🏠 Гра
        </Link>
        <Link to="/settings" className="hover:underline">
          ⚙️ Налаштування
        </Link>
        <Link to="/about" className="hover:underline">
          📖 Про гру
        </Link>
      </nav>
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          🔒 Вийти
        </button>
      )}
    </header>
  );
}

export default Header;

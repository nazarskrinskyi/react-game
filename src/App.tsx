import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import AboutGame from "./pages/AboutGame";
import Settings from "./pages/Settings.tsx";
import UserForm from "./pages/UserForm.tsx";

const Header: React.FC<{ onLogout: () => void; isLoggedIn: boolean }> = ({ onLogout, isLoggedIn }) => {
    return (
        <header className="bg-blend-darken text-white px-6 py-4 flex justify-between items-center">
            <nav className="flex pr-5 gap-6 justify-center text-lg">
                <Link to="/" className="hover:underline">🏠 Гра</Link>
                <Link to="/settings" className="hover:underline">⚙️ Налаштування</Link>
                <Link to="/about" className="hover:underline">📖 Про гру</Link>
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
};

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        window.location.href = "/start"; // force redirect
    };

    return (
        <Router>
            <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />

            <main className="p-6">
                <Routes>
                    <Route path="/start" element={<UserForm />} />

                    <Route path="/" element={
                        <div className="flex flex-col items-center gap-6">
                            <Board />
                            <GameControls />
                        </div>
                    } />

                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<AboutGame />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;

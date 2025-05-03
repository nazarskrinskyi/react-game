import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import AboutGame from "./pages/AboutGame";
import Settings from "./pages/Settings.tsx";
import UserForm from "./pages/UserForm.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <header className="bg-blend-darken text-white px-6 py-4">
                <nav className="flex gap-6 justify-center text-lg">
                    <Link to="/" className="hover:underline">🏠 Гра</Link>
                    <Link to="/settings" className="hover:underline">⚙️ Налаштування</Link>
                    <Link to="/about" className="hover:underline">📖 Про гру</Link>
                </nav>
            </header>

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

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import AboutGame from "./pages/AboutGame";
import Settings from "./pages/Settings/Settings.tsx";
import UserForm from "./pages/UserForm.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    window.location.href = "/start";
  };

  return (
    <Router>
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />

      <main className="p-6">
        <Routes>
          <Route path="/start" Component={UserForm} />

          <Route
            path="/"
            element={
              <div className="flex flex-col items-center gap-6">
                <Board />
                <GameControls />
              </div>
            }
          />

          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutGame />} />
          <Route path="*" Component={() => null} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

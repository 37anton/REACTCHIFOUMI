import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import GamePage from "./pages/GamePage";
import MatchPage from "./pages/MatchPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/matches" element={<GamePage />} />
          <Route path="/matches/:id" element={<MatchPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

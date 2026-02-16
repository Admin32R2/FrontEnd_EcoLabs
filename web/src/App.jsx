
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import LearnMore from "./pages/LearnMore.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows welcome page */}
        <Route path="/" element={<Welcome />} />

        {/* Login/Register page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard - accessible to all users */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Learn More page */}
        <Route path="/learn-more" element={<LearnMore />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

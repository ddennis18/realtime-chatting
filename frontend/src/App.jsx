import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import UserProvider, { useUser } from "./context/UserContext";
import { useEffect } from "react";

function App() {
  const user = useUser();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import UserProvider, { useUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModal";

function App() {
  const user = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar setAuthModal={setIsAuthModalOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      {isAuthModalOpen && <AuthModal closeSelf={()=>setIsAuthModalOpen(false)}/>}
    </div>
  );
}

export default App;

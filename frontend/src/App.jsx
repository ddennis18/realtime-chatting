import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import UserProvider, { useUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModal";
import { Toaster } from "react-hot-toast";
import UserPage from "./components/UserPage";

function App() {
  const user = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar setAuthModal={setIsAuthModalOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/chat"
          element={
            <UserPage>
              <ChatPage />
            </UserPage>
          }
        />
      </Routes>
      {isAuthModalOpen && (
        <AuthModal closeSelf={() => setIsAuthModalOpen(false)} />
      )}
      <Toaster />
    </div>
  );
}

export default App;

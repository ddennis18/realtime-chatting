import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./UserContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [currentGroup, setCurrentGroupState] = useState({});
  const [chatList, setChatList] = useState();
  const { userData } = useUser();

  const setCurrentGroup = useCallback((g) => {
    // DO SOME CHAT FETCHING LOGIC HERE
    setCurrentGroup(g);
  }, []);

  useEffect(() => {}, [userData]);

  return (
    <ChatContext.Provider value={{ currentGroup, setCurrentGroup, chatList }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChats = () => useContext(ChatContext);

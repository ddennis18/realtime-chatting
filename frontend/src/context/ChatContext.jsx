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
  const [currentGroup, setCurrentGroupState] = useState({ name: "Study Group I", _id: "dsjgfhjkl" });
  const [chatList, setChatList] = useState([
    //test DATA
    { message: "Hey", createdAt: "12/12/34", sender: "you", _id: 3 },
    { message: "Hello", createdAt: "12/12/34", sender: "user1", _id: 2 },
    { message: "Wassup", createdAt: "12/12/34", sender: "user1", _id: 1 },
  ]);
  const { userData, groups } = useUser();

  const setCurrentGroup = useCallback((id) => {
    // DO SOME CHAT FETCHING LOGIC HERE
    
    const group = groups.find(g => g._id === id)
    setCurrentGroupState(group);
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

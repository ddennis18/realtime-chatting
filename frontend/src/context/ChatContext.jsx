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
  const [chatList, setChatList] = useState([]);

  const { user, isSignedIn } = useUser();
  const groups = isSignedIn ? user.groups : [];

  const setCurrentGroup = useCallback(
    (id) => {
      // DO SOME CHAT FETCHING LOGIC HERE

      const group = groups.find((g) => g._id === id);
      setCurrentGroupState(group);
    },
    [groups]
  );

  useEffect(() => {
    if (!isSignedIn) return;
    setCurrentGroup(groups[0]?._id);
  }, [groups]);

  return (
    <ChatContext.Provider value={{ currentGroup, setCurrentGroup, chatList }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChats = () => useContext(ChatContext);

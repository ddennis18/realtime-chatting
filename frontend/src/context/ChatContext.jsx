import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useUser } from "./UserContext";
import { io } from "socket.io-client";
import { getGroupMessages } from "../services/messageService";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [currentGroup, setCurrentGroupState] = useState({});
  const [chatList, setChatList] = useState([]);
  const socketRef = useRef(null);

  const { user, isSignedIn, accessToken } = useUser();
  const groups = isSignedIn ? user?.groups || [] : [];

  useEffect(() => {
    if (!isSignedIn) return;

    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("receive_message", (message) => {
      setChatList((prev) => [...prev, message]);
    });

    socketRef.current.on("message_error", (error) => {
      console.error("Message error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [isSignedIn]);

  const setCurrentGroup = useCallback(
    async (id) => {
      const group = groups.find((g) => g._id === id);
      if (!group) return;

      if (currentGroup._id && socketRef.current) {
        socketRef.current.emit("leave_room", currentGroup._id);
      }

      setCurrentGroupState(group);

      if (socketRef.current) {
        socketRef.current.emit("join_room", id);
      }

      const result = await getGroupMessages({ groupId: id, accessToken });
      if (result.ok) {
        setChatList(result.messages || []);
      }
    },
    [groups, currentGroup._id, accessToken]
  );

  const sendMessage = useCallback(
    (content) => {
      if (!content.trim() || !currentGroup._id || !socketRef.current) return;

      socketRef.current.emit("send_message", {
        content,
        room: currentGroup._id,
        sender: user._id,
      });
    },
    [currentGroup._id, user]
  );

  useEffect(() => {
    if (!isSignedIn || groups.length === 0) return;
    setCurrentGroup(groups[0]?._id);
  }, [groups, isSignedIn]);

  return (
    <ChatContext.Provider
      value={{ currentGroup, setCurrentGroup, chatList, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChats = () => useContext(ChatContext);

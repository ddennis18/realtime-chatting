import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useChats } from "../context/ChatContext";
import { useState, useRef, useEffect } from "react";

const ChatContainer = () => {
  const { chatList, sendMessage } = useChats();
  const [messageInput, setMessageInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendMessage(messageInput);
    setMessageInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  return (
    <div className="w-full h-full min-w-[300px] flex flex-col">
      <div className="h-full w-full p-1 bg-indigo-50">
        <div className="h-full border border-slate-500 bg-white rounded-lg shadow-lg overflow-y-auto py-1 px-4 space-y-1">
          {chatList.map((m) => {
            return <MessageBubble key={m._id} {...m} />;
          })}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form onSubmit={handleSend} className="p-2 flex flex-row gap-1">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="border-2 border-indigo-700 rounded-full w-full p-2"
        />
        <button
          type="submit"
          disabled={!messageInput.trim()}
          className="bg-indigo-700 hover:bg-indigo-700/90 font-semibold text-white px-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;

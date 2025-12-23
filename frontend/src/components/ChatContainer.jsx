import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useChats } from "../context/ChatContext";

const ChatContainer = () => {
  const { chatList } = useChats();

  return (
    <div className="w-full h-full min-w-[300px] flex flex-col">
      <div className="h-full w-full p-1 bg-indigo-50">
        <div className="h-full border border-slate-500 bg-white rounded-lg shadow-lg overflow-y-auto py-1 px-4 space-y-1">
          {chatList.map((m) => {
            return <MessageBubble key={m._id} {...m} />;
          })}
        </div>
      </div>
      <div className="p-2 flex flex-row gap-1">
        <input
          type="text"
          name=""
          id=""
          className="border-2 border-indigo-700 rounded-full w-full p-2"
        />
        <button className="bg-indigo-700 hover:bg-indigo-700/90  font-semibold text-white px-2 rounded-full ">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;

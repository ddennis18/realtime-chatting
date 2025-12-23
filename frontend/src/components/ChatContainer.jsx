import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";

const ChatContainer = ({
  messages = [
    { message: "Hey", createdAt: "12/12/34", sender: "you" },
    { message: "Hello", createdAt: "12/12/34", sender: "user1" },
    { message: "Wassup", createdAt: "12/12/34", sender: "user1" },
  ],
}) => {
  return (
    <div className="w-full h-full min-w-[300px] flex flex-col">
      <div className="h-full w-full p-1 bg-indigo-50">
        <div className="h-full bg-white rounded-lg shadow-lg overflow-y-auto px-4 space-y-1">
          {messages.map((m) => {
            return <MessageBubble {...m} />;
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
        <button className="bg-indigo-700 font-semibold text-white px-2 rounded-full ">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;

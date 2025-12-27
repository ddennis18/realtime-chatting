import { useUser } from "../context/UserContext";

const userMessageStyle =
  "bg-indigo-700 text-white rounded-[1rem_1rem_0rem_1rem] self-end";
const otherMessageStyle =
  "bg-indigo-50 text-black rounded-[1rem_1rem_1rem_0rem] self-start";

const MessageBubble = ({ content, createdAt, sender }) => {
  const { user } = useUser();
  const isUserMessage = sender._id === user._id;
  const senderName = sender.fullname || sender.username || "Unknown";

  return (
    <div
      className={`w-full flex flex-col ${
        isUserMessage ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`min-w-[50px] max-w-[80%] wrap-break-word p-2 ${
          isUserMessage ? userMessageStyle : otherMessageStyle
        }`}
      >
        {content}
      </div>
      <span
        className={`text-xs font-medium mb-1 px-2 ${
          isUserMessage ? "text-indigo-700" : "text-gray-600"
        }`}
      >
        {isUserMessage ? "You" : senderName}
      </span>
    </div>
  );
};
export default MessageBubble;

const userMessageStyle =
  "bg-indigo-700 text-white rounded-[1rem_1rem_0rem_1rem] self-end";
const otherMessageStyle =
  "bg-indigo-50 text-black rounded-[1rem_1rem_1rem_0rem] self-start";

const MessageBubble = ({ message, createdAt, sender }) => {
  const isUserMessage = sender === "you";

  return (
    <div className="w-full flex flex-col">
      <div
        className={`min-w-[50px] max-w-[80%] wrap-break-word  p-2 ${
          isUserMessage ? userMessageStyle : otherMessageStyle
        }`}
      >
        {message}
      </div>
    </div>
  );
};
export default MessageBubble;

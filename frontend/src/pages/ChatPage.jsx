import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-row">
      <Sidebar />
      <div className="w-full"> 
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatPage;

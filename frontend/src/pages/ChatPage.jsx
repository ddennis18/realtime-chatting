import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
      <div className="h-[80%] bg-slate-50 shadow-xl shadow-indigo-100 p-2 rounded-lg">
        <div className="flex flex-row justify-between w-full h-full">
          <Sidebar />
          <div className="flex flex-col justify-between">
            <ChatContainer/>
            <div className="w-full flex flex-row justify-center gap-1 border-t-1 border-slate-500 pt-2 mt-2">
              <input type="text" placeholder="s" className="border-indigo-500 border-2 rounded-full p-2 w-[80%]"  />
              <button className="bg-indigo-500 text-white p-2 rounded-full">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

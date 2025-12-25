import { MessageCircleCode } from "lucide-react";

const Navbar = ({ setAuthModal }) => {
  return (
    <div className="w-full bg-slate-50">
      <header className="mx-auto w-full h-16 max-w-7xl px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">
              <MessageCircleCode />
            </span>
          </div>
          ChatFlow
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setAuthModal((prev) => !prev)}
            className="p-2 text-white font-semibold bg-indigo-600 hover:bg-indigo-600/80 rounded-lg"
          >
            Login/Register
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

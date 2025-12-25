import { useState, useCallback } from "react";
import { useUser } from "../context/UserContext";
import { loginUser, registerUser } from "../services/userService.js";
import { X } from "lucide-react";

const AuthModal = ({ closeSelf }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { user, setUser } = useUser();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isLogin) {
        const userData = await registerUser({ username, fullname });
        if (!userData) {
          return;
        }
        setUser(userData);
      } else {
        const userData = await loginUser({ username });
        if (!userData) {
          return;
        }
        console.log(userData);
        setUser(userData);
      }
    },
    [isLogin, username, fullname]
  );

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-md">
      <div className="relative space-y-2 rounded-lg border border-slate-500 bg-white shadow-2xl w-[80%] md:w-[50%] py-4 px-8">
        <button onClick={()=>closeSelf()}>
          <X className="absolute right-[10px] top-[10px] hover:bg-indigo-600/80 transition-all stroke-white bg-indigo-600 p-1 rounded-lg" />
        </button>
        <h3 className="text-center text-2xl text-indigo-600 font-bold">
          {isLogin ? "Login" : "Register"}
        </h3>
        <form action="" className="flex flex-col gap-1">
          {!isLogin && (
            <>
              <label htmlFor="fullname" className="font-semibold">
                {" "}
                Enter Your Full Name{" "}
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                onChange={(e) => setFullname(e.target.value)}
                placeholder="eg: Johndoe"
                className="border-2 border-indigo-600 rounded-full px-2 py-1"
              />
            </>
          )}
          <p className="text-xs text-indigo-600/75">
            This is a test project and it doesnt support proper user auth (yet).
            Hence Your Username doubles as your password keep it safe{" "}
          </p>
          <label htmlFor="username" className="font-semibold">
            Enter Your User Name:{" "}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@"
            className="border-2 border-indigo-600 rounded-full px-2 py-1"
          />
          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={(e) => setIsLogin(!isLogin)}
              className="border-2 border-indigo-600 hover:bg-indigo-600 font-semibold text-indigo-600 hover:text-white px-2 rounded-full transition"
            >
              {isLogin ? "Register Instead" : "Login Instead"}
            </button>
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-600/90  font-semibold text-white p-1 rounded-full"
              onClick={handleSubmit}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

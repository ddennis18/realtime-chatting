/** This is a wrapper component that prevents a page from opening when the user is not Logged In */

import { LoaderPinwheel } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = ({ children }) => {
  const { isLoading, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <LoaderPinwheel className="size-12 stroke-indigo-600 animate-spin" />
        <h2 className="text-3xl text-indigo-600 font-semibold">Loading...</h2>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserPage;

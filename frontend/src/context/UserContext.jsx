import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "" });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [groups, setGroups] = useState([
    { name: "Study Group I", _id: "khgjkl;kh" },
    { name: "Study Group II", _id: "khgjkl;kh" },
  ]);

  return (
    <UserContext.Provider
      value={{ userData: user, setUser, isSignedIn, groups, setGroups }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

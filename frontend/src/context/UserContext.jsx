import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "" });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [groups, setGroups] = useState([
    { name: "Study Group I", _id: "dsjgfhjkl" },
    { name: "Study Group II", _id: "khgjkl;kh" },
    { name: "Study Group III", _id: ";kljhfsvm" },
    { name: "Study Group IV", _id: "147687yhs" },
    { name: "Study Group V", _id: "vdbdvsu" },
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

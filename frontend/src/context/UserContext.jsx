import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!user) {
      setIsSignedIn(false);
      return;
    }
    setIsSignedIn(true);
    setGroups(user.groups)
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userData: user,
        setUser,
        isSignedIn,
        groups,
        setGroups,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

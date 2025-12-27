import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  loginUser,
  refreshToken,
  registerUser,
  logoutUser,
} from "../services/userService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const checkLogin = async () => {
      const { user, accessToken } = (await refreshToken()) || {};
      if (!user || !accessToken) {
        return;
      }

      setUser(user);
      setIsSignedIn(true);
      setGroups(user.groups);
      setAccessToken(accessToken);
    };

    checkLogin();
    setIsLoading(false);
  }, []);

  const login = useCallback(async ({ username, password }) => {
    const result = (await loginUser({ username, password })) || {};
    const { user, accessToken, ok } = result;
    if (!ok) {
      setIsSignedIn(false);
      return result;
    }

    setUser(user);
    setIsSignedIn(true);
    setAccessToken(accessToken);
    return result;
  }, []);

  const logout = useCallback(async () => {
    const result = (await logoutUser()) || {};
    const { ok } = result;
    if (!ok) {
      return result;
    }

    setIsSignedIn(false);
    return result;
  }, []);

  const register = useCallback(async ({ username, fullname, password }) => {
    const result = (await registerUser({ username, fullname, password })) || {};
    const { user, accessToken, ok } = result;
    if (!ok) {
      setIsSignedIn(false);
      return result;
    }

    setUser(user);
    setIsSignedIn(true);
    setAccessToken(accessToken);
    setIsSignedIn(true);
    return result;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isSignedIn,
        isLoading,
        accessToken,
        login,
        register,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

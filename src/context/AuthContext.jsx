import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite.js";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const fetchUser = async () => {
    try {
      const res = await account.get();
      setUser(res);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Login user
  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    return fetchUser();
  };

  // Register user
  const register = async (email, password, name) => {
    await account.create(ID.unique(), email, password, name);
    return login(email, password); // Auto login after register
  };

  // Logout user
  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

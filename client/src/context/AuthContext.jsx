import { createContext, useEffect, useState } from "react";
import api from "../utils/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async ({ email, password }, navigate) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const userData = response.data.user;
      console.log(userData);
      setUser(userData);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const logout = (navigate) => {
    setUser(null);
    alert("You have been logged out.");
    navigate();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

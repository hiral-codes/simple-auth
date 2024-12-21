import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Hello");
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

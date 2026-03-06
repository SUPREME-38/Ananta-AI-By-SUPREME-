import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("ananta-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string) => {
    const u = { name: email.split("@")[0], email, joinedDate: new Date().toISOString() };
    setUser(u);
    localStorage.setItem("ananta-user", JSON.stringify(u));
  };

  const signup = (name: string, email: string, _password: string) => {
    const u = { name, email, joinedDate: new Date().toISOString() };
    setUser(u);
    localStorage.setItem("ananta-user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ananta-user");
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

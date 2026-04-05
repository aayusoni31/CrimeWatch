// global auth state
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true on first load

  // On app start — check if token exists and fetch user
  useEffect(() => {
    const token = localStorage.getItem("crimewatch_token");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("crimewatch_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("crimewatch_token", token);
    setUser(user);
    return user;
  };

  const register = async (formData) => {
    const res = await axios.post("/auth/register", formData);
    // Police accounts return pending:true — don't auto-login
    if (res.data.pending) return { pending: true, message: res.data.message };
    const { token, user } = res.data;
    localStorage.setItem("crimewatch_token", token);
    setUser(user);
    return { pending: false, user };
  };

  const logout = () => {
    localStorage.removeItem("crimewatch_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this everywhere instead of useContext(AuthContext)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

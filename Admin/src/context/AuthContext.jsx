import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Check Authentication
  // ==========================
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ==========================
  // Login
  // ==========================
  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // ==========================
  // Register
  // ==========================
  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);

    return data;
  };

  // ==========================
  // Logout
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

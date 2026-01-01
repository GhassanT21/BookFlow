import { createContext, useContext, useMemo, useState } from "react";
import { api, clearUser, getUser, setUser } from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());
  const navigate = useNavigate();

  function logout() {
    clearUser();
    setUserState(null);
    navigate("/");
  }

  function login(email, password) {
    return api.post("/login", { email, password }).then((res) => {
      setUser(res.data.user);
      setUserState(res.data.user);
      return res.data.user;
    });
  }

  function register(fullName, email, password) {
    return api.post("/register", { fullName, email, password }).then(() =>
      login(email, password)
    );
  }

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

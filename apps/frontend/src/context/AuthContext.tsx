import { createContext, useState, useEffect, type ReactNode } from "react";
import api from "../api/api";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
};

interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void;
  logout: () => void;
  verify: () => void;
  verified: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  const [verified, setVerified] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");

        if (token) {
          setAuth({
            isLoggedIn: true,
            token,
            user: res.data.user,
          });
        }
      } catch (err) {
        console.log("error fetching data!", err);
      }
    };

    fetchUser();
  }, []);

  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);

    setAuth({
      isLoggedIn: true,
      token,
      user,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      isLoggedIn: false,
      token: null,
      user: null,
    });
  };

  const verify = () => {
    setVerified(true);
  };

  console.log(auth);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, verify, verified }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

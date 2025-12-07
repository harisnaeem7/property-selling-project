import { createContext, useState, useEffect, type ReactNode } from "react";
import { userMe } from "../api/auth";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
};

interface AuthContextType extends AuthState {
  login: (token: string, user: string) => void;
  logout: () => void;
  verify: () => void;
  verified: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  const [verified, setVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await userMe();
        if (!token) {
          setLoading(false);
        }

        if (token) {
          setAuth({
            isLoggedIn: true,
            token,
            user: res.data.user,
          });
        }
      } catch (err) {
        console.log("error fetching data!", err);
      } finally {
        setLoading(false);
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

  return (
    <AuthContext.Provider
      value={{ ...auth, login, logout, verify, loading, verified }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

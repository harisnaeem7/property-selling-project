import { createContext, useState, useEffect, type ReactNode } from "react";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
};

interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
    user: null,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") || "null";

    if (token) {
      setAuth({
        isLoggedIn: true,
        token,
        user,
      });
    }
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

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext)!;
  return auth?.isLoggedIn ? children : <Navigate to="/account" replace />;
};

export default ProtectedRoute;

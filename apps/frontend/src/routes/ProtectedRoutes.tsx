import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext)!;
  const token = localStorage.getItem("token");
  const tempToken = localStorage.getItem("tempToken");

  if (!token && tempToken) {
    return <Navigate to="/auth/mfa-verify" replace />;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;

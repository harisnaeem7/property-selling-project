import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const tempToken = localStorage.getItem("tempToken");

  if (!token && tempToken) {
    return <Navigate to="/auth/mfa-verify" replace />;
  }

  return children;
};

export default ProtectedRoute;

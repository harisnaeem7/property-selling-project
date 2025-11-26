import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
//import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //const ProtectedRoute = () => {
  const auth = useContext(AuthContext)!;
  const [loading, setLoading] = useState(true);
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    //localStorage.clear();
    api
      .get("/user/me")
      .then((res) => {
        console.log("Verified user:", res.data);
        setVerify(true);
      })
      .catch(() => {
        console.log("Token invalid → Logging out...");
        auth.logout();
        setVerify(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Please wait....</div>;
  }

  if (!auth.isLoggedIn || !setVerify) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;

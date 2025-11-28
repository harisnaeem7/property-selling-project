import { Routes, Route } from "react-router-dom";
import Register from "../pages/account/register/index";
import Login from "../pages/account/login";
import Dashboard from "../pages/account/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../pages/account/forgotPassword";
import { Reset } from "../pages/account/reset";

const Routing = () => {
  return (
    <Routes>
      <Route path="account">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<Reset />} />
      </Route>
      <Route
        path="user"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Routing;

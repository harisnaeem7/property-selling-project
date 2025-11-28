import { Routes, Route } from "react-router-dom";
import Register from "../pages/account/Register";
import Login from "../pages/account/login";
import Dashboard from "../pages/account/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import { Outlet } from "react-router-dom";
import Reset from "../pages/account/reset";

const Routing = () => {
  return (
    <Routes>
      <Route path="account">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
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

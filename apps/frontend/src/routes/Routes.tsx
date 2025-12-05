import { Routes, Route } from "react-router-dom";
import Register from "../pages/account/register/index";
import Login from "../pages/account/login";
import Profile from "../pages/account/profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../pages/account/forgotPassword";
import { Reset } from "../pages/account/reset";
import { MFASetup } from "../pages/account/MFA";
import MFAVerifyLogin from "../pages/account/VerifyMFA";
import { Sell } from "../pages/property/sell";

const Routing = () => {
  return (
    <Routes>
      <Route path="account">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<Reset />} />
      </Route>
      <Route path="properties">
        <Route path="selling" element={<Sell />} />
      </Route>
      <Route
        path="user"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<Profile />} />
        <Route path="profile/mfa-setup" element={<MFASetup />} />
      </Route>
      <Route path="/auth/mfa-verify" element={<MFAVerifyLogin />} />
    </Routes>
  );
};

export default Routing;

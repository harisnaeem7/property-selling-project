import { Routes, Route } from "react-router";
import Register from "../pages/account/Register";
import Login from "../pages/account/Login";
import Dashboard from "../pages/account/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="account">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="user">
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Routing;

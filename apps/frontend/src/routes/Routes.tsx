import { Routes, Route } from "react-router";
import Register from "../pages/account/Register";
import Login from "../pages/account/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="account">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Routing;

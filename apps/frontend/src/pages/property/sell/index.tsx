import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const Sell = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  //   if (!user) return <h1>Loading...</h1>;
  return (
    <h1>
      Selling property Page {user?.firstName}, {user?.email}
    </h1>
  );
};

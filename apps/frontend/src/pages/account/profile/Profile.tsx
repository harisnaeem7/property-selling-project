import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Grid } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <>
      <h1>Profile</h1>

      {auth?.verified ? (
        <Grid
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 2, sm: 2, md: 2 }}
        >
          <CheckCircleOutlineIcon sx={{ color: "green" }} />
          <p>MFA enabled</p>
        </Grid>
      ) : (
        <button onClick={() => navigate("/user/profile/mfa-setup")}>
          Setup MFA
        </button>
      )}
      <Outlet />
    </>
  );
};

export default Profile;

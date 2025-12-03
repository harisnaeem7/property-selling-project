import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>This is Dashboard</h1>
      <button type="submit" onClick={() => navigate("/user/profile/mfa-setup")}>
        Setup mfa
      </button>
      <Outlet />
    </>
  );
};

export default Profile;

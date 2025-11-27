// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { LogInUser } from "../api/auth";
// import type { UserInput } from "../types/UserInput";

// export const useLogin = () => {
//   const [serverError, setServerError] = useState<string | null>(null);
//   const [backendError, setBackendError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const auth = useContext(AuthContext);

//   const handleLogin = async (data: UserInput) => {
//     setBackendError(null);
//     setServerError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await LogInUser(data);

//       // Store login data
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("user", response.email);

//       auth?.login(response.token, response.email); // context update
//       setSuccessMessage("Logged in successfully!");

//       navigate("/user/dashboard", { replace: true });
//     } catch (err: any) {
//       if (err.response?.data?.message) {
//         setBackendError(err.response.data.message);
//       } else {
//         setServerError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return {
//     handleLogin,
//     backendError,
//     serverError,
//     successMessage,
//   };
// };

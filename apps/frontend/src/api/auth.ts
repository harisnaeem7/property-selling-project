import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const RegisterUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
export const LogInUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const ForgotPassword = async (data: any) => {
  const response = await axios.post(`${API_URL}/auth/forgot`, data);
  return response.data;
};

export const ResetPassword = async (data: any, token: string) => {
  const response = await axios.post(`${API_URL}/auth/reset/${token}`, data);
  return response.data;
};

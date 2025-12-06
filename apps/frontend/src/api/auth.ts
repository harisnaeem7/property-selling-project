import api from "./api";

export const RegisterUser = async (data: any) => {
  const response = await api.post(`/auth/register`, data);
  return response;
};
export const LogInUser = async (data: any) => {
  const response = await api.post(`/auth/login`, data);
  return response;
};

export const ForgotPassword = async (data: any) => {
  const response = await api.post(`/auth/forgot`, data);
  return response;
};

export const ResetPassword = async (data: any, token: string) => {
  const response = await api.post(`/auth/reset/${token}`, data);
  return response;
};

export const setupMFA = async () => {
  const response = await api.post(`/auth/mfa/setup`);
  return response;
};

export const verifyMFA = async (data: any) => {
  const response = await api.post(`/auth/mfa/verify`, data);
  return response;
};

export const dashboardApi = async () => {
  const response = await api.get(`/dashboard`);
  return response;
};

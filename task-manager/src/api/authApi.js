// src/api/authApi.js

export const login = (email, password) => {
  return Promise.resolve({ token: "fake-token", user: { email } });
};

export const register = (data) => {
  return Promise.resolve({ success: true });
};

export const logout = () => {
  return Promise.resolve(true);
};

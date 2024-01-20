export const isLoggedIn = () => localStorage.getItem('token') !== null;

export const getToken = () => localStorage.getItem('token');

export const clearCredentials = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
};

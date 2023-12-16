export const isLoggedIn = () => localStorage.getItem('token') !== null;

export const getToken = () => localStorage.getItem('token');

'use client';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const logout = () => {
  Cookies.remove('cyberlegal-auth');
  sessionStorage.clear();
  toast.success('Logged out successfully');
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000);
};

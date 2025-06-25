"use client";

import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { useRef } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isLoggingOut = useRef(false);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setUser({ name: data.name, email: data.email, role: data.role });
      localStorage.setItem('token', data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      toast.success('Logged in successfully!');
      // MODIFIED: Redirect to the posts page after login
      router.push('/posts');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  // MODIFIED: Updated signup function to handle admin role
  const signup = async (name, email, password, isAdmin, adminCode) => {
     try {
      // Pass isAdmin and adminCode to the backend
      const { data } = await api.post('/auth/register', { name, email, password, isAdmin, adminCode });
      setToken(data.token);
      setUser({ name: data.name, email: data.email, role: data.role });
      localStorage.setItem('token', data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      toast.success('Signed up successfully!');
      // MODIFIED: Redirect to the posts page after signup
      router.push('/posts');
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  }

  const logout = useCallback(() => {
    isLoggingOut.current = true;
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    toast.success('Logged out.');
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      try {
        const decoded = jwtDecode(localToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setToken(localToken);
          api.defaults.headers.Authorization = `Bearer ${localToken}`;
          // Fetch fresh user profile
          api.get('/auth/profile').then(res => setUser(res.data)).catch(() => logout());
        } else {
          logout();
        }
      } catch (error) {
         console.error("Invalid token", error);
         logout();
      }
    }
    setLoading(false);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, signup, isLoggingOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
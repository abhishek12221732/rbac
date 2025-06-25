"use client";
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function AuthForm({ mode }) { // mode can be 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // NEW: State for admin registration
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      // Pass the new admin-related state to the signup function
      await signup(name, email, password, isAdmin, adminCode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{mode === 'login' ? 'Login' : 'Create an Account'}</h2>
      {mode === 'signup' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        </>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      
      {/* NEW: Admin registration fields */}
      {mode === 'signup' && (
        <>
          <div className="flex items-center">
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
              Sign up as an Admin
            </label>
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Code</label>
              <Input
                type="text"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter secret admin code"
                required
              />
            </div>
          )}
        </>
      )}

      <Button type="submit">{mode === 'login' ? 'Login' : 'Create Account'}</Button>
    </form>
  );
}
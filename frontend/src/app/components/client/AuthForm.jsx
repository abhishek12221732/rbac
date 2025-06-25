"use client";
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function AuthForm({ mode }) { // mode can be 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit">{mode === 'login' ? 'Login' : 'Create Account'}</Button>
    </form>
  );
}
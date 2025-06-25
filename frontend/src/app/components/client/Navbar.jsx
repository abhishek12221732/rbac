"use client";

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { LogIn, LogOut, User, Shield, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          RBAC Blog
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Blog link visible to everyone */}
          <Link href="/posts" className="flex items-center text-gray-600 hover:text-slate-900">
             <BookOpen className="w-5 h-5 mr-1"/> Posts
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin/dashboard" className="flex items-center text-gray-600 hover:text-slate-900">
                   <Shield className="w-5 h-5 mr-1"/> Dashboard
                </Link>
              )}
              <button onClick={logout} className="flex items-center text-red-500 hover:text-red-700">
                <LogOut className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:flex items-center text-gray-600 hover:text-slate-900">
                 <LogIn className="w-5 h-5 mr-1"/> Login
              </Link>
              <Link href="/signup" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
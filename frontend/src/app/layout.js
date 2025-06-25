import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/app/components/client/Navbar'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RBAC Blog Platform',
  description: 'A blog with role-based access control.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
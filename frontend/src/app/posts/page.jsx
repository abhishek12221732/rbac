"use client"; // Make this a client component to use hooks

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import api from '@/services/api';
import PostCard from '@/app/components/client/PostCard';
import toast from 'react-hot-toast';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the authentication check is complete
    if (!authLoading) {
      // If no user is found, redirect to login
      if (!user) {
        toast.error("You must be logged in to view posts.");
        router.push('/login');
      } else {
        // If user is authenticated, fetch posts
        const fetchPosts = async () => {
          try {
            const { data } = await api.get('/posts');
            setPosts(data);
          } catch (error) {
            console.error("Failed to fetch posts:", error);
            toast.error("Could not fetch posts.");
          } finally {
            setPageLoading(false);
          }
        };
        fetchPosts();
      }
    }
  }, [user, authLoading, router]);

  // Show a loading state while checking auth or fetching data
  if (authLoading || pageLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // This check handles the case where the redirect hasn't happened yet
  if (!user) {
      return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Community Blog Posts</h1>
      <p className="text-center text-gray-500">Explore articles written by our talented authors.</p>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts have been published yet.</p>
      )}
    </div>
  );
}
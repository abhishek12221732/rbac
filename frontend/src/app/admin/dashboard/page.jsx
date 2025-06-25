"use client";

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (error) {
      toast.error('Could not fetch posts.');
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        toast.error('Access Denied. Admins only.');
        router.push('/login');
      } else {
        fetchPosts();
      }
    }
  }, [user, loading, router]);
  
  const handleCreatePost = async (e) => {
      e.preventDefault();
      try {
          await api.post('/posts', { title, content });
          toast.success('Post created successfully!');
          setTitle('');
          setContent('');
          fetchPosts(); // Refresh posts list
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to create post.");
      }
  };

  const handleDeletePost = async (id) => {
    if(window.confirm('Are you sure you want to delete this post?')) {
        try {
            await api.delete(`/posts/${id}`);
            toast.success('Post deleted!');
            fetchPosts(); // Refresh posts list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete post.');
        }
    }
  };


  if (loading || !user || user.role !== 'admin') {
    return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading or redirecting...</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            ></textarea>
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post._id} className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-500">by {post.authorName}</p>
                    </div>
                    <button onClick={() => handleDeletePost(post._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100">
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
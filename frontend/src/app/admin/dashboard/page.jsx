"use client";

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Button } from '@/app/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
import PostFormModal from '@/app/components/client/PostFormModal';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

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

  const handleOpenModalForCreate = () => {
    setCurrentPost(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleSavePost = async (postData) => {
    try {
      if (currentPost) {
        await api.put(`/posts/${currentPost._id}`, postData);
        toast.success('Post updated successfully!');
      } else {
        await api.post('/posts', postData);
        toast.success('Post created successfully!');
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save post.');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted!');
        fetchPosts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete post.');
      }
    }
  };

  if (loading || !user || user.role !== 'admin') {
    return <div className="text-center py-10 text-gray-500">Loading or redirecting...</div>;
  }

  return (
    <>
      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
        post={currentPost}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleOpenModalForCreate}
              variant="outline"
              className="rounded-xl px-6 py-4 text-sm hover:scale-105 transition-transform border-3 flex"
            >
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Posts</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="p-5 rounded-xl border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex items-center" size="sm" variant="outline" onClick={() => handleOpenModalForEdit(post)}>
                      <Edit size={16} className="mr-1" /> Edit
                    </Button>
                    <Button className="flex items-center text-red-600 hover:text-red-700" size="sm" variant="destructive" onClick={() => handleDeletePost(post._id)}>
                      <Trash2 size={16} className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full py-6">No posts yet. Click “New Post” to begin.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
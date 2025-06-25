import api from '@/services/api';
import PostCard from '@/app/components/client/PostCard';

async function getPosts() {
    try {
        const { data } = await api.get('/posts');
        return data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Latest Blog Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
}
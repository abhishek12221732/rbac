// Simple card to display post info
export default function PostCard({ post }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <div className="text-sm text-gray-500">
                <p>By: {post.authorName}</p>
                <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    )
}
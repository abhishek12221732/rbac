"use client";

import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Modal from '../ui/Modal';

export default function PostFormModal({ isOpen, onClose, onSave, post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // If a post is passed, we're in "edit" mode
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      // Otherwise, we're in "create" mode
      setTitle('');
      setContent('');
    }
  }, [post, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={post ? 'Edit Post' : 'Create New Post'}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            rows="8"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">Cancel</Button>
            <Button type="submit">Save Post</Button>
        </div>
      </form>
    </Modal>
  );
}
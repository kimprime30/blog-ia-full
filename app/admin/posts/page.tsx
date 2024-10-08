"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// Definindo a interface para os posts
interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get<Post[]>("/api/posts");
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <Link href={`/admin/posts/edit/${post._id}`}>
              <button className="btn text-blue-500 hover:underline">
                Editar
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

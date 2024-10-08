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

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get<Post[]>("/api/posts");
      setPosts(data);
    }
    fetchPosts();
  }, []);

  async function handleDelete(id: string) {
    await axios.delete(`/api/posts/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Painel Administrativo</h1>
      <Link href="/admin/posts/create">
        <button className="btn mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Criar Novo Post
        </button>
      </Link>
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
            <button
              className="btn text-red-500 hover:underline"
              onClick={() => handleDelete(post._id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Definindo a interface para os posts
interface Post {
  _id: string;
  title: string;
  content: string;
}

// Definindo a interface para os parâmetros
interface Params {
  id: string;
}

export default function EditPostPage({ params }: { params: Params }) {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get<Post>(`/api/posts/${id}`);
      setTitle(data.title);
      setContent(data.content);
    }
    fetchPost();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios.put(`/api/posts/${id}`, { title, content });
    router.push("/admin/posts");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Editar Post</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block text-gray-700">Título</label>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Conteúdo</label>
          <textarea
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Atualizar Post
        </button>
      </form>
    </div>
  );
}

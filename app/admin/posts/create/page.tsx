"use client";
// app/admin/posts/create/page.tsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author, category }),
    });

    if (res.ok) {
      router.push("/admin/posts"); // Redireciona para a página de posts após criar
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Criar Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mt-4">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mt-4">Conteúdo</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mt-4">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mt-4">Categoria</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Criar Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

// app/page.tsx
import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">Bem-vindo ao Meu Blog!</h2>
      <p className="mt-2">
        Este é um blog de exemplo construído com Next.js, TypeScript e Tailwind
        CSS.
      </p>
      <a href="/posts" className="text-blue-500 hover:underline">
        Ver todos os posts
      </a>
    </div>
  );
};

export default HomePage;

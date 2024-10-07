// app/layout.tsx
import React from "react";
import "../styles/globals.css"; // Importando os estilos globais

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <head>
        <title>Meu Blog</title>
      </head>
      <body>
        <header>
          <h1>Meu Blog</h1>
          <nav>{/* Links de navegação podem ser adicionados aqui */}</nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 Meu Blog. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;

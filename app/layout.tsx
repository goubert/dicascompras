import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Dicas de Produtos", description: "Guia de produtos por categoria" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo"><Link href="/">Dicas de Produtos</Link></header>
        {children}
      </body>
    </html>
  );
}

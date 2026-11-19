import { notFound } from "next/navigation";
import { listarCategorias, listarProdutos, tituloCategoria } from "@/lib/produtos";
import CardProduto from "@/components/CardProduto";

export const dynamicParams = false;
export const generateStaticParams = () => listarCategorias().map((categoria) => ({ categoria }));

export default async function Categoria({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const produtos = listarProdutos(categoria);
  if (!produtos.length) notFound();
  return (
    <main className="container">
      <h1>{tituloCategoria(categoria)}</h1>
      <div className="grade-cards">
        {produtos.map((p) => <CardProduto key={p.slug} produto={p} />)}
      </div>
    </main>
  );
}

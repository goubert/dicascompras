import Link from "next/link";
import { listarCategorias, listarProdutos, tituloCategoria } from "@/lib/produtos";
import CardProduto from "@/components/CardProduto";

export default function Home() {
  return (
    <main className="container">
      {listarCategorias().map((cat) => (
        <section key={cat} className="bloco">
          <h2><Link href={`/${cat}`}>{tituloCategoria(cat)}</Link></h2>
          <div className="grade-cards">
            {listarProdutos(cat).map((p) => <CardProduto key={p.slug} produto={p} />)}
          </div>
        </section>
      ))}
    </main>
  );
}

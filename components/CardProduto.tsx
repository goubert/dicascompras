import Link from "next/link";
import { Produto, urlFoto } from "@/lib/produtos";

export default function CardProduto({ produto: p }: { produto: Produto }) {
  const foto = urlFoto(p);
  return (
    <Link href={`/${p.categoria}/${p.slug}`} className="card">
      <div className="card-foto">{foto && <img src={foto} alt={p.nome} />}</div>
      <h3>{p.nome}</h3>
      {p.links[0] && <span>A partir de {p.links[0].preco}</span>}
    </Link>
  );
}

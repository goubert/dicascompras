import { notFound } from "next/navigation";
import { getProduto, listarCategorias, listarProdutos, urlFoto } from "@/lib/produtos";
import VideoGallery from "@/components/VideoGallery";

export const dynamicParams = false;
export const generateStaticParams = () =>
  listarCategorias().flatMap((c) => listarProdutos(c).map((p) => ({ categoria: c, produto: p.slug })));

type Props = { params: Promise<{ categoria: string; produto: string }> };

export async function generateMetadata({ params }: Props) {
  const { categoria, produto } = await params;
  return { title: getProduto(categoria, produto)?.nome ?? "Produto" };
}

export default async function PaginaProduto({ params }: Props) {
  const { categoria, produto: slug } = await params;
  const p = getProduto(categoria, slug);
  if (!p) notFound();
  const foto = urlFoto(p);

  return (
    <>
      {/* HERO escuro */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-foto">{foto && <img src={foto} alt={p.nome} />}</div>
          <div>
            <small>Tudo sobre:</small>
            <h1>{p.nome}</h1>
            <div className="resumo">
              {p.resumo.map((r) => (
                <div key={r.label} className="resumo-item"><span>{r.label}</span><strong>{r.valor}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        {/* Descrição + links de compra */}
        <div className="duas-colunas">
          <div>
            {p.descricao.map((d, i) => (
              <section key={i} className="bloco"><h2>{d.titulo}</h2><p>{d.texto}</p></section>
            ))}
          </div>
          <aside className="comprar">
            <h3>Links para comprar</h3>
            <p>Se curtiu o conteúdo, considere comprar nos links abaixo</p>
            {p.links.map((l, i) => (
              <div key={i} className="comprar-item">
                <span>{l.loja}</span><strong>{l.preco}</strong>
                <a href={l.url} target="_blank" rel="noopener noreferrer sponsored">Ver oferta</a>
              </div>
            ))}
          </aside>
        </div>

        {/* Especificações */}
        <section className="bloco">
          <h2>Especificações</h2>
          <div className="grade-specs">
            {p.especificacoes.map((e) => (
              <div key={e.grupo} className="spec">
                <small>{e.grupo}</small>
                <h4>{e.titulo}</h4>
                <dl>
                  {e.itens.map((it, i) => (<div key={i}><dt>{it.label}</dt><dd>{it.valor}</dd></div>))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Vídeos */}
        {p.videos.length > 0 && (
          <section className="bloco">
            <h2>Seleção de vídeos com o produto</h2>
            <VideoGallery videos={p.videos} />
          </section>
        )}

        {/* Componentes */}
        <section className="bloco">
          <h2>Saiba mais sobre os componentes</h2>
          <div className="grade-3">
            {p.componentes.map((c, i) => (<div key={i} className="spec"><h4>{c.titulo}</h4><p>{c.texto}</p></div>))}
          </div>
        </section>
      </main>
    </>
  );
}

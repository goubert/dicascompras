import fs from "node:fs";
import path from "node:path";

// Cada produto vive em: public/produtos/<categoria>/<produto>/
//   produto.json  -> dados da página
//   fotos/        -> imagens do produto
const RAIZ = path.join(process.cwd(), "public", "produtos");

export type Item = { label: string; valor: string };
export type Produto = {
  slug: string;
  categoria: string;
  nome: string;
  resumo: Item[];
  descricao: { titulo: string; texto: string }[];
  links: { loja: string; preco: string; url: string }[];
  especificacoes: { grupo: string; titulo: string; itens: Item[] }[];
  videos: { id: string; titulo: string }[];
  componentes: { titulo: string; texto: string }[];
  fotos: string[];
};

export const tituloCategoria = (slug: string) =>
  slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const pastas = (dir: string) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : [];

export function listarCategorias(): string[] {
  return pastas(RAIZ);
}

export function getProduto(categoria: string, slug: string): Produto | null {
  const arquivo = path.join(RAIZ, categoria, slug, "produto.json");
  if (!fs.existsSync(arquivo)) return null;
  const dados = JSON.parse(fs.readFileSync(arquivo, "utf-8"));
  return { ...dados, slug, categoria };
}

export function listarProdutos(categoria: string): Produto[] {
  return pastas(path.join(RAIZ, categoria))
    .map((slug) => getProduto(categoria, slug))
    .filter((p): p is Produto => p !== null);
}

export const urlFoto = (p: Produto, i = 0) =>
  p.fotos[i] ? `/produtos/${p.categoria}/${p.slug}/fotos/${p.fotos[i]}` : null;

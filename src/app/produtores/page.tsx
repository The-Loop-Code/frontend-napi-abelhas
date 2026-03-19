export const metadata = { title: "Produtores – NAPI Abelhas" };

export default function ProdutoresPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtores</h1>
        <a href="/produtores/novo" className="btn btn-primary btn-sm">
          + Novo Produtor
        </a>
      </div>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p className="text-base-content/60">
            Carregando lista de produtores…
          </p>
        </div>
      </div>
    </div>
  );
}

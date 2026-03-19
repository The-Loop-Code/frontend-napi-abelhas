export const metadata = { title: "Amostras – NAPI Abelhas" };

export default function AmostraPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Amostras</h1>
        <a href="/amostras/nova" className="btn btn-primary btn-sm">
          + Nova Amostra
        </a>
      </div>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p className="text-base-content/60">
            Carregando lista de amostras…
          </p>
        </div>
      </div>
    </div>
  );
}

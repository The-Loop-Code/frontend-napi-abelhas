export const metadata = { title: "Novo Produtor – NAPI Abelhas" };

export default function NovoProdutorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Novo Produtor</h1>
      <div className="card bg-base-100 shadow max-w-xl">
        <div className="card-body">
          <p className="text-base-content/60">
            Formulário de cadastro de produtor.
          </p>
        </div>
      </div>
    </div>
  );
}

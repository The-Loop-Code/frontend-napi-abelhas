export default function RegisterPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">🍯 NAPI Abelhas</h1>
          <p className="py-4 text-base-content/70">Criar nova conta</p>
        </div>
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body">
            <h2 className="card-title">Cadastro</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nome completo</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="João da Silva"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">E-mail</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="seu@email.com"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Senha</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="••••••••"
              />
            </fieldset>
            <div className="card-actions mt-2">
              <button className="btn btn-primary w-full">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

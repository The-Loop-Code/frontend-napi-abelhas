export enum TipoAnalise {
  FISICOQUIMICA = "FISICOQUIMICA",
  MICROBIOLOGICA = "MICROBIOLOGICA",
  SENSORIAL = "SENSORIAL",
  RESIDUOS = "RESIDUOS",
}

export enum TipoAmostra {
  MEL = "MEL",
  PROPOLIS = "PROPOLIS",
  GELEIA_REAL = "GELEIA_REAL",
  CERA = "CERA",
  POLEN = "POLEN",
}

export enum StatusAmostra {
  PENDENTE = "PENDENTE",
  EM_ANALISE = "EM_ANALISE",
  CONCLUIDA = "CONCLUIDA",
  REJEITADA = "REJEITADA",
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  AMOSTRAS: "/amostras",
  AMOSTRAS_NOVA: "/amostras/nova",
  PRODUTORES: "/produtores",
  PRODUTORES_NOVO: "/produtores/novo",
} as const;

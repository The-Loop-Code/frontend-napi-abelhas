export enum StatusAmostra {
  PENDENTE = "PENDENTE",
  EM_ANALISE = "EM_ANALISE",
  CONCLUIDA = "CONCLUIDA",
  REJEITADA = "REJEITADA",
}

export enum FileType {
  IMAGE = "IMAGE",
  TEXTO = "TEXTO",
  PDF = "PDF",
  OUTROS = "OUTROS",
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CIDADES_IBGE: "/cidades-ibge",
  PRODUTORES: "/produtores",
  PRODUTORES_NOVO: "/produtores/novo",
  RESPONSAVEIS: "/responsaveis",
  TIPOS_AMOSTRA: "/tipos-amostra",
  TIPOS_ANALISE: "/tipos-analise",
  ABELHAS: "/abelhas",
  PONTOS_COLETA: "/pontos-coleta",
  AMOSTRAS: "/amostras",
  AMOSTRAS_NOVA: "/amostras/nova",
  ANALISES: "/analises",
  FILE_GROUPS: "/file-groups",
} as const;

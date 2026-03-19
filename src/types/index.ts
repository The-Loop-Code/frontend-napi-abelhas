import { StatusAmostra, TipoAmostra, TipoAnalise } from "@/constants";

export interface Produtor {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpfCnpj: string;
  endereco?: Endereco;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude?: number;
  longitude?: number;
}

export interface Amostra {
  id: string;
  codigo: string;
  tipo: TipoAmostra;
  status: StatusAmostra;
  produtorId: string;
  produtor?: Produtor;
  dataColeta: string;
  localizacao?: Localizacao;
  analises?: Analise[];
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Localizacao {
  latitude: number;
  longitude: number;
  descricao?: string;
}

export interface Analise {
  id: string;
  amostraId: string;
  tipo: TipoAnalise;
  resultado?: string;
  laudoUrl?: string;
  realizadaEm?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

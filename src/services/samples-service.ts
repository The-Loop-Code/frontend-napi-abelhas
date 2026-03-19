import { api } from "@/services/api";
import type { Amostra, PaginatedResponse } from "@/types";

export interface ListAmostraParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  tipo?: string;
  produtorId?: string;
}

export interface CreateAmostraPayload {
  tipo: string;
  produtorId: string;
  dataColeta: string;
  localizacao?: {
    latitude: number;
    longitude: number;
    descricao?: string;
  };
  observacoes?: string;
}

export interface UpdateAmostraPayload extends Partial<CreateAmostraPayload> {
  status?: string;
}

function buildQuery(params: ListAmostraParams): string {
  const searchParams = new URLSearchParams();
  if (params.page != null) searchParams.set("page", String(params.page));
  if (params.pageSize != null)
    searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);
  if (params.status) searchParams.set("status", params.status);
  if (params.tipo) searchParams.set("tipo", params.tipo);
  if (params.produtorId) searchParams.set("produtorId", params.produtorId);
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const samplesService = {
  list: (params: ListAmostraParams = {}) =>
    api.get<PaginatedResponse<Amostra>>(`/amostras${buildQuery(params)}`),

  getById: (id: string) => api.get<Amostra>(`/amostras/${id}`),

  create: (payload: CreateAmostraPayload) =>
    api.post<Amostra>("/amostras", payload),

  update: (id: string, payload: UpdateAmostraPayload) =>
    api.put<Amostra>(`/amostras/${id}`, payload),

  remove: (id: string) => api.delete<void>(`/amostras/${id}`),
};

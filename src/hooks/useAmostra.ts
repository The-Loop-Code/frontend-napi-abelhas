"use client";

import { useCallback, useEffect, useState } from "react";
import { amostrasService, type ListAmostrasParams } from "@/services/amostras-service";
import type { Amostra, PaginatedResponse } from "@/types";

interface UseAmostraReturn {
  amostras: Amostra[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchAmostras: (params?: ListAmostrasParams) => Promise<void>;
  setPage: (page: number) => void;
}

export function useAmostra(initialParams: ListAmostrasParams = {}): UseAmostraReturn {
  const [result, setResult] = useState<PaginatedResponse<Amostra>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ListAmostrasParams>({
    page: 1,
    pageSize: 10,
    ...initialParams,
  });

  const fetchAmostras = useCallback(
    async (overrideParams?: ListAmostrasParams) => {
      setLoading(true);
      setError(null);
      try {
        const merged = { ...params, ...overrideParams };
        const data = await amostrasService.list(merged);
        setResult(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Erro ao carregar amostras.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  useEffect(() => {
    fetchAmostras();
  }, [fetchAmostras]);

  const setPage = (page: number) =>
    setParams((prev) => ({ ...prev, page }));

  return {
    amostras: result.data,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    loading,
    error,
    fetchAmostras,
    setPage,
  };
}

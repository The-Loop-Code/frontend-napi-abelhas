# Criação de Código

Diretrizes para criar novos componentes, hooks, serviços e páginas no projeto NAPI Abelhas.

## Componentes (Atomic Design)

### Atoms (`src/components/atoms/`)

Elementos visuais básicos e reutilizáveis, sem lógica de negócio.

```typescript
"use client";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick: () => void;
}

export function Button({ label, variant = "primary", disabled = false, onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

**Regras:**

- Props tipadas com `interface <Nome>Props`.
- Sem `any`. Sem estado complexo. Sem chamadas a serviços.
- Classes de estilo via Tailwind CSS / DaisyUI.
- `"use client"` somente se usar hooks do React (useState, useEffect, etc.).

### Molecules (`src/components/molecules/`)

Composições de atoms com lógica local mínima.

```typescript
"use client";

import { useState } from "react";
import { Input } from "@/components/atoms";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ placeholder = "Buscar...", onSearch }: SearchBarProps) {
  const [term, setTerm] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSearch(term);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder={placeholder} />
    </form>
  );
}
```

### Organisms (`src/components/organisms/`)

Componentes complexos que podem consumir hooks e conter lógica de negócio.

```typescript
"use client";

import { useAmostra } from "@/hooks/useAmostra";
import { AmostraTable } from "@/components/organisms";

export function AmostraList() {
  const { amostras, loading, error } = useAmostra();

  if (loading) return <span className="loading loading-spinner" />;
  if (error) return <p className="text-error">{error}</p>;

  return <AmostraTable amostras={amostras} />;
}
```

### Templates (`src/components/templates/`)

Layouts de página. Recebem conteúdo via `children` ou props nomeadas.

```typescript
import { Sidebar } from "@/components/organisms";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export function DashboardTemplate({ children }: DashboardTemplateProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

## Custom Hooks (`src/hooks/`)

- Nomeie com `use<Nome>`.
- Retorne objeto tipado — nunca `any`.
- Encapsule lógica de estado e efeitos colaterais.

```typescript
import { useState, useEffect, useCallback } from "react";
import { samplesService } from "@/services/samples-service";
import type { Amostra, PaginatedResponse } from "@/types";

interface UseAmostraReturn {
  amostras: Amostra[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchAmostras: (page?: number) => Promise<void>;
}

export function useAmostra(): UseAmostraReturn {
  // implementação...
}
```

## Serviços (`src/services/`)

- Utilize o client HTTP genérico de `src/services/api.ts`.
- Tipar todos os payloads e respostas.
- Um serviço por domínio (ex.: `samples-service.ts`, `producers-service.ts`).

```typescript
import { api } from "@/services/api";
import type { Produtor, PaginatedResponse } from "@/types";

interface ListProdutoresParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const produtoresService = {
  async list(params: ListProdutoresParams = {}): Promise<PaginatedResponse<Produtor>> {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.pageSize) query.set("pageSize", String(params.pageSize));
    if (params.search) query.set("search", params.search);

    return api.get<PaginatedResponse<Produtor>>(`/produtores?${query.toString()}`);
  },
};
```

## Páginas (`src/app/`)

- Siga o App Router do Next.js 16.
- Server Components por padrão para páginas.
- Use `"use client"` somente em componentes interativos internos.
- Consulte `node_modules/next/dist/docs/` para APIs atualizadas.

## Exportações

Todo novo componente, hook ou tipo deve ser re-exportado no `index.ts` do diretório:

```typescript
// src/components/atoms/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Badge } from "./Badge";
export { NovoAtom } from "./NovoAtom"; // adicionar aqui
```

## Checklist de Criação

- [ ] Arquivo criado no diretório correto do Atomic Design.
- [ ] Props tipadas via `interface` — nenhum `any`.
- [ ] Componente exportado no `index.ts` correspondente.
- [ ] Importações usando alias `@/*`.
- [ ] Sem lógica de negócio em atoms/molecules.
- [ ] `"use client"` adicionado somente se necessário.
- [ ] Tailwind CSS / DaisyUI para estilização.
- [ ] Wiki consultada para regras de negócio do domínio.

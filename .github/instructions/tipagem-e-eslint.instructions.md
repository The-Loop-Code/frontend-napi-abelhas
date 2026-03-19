# Tipagem e ESLint

Regras de tipagem TypeScript e linting para o projeto NAPI Abelhas.

## TypeScript — Regras de Tipagem

### Proibições

| Prática                    | Motivo                                                |
| -------------------------- | ----------------------------------------------------- |
| `any`                      | Proibido em todos os contextos. Use tipos específicos. |
| `as any`                   | Proibido. Prefira `as` com tipo correto ou type guard. |
| `// @ts-ignore`            | Proibido. Corrija o erro de tipo em vez de silenciá-lo. |
| `// @ts-expect-error`      | Permitido somente com justificativa documentada.       |
| `Function` (tipo genérico) | Proibido. Use assinaturas tipadas.                     |
| `object` (tipo genérico)   | Proibido. Defina interface ou `Record<string, T>`.     |

### Alternativas ao `any`

```typescript
// ❌ any
function parse(data: any): any { ... }

// ✅ Genérico
function parse<T>(data: string): T { ... }

// ✅ unknown + type guard
function parse(data: unknown): Amostra {
  if (!isAmostra(data)) throw new Error("Dados inválidos");
  return data;
}

// ✅ Union types
function handleEvent(event: MouseEvent | KeyboardEvent): void { ... }

// ✅ Record para objetos dinâmicos
function processConfig(config: Record<string, string>): void { ... }
```

### Tipagem de Componentes

```typescript
// Props com interface nomeada
interface BadgeProps {
  label: string;
  variant: "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}

export function Badge({ label, variant, size = "md" }: BadgeProps): React.ReactElement {
  return <span className={`badge badge-${variant} badge-${size}`}>{label}</span>;
}
```

### Tipagem de Hooks

```typescript
// Retorno tipado via interface
interface UseAmostraReturn {
  amostras: Amostra[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchAmostras: (page?: number) => Promise<void>;
  setPage: (page: number) => void;
}

export function useAmostra(): UseAmostraReturn { ... }
```

### Tipagem de Serviços

```typescript
// Parâmetros e retornos tipados
interface ListAmostrasParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: StatusAmostra;
  tipo?: TipoAmostra;
  produtorId?: string;
}

export const samplesService = {
  async list(params?: ListAmostrasParams): Promise<PaginatedResponse<Amostra>> { ... },
  async getById(id: string): Promise<Amostra> { ... },
  async create(data: Omit<Amostra, "id" | "createdAt" | "updatedAt">): Promise<Amostra> { ... },
};
```

### Tipagem de Eventos

```typescript
// ❌ Evitar
function handleChange(e: any) { ... }

// ✅ Correto
function handleChange(e: React.ChangeEvent<HTMLInputElement>): void { ... }
function handleSubmit(e: React.FormEvent<HTMLFormElement>): void { ... }
function handleClick(e: React.MouseEvent<HTMLButtonElement>): void { ... }
```

### Enums e Constantes Tipadas

Utilize os enums existentes em `src/constants/`:

```typescript
import { StatusAmostra, TipoAmostra, TipoAnalise } from "@/constants";

// Enum como tipo de prop
interface FilterProps {
  status: StatusAmostra;
  tipo: TipoAmostra;
}
```

## ESLint — Regras de Linting

### Configuração Recomendada

O projeto deve utilizar ESLint com as seguintes regras alinhadas aos princípios do projeto:

```
@typescript-eslint/no-explicit-any        → error
@typescript-eslint/explicit-function-return-type → warn
@typescript-eslint/no-unused-vars          → error
no-console                                 → warn
react/jsx-no-leaked-render                 → error
```

### Validação Manual

Enquanto ESLint não estiver configurado, valide manualmente:

```bash
# Verificar erros de tipo
npx tsc --noEmit

# Buscar usos de 'any' no código
grep -rn ":\s*any" src/ --include="*.ts" --include="*.tsx"
grep -rn "as any" src/ --include="*.ts" --include="*.tsx"
```

## Prettier — Formatação

### Configuração Recomendada

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

### Validação Manual

Enquanto Prettier não estiver configurado, siga as convenções:

- Indentação com 2 espaços.
- Aspas duplas para strings.
- Ponto e vírgula ao final de statements.
- Trailing comma em objetos e arrays multilinhas.
- Largura máxima de 100 caracteres por linha.

## Checklist de Tipagem

- [ ] Nenhum `any`, `as any`, `@ts-ignore` no código.
- [ ] Props tipadas com `interface <Nome>Props`.
- [ ] Retorno de hooks tipado com `interface Use<Nome>Return`.
- [ ] Eventos do React tipados (`React.ChangeEvent`, `React.FormEvent`, etc.).
- [ ] Serviços com parâmetros e retornos tipados.
- [ ] Enums do projeto utilizados em vez de strings literais quando aplicável.
- [ ] Compilação sem erros: `npx tsc --noEmit`.
- [ ] Sem uso de `Function`, `object` ou `{}` como tipos.

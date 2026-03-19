# GitHub Copilot — Instruções Gerais

## Sobre o Projeto

Este é o **frontend do NAPI Abelhas**, um sistema de gestão de amostras apícolas (mel, própolis, pólen, geleia real, cera) com rastreamento de análises de qualidade. Construído com:

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (modo `strict`)
- **Tailwind CSS v4** + **DaisyUI v5**
- **PostCSS** com plugin `@tailwindcss/postcss`

## Princípios Fundamentais

1. **Atomic Design** — Componentes organizados em `atoms`, `molecules`, `organisms` e `templates`.
2. **Clean Code** — Código legível, funções pequenas, nomes descritivos.
3. **DRY** — Não repita lógica; extraia utilitários, hooks e componentes reutilizáveis.
4. **SOLID** — Responsabilidade única, inversão de dependência, segregação de interfaces.
5. **Tipagem forte** — `any` é **proibido**. Todo código deve ser completamente tipado.

## Estrutura do Projeto

```
src/
├── app/            # Rotas Next.js (App Router)
├── components/
│   ├── atoms/      # Elementos básicos (Button, Input, Badge)
│   ├── molecules/  # Composições simples (FormField, SearchBar)
│   ├── organisms/  # Composições complexas (Sidebar, AmostraTable, AnaliseModal)
│   └── templates/  # Layouts de página (DashboardTemplate)
├── constants/      # Enums, rotas e constantes
├── hooks/          # Custom hooks (useAmostra, etc.)
├── services/       # Camada de API (api.ts, samples-service.ts)
├── types/          # Interfaces e tipos TypeScript
└── utils/          # Funções utilitárias
```

## Convenções de Importação

Utilize o alias `@/*` para importações absolutas a partir de `src/`:

```typescript
import { Button } from "@/components/atoms";
import { Amostra } from "@/types";
import { StatusAmostra } from "@/constants";
```

## Módulos de Instrução

Consulte os módulos específicos em `.github/instructions/` para orientações detalhadas:

- **[Análise de Código](instructions/analise-de-codigo.instructions.md)** — Diretrizes para revisão e análise de código.
- **[Criação de Código](instructions/criacao-de-codigo.instructions.md)** — Padrões para criar novos componentes, hooks e serviços.
- **[Manutenção de Código](instructions/manutencao-de-codigo.instructions.md)** — Orientações para refatoração e correção de bugs.
- **[Tipagem e ESLint](instructions/tipagem-e-eslint.instructions.md)** — Regras de tipagem TypeScript e linting.

## Regras Gerais

- Sempre leia a documentação do Next.js em `node_modules/next/dist/docs/` antes de implementar funcionalidades — esta versão possui breaking changes.
- Mantenha componentes Server Components por padrão; use `"use client"` somente quando necessário.
- Exporte componentes e tipos através dos arquivos `index.ts` de cada diretório.
- Siga as enums e tipos existentes em `src/types/` e `src/constants/`.
- Consulte a wiki do repositório para regras de negócio e fluxos do sistema antes de fazer alterações.

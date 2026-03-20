# Análise de Código

Diretrizes para revisão e análise de código no projeto NAPI Abelhas.

## Checklist de Revisão

### Tipagem

- [ ] Nenhum uso de `any` — utilize tipos específicos, genéricos ou `unknown` quando necessário.
- [ ] Interfaces e tipos definidos em `src/types/` ou co-localizados no módulo.
- [ ] Props de componentes tipadas com `interface` nomeada (`<Nome>Props`).
- [ ] Retornos de funções explicitamente tipados.
- [ ] Tipos de retorno de serviços correspondem ao que a API realmente retorna (ex.: `T[]` se backend retorna array, não `PaginatedResponse<T>`).
- [ ] Hooks e componentes usam acesso defensivo a dados da API (`Array.isArray()`, inicialização com `[]`).

### Atomic Design

- [ ] **Atoms**: sem lógica de negócio, sem chamadas a serviços, sem estado global.
- [ ] **Molecules**: compõem atoms; estado local mínimo.
- [ ] **Organisms**: podem conter lógica de negócio e hooks; compõem molecules e atoms.
- [ ] **Templates**: definem layout; recebem conteúdo via `children` ou slots.
- [ ] Componente está no nível correto da hierarquia Atomic Design.

### Clean Code

- [ ] Funções com responsabilidade única (máximo ~30 linhas).
- [ ] Nomes descritivos em inglês para variáveis, funções e tipos. Comentários em português são aceitáveis quando esclarecem regras de negócio.
- [ ] Sem código comentado ou dead code.
- [ ] Sem `console.log` em código de produção.
- [ ] Early returns para reduzir aninhamento.

### DRY

- [ ] Lógica duplicada foi extraída para `src/utils/`, custom hook ou componente reutilizável.
- [ ] Constantes e strings mágicas estão em `src/constants/`.
- [ ] Estilos repetidos foram extraídos para classes Tailwind reutilizáveis ou componentes.

### SOLID

- [ ] **S** — Cada módulo/componente tem uma única responsabilidade.
- [ ] **O** — Componentes são extensíveis via props, não por modificação interna.
- [ ] **L** — Componentes derivados respeitam o contrato do componente base.
- [ ] **I** — Interfaces de props não forçam dependências desnecessárias.
- [ ] **D** — Serviços são injetados via hooks ou props, não importados diretamente em componentes de apresentação.

### Padrões do Projeto

- [ ] Importações utilizam o alias `@/*`.
- [ ] Componentes são exportados via `index.ts` do diretório correspondente.
- [ ] Hooks customizados seguem a convenção `use<Nome>`.
- [ ] Serviços utilizam o client HTTP genérico de `src/services/api.ts`.
- [ ] Server Components por padrão; `"use client"` somente quando necessário.

## Severidades

| Nível       | Descrição                                                         |
| ----------- | ----------------------------------------------------------------- |
| 🔴 Crítico  | Uso de `any`, falha de tipagem, bug lógico, vulnerabilidade.      |
| 🟡 Alerta   | Violação de DRY, componente no nível errado, código morto.        |
| 🟢 Sugestão | Melhoria de legibilidade, renomeação, simplificação de expressão. |

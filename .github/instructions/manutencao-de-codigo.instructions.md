# Manutenção de Código

Diretrizes para refatoração, correção de bugs e evolução de funcionalidades no projeto NAPI Abelhas.

## Princípios de Manutenção

1. **Menor impacto possível** — Altere somente o necessário. Mudanças cirúrgicas reduzem riscos.
2. **Manter consistência** — Siga os padrões já estabelecidos no projeto (Atomic Design, tipagem, convenções de nomenclatura).
3. **Não quebre o que funciona** — Valide que alterações não introduzem regressões.
4. **Documente decisões** — Quando uma refatoração muda comportamento, deixe claro no PR.

## Refatoração

### Quando Refatorar

- Código duplicado em dois ou mais locais.
- Componente com responsabilidades mistas (viola SRP).
- Componente atom com lógica de negócio (mover para organism ou hook).
- Tipo `any` encontrado — substituir por tipo adequado.
- Funções acima de ~30 linhas.
- Props desnecessárias sendo passadas (prop drilling) — considerar hook ou contexto.

### Como Refatorar

1. **Identifique** o escopo da mudança e os arquivos afetados.
2. **Verifique** se existem testes ou comportamentos dependentes.
3. **Extraia** para o nível correto:
   - Lógica de negócio → `src/hooks/` ou `src/services/`.
   - Lógica de apresentação repetida → novo componente atom/molecule.
   - Constantes → `src/constants/`.
   - Tipos → `src/types/`.
   - Utilidades puras → `src/utils/`.
4. **Atualize** as exportações nos arquivos `index.ts`.
5. **Valide** com `npx tsc --noEmit` e ESLint/Prettier (quando configurados).

### Exemplos de Refatoração

**Extrair lógica de estado para hook:**

```typescript
// ❌ Antes — lógica no componente com acesso inseguro
function AmostraPage() {
  const [amostras, setAmostras] = useState<Amostra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    amostrasService.list().then((res) => {
      // ⚠️ Backend retorna T[], não PaginatedResponse
      const items = Array.isArray(res) ? res : (res?.data ?? []);
      setAmostras(items);
      setLoading(false);
    });
  }, []);

  // ...render
}

// ✅ Depois — lógica no hook com acesso defensivo
function AmostraPage() {
  const { amostras, loading } = useAmostra();
  // ...render
}
```

**Substituir `any` por tipo correto:**

```typescript
// ❌ Antes
function handleResponse(data: any) { ... }

// ✅ Depois
function handleResponse(data: Amostra[]) { ... }
```

## Correção de Bugs

### Processo

1. **Reproduza** o bug localmente.
2. **Isole** o componente ou serviço causador.
3. **Corrija** com a menor mudança possível.
4. **Verifique** que a tipagem está correta (`npx tsc --noEmit`).
5. **Teste** cenários adjacentes para evitar regressões.

### Cuidados

- Não corrija "de passagem" problemas não relacionados ao bug — abra issue separada.
- Se o bug estiver na camada de serviço (`src/services/`), verifique os tipos de resposta da API.
- Se o bug for visual, confirme classes Tailwind/DaisyUI e responsividade.

## Evolução de Funcionalidades

### Adição de Nova Feature

1. Consulte a **wiki** do repositório para entender requisitos e regras de negócio.
2. Defina os **tipos** necessários em `src/types/`.
3. Crie o **serviço** em `src/services/` utilizando o client `api.ts`.
4. Crie o **hook** em `src/hooks/` para encapsular estado e chamadas.
5. Crie **componentes** seguindo Atomic Design (atoms → molecules → organisms).
6. Crie a **página** em `src/app/` usando Server Components quando possível.
7. Atualize **constantes** (rotas, enums) em `src/constants/`.
8. Atualize os **`index.ts`** de exportação.

### Remoção de Código

- Remova imports não utilizados.
- Remova componentes, hooks ou serviços órfãos.
- Remova tipos não referenciados.
- Nunca deixe código comentado — use o histórico do Git.

## Checklist de Manutenção

- [ ] Nenhum `any` introduzido ou mantido.
- [ ] Importações usando alias `@/*`.
- [ ] Exportações atualizadas nos `index.ts`.
- [ ] Compilação sem erros (`npx tsc --noEmit`).
- [ ] ESLint e Prettier passam sem erros (quando configurados).
- [ ] Wiki consultada para validar regras de negócio.
- [ ] Nenhum `console.log` em código de produção.
- [ ] Mudança documentada no PR quando altera comportamento.

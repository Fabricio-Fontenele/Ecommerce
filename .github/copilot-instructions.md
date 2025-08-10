---
alwaysApply: true
---

# Regras de Desenvolvimento

Você é um engenheiro de software sênior especializado em desenvolvimento web moderno, com domínio em TypeScript, React, Next.js 15 (App Router), PostgreSQL, Drizzle, shadcn/ui e Tailwind CSS. Seu foco é entregar soluções de alta qualidade, fáceis de manter, organizadas e seguindo boas práticas.

---

## Arquitetura do Projeto

Este projeto é um **e-commerce Next.js 15 com App Router** usando **PostgreSQL + Drizzle ORM**.

- **Server Actions** para mutações (`src/actions/*/index.ts`)
- **React Query** para cache de estado do servidor
- **Better Auth** para autenticação via Google OAuth
- **Radix UI + Tailwind** para componentes e estilos

**Tecnologias e ferramentas utilizadas:**

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form (para formulários)
- Zod (para validações)
- Better Auth (autenticação)
- PostgreSQL (banco de dados)
- Drizzle ORM
- @tanstack/react-query (estado do servidor)

---

## Regras Gerais

- Escreva código limpo, organizado, fácil de manter, seguindo SOLID e Clean Code.
- Use nomes descritivos para variáveis, funções, pastas e arquivos (em camelCase).
- Todo código deve ser em TypeScript.
- DRY: evite duplicação, extraia funções/componentes reutilizáveis.
- Código deve ser autoexplicativo; evite comentários desnecessários.

---

## Padrões de React e Next.js

- Use componentes da biblioteca shadcn/ui sempre que possível ([lista de componentes](https://ui.shadcn.com/)).
- Valide formulários sempre com Zod.
- Sempre use React Hook Form para criação/validação de formulários.
- Utilize o componente [form.tsx](../../src/components/ui/form.tsx), e veja exemplos em [signInForm.tsx](../../src/app/authentication/components/signInForm.tsx) e [signUpForm.tsx](../../src/app/authentication/components/signUpForm.tsx).
- Para componentes exclusivos de uma página, crie-os na pasta `/components` dentro da respectiva página.
- Siga DRY: crie funções e componentes reutilizáveis conforme necessário.

---

## Server Actions

- Todas as server actions ficam em `src/actions/{actionName}/`, contendo:
  - `index.ts` (função "use server" com verificação de autenticação)
  - `schema.ts` (schema de validação Zod)
- Sempre valide os dados com o schema Zod antes de verificar autenticação.
- Verifique autenticação com:  
  `await auth.api.getSession({ headers: await headers() })`
- Use [addCartProduct](../src/actions/addCartProduct) como referência de padrão.

---

## Banco de Dados

- Use sempre `src/db/index.ts` para interagir com o banco e veja o arquivo [schema.ts](../../src/db/schema.ts).
- Comandos:
  ```bash
  npx drizzle-kit generate   # Gerar migrações após mudanças no schema
  npx drizzle-kit push       # Aplicar ao banco
  npm run seed               # Popular dados (executa src/db/seed.ts)
  ```

---

## React Query

- Use React Query para interagir com server actions em client components.
- Sempre crie hooks customizados para queries e mutations.
- Exemplos:
  - [useCart.ts](../../src/hooks/queries/useCart.ts)
  - [useIncreaseCartProductQuantity.ts](../../src/hooks/mutations/useIncreaseCartProductQuantity.ts)
  - [cartItem.tsx](../../src/components/common/cartItem.tsx)
  - [cart.tsx](../../src/components/common/cart.tsx)

---

## Carrinho

- Carrinho persiste por usuário autenticado no banco.
- `cartItem` referencia `productVariant` (não `product`).
- Operações de carrinho requerem autenticação.
- Use mutations do React Query para updates otimistas.

---

## Autenticação

- **Better Auth** gerencia sessões (não usar middleware do Next.js).
- Autenticação client via `authClient` de `src/lib/authClient.ts`.
- Sempre use `await headers()` antes de passar headers para funções de autenticação.

---

## Produtos

- Produtos possuem múltiplas variants (cor, tamanho, preço).
- Rotas: `/productVariant/[slug]` para variants individuais.
- Sempre trabalhe com entidades `productVariant`, nunca com o `product` base.

---

## Referências de Código

Sempre consulte e siga os exemplos padrões já existentes no projeto para manter a consistência:

- Formulários: [form.tsx], [signInForm.tsx], [signUpForm.tsx]
- Server Actions: [addCartProduct](../../src/actions/addCartProduct)
- Hooks e React Query: [useCart.ts], [useIncreaseCartProductQuantity.ts]
- Componentes de Carrinho: [cartItem.tsx](../../src/components/common/cartItem.tsx), [cart.tsx](../../src/components/common/cart.tsx)

---

<div align="center">

# 🛍️ E-commerce Fashion

### Plataforma completa de e-commerce com Next.js 15, PostgreSQL e autenticação social

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](#) • [Documentação](#configuração-do-projeto) • [Roadmap](#próximas-melhorias)

</div>

---

## ✨ Sobre o Projeto

Um **e-commerce moderno e completo** desenvolvido com as tecnologias mais atuais do mercado. Projetado para ser escalável, mantível e seguir as melhores práticas de desenvolvimento web.

### 🎯 Destaques

- 🎨 **Design Responsivo** - Interface adaptável para mobile, tablet e desktop
- 🔐 **Autenticação Segura** - Login social com Google OAuth via Better Auth
- 🛒 **Carrinho Persistente** - Carrinho salvo no banco de dados por usuário
- 💳 **Checkout Completo** - Fluxo de compra com validação de dados
- ⚡ **Performance Otimizada** - Server Actions e cache inteligente com React Query
- 🎭 **UI Moderna** - Componentes shadcn/ui com Radix UI e Tailwind CSS
- 📦 **Type-Safe** - 100% TypeScript com validação Zod
- 🗄️ **Banco Robusto** - PostgreSQL com Drizzle ORM

---

---

## 🚀 Funcionalidades

### 🛍️ E-commerce

- ✅ Catálogo de produtos com categorias
- ✅ Variações de produtos (cor, tamanho, preço)
- ✅ Sistema de carrinho com persistência
- ✅ Adicionar/remover produtos do carrinho
- ✅ Contador de quantidade de produtos
- ✅ Botão "Comprar Agora" (checkout rápido)
- ✅ Navegação por categorias
- ✅ Páginas de produto individuais

### 👤 Autenticação & Perfil

- ✅ Login/Registro com Google OAuth
- ✅ Gerenciamento de sessão seguro
- ✅ Proteção de rotas autenticadas
- ✅ Histórico de pedidos
- ✅ Logout com feedback visual

### 📦 Checkout & Pedidos

- ✅ Múltiplos endereços de entrega por usuário
- ✅ Formulário de endereço com validação
- ✅ Inputs especializados (CPF, telefone, CEP)
- ✅ Resumo do pedido antes de finalizar
- ✅ Integração com Stripe para pagamento
- ✅ Confirmação de pedido

### 🎨 Interface & UX

- ✅ Design mobile-first responsivo
- ✅ Hero banner com call-to-action
- ✅ Showcase de marcas parceiras
- ✅ Banner promocional animado
- ✅ Menu hamburguer para mobile
- ✅ Toast notifications amigáveis
- ✅ Loading states em todas operações
- ✅ Feedback visual em ações do usuário

---

## 🛠️ Tecnologias Utilizadas

---

## 🛠️ Tecnologias Utilizadas

<table>
<tr>
<td width="50%">

### 🎯 Core

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **PostgreSQL** - Banco relacional
- **Drizzle ORM** - Type-safe ORM

### 🎨 UI/UX

- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones
- **Sonner** - Toast notifications

</td>
<td width="50%">

### 🔐 Autenticação

- **Better Auth** - Sistema de auth
- **Google OAuth** - Login social

### 📊 Estado & Formulários

- **TanStack Query** - Cache do servidor
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas

### 💳 Pagamento

- **Stripe** - Processamento de pagamentos

</td>
</tr>
</table>

---

## 📦 Configuração do Projeto

## 📦 Configuração do Projeto

### 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn
- Conta Google Cloud (para OAuth)
- Conta Stripe (para pagamentos)

### 🔧 Instalação

**1️⃣ Clone o repositório**

```bash
git clone https://github.com/Fabricio-Fontenele/Ecommerce.git
cd Ecommerce
```

**2️⃣ Instale as dependências**

```bash
npm install
```

**3️⃣ Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# 🗄️ Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"

# 🔐 Better Auth
BETTER_AUTH_SECRET="seu-secret-super-seguro-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# 🔑 Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# 💳 Stripe
STRIPE_SECRET_KEY="sk_test_sua_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_sua_stripe_public_key"
STRIPE_WEBHOOK_SECRET="whsec_seu_webhook_secret"
```

Para desenvolvimento local, defina também:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**4️⃣ Configure o banco de dados**

```bash
# Gerar e aplicar migrações
npx drizzle-kit generate
npx drizzle-kit push

# Popular com dados de exemplo (opcional)
npm run seed
```

**5️⃣ Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**6️⃣ Valide a aplicação**

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

🎉 Acesse http://localhost:3000

---

## 📁 Estrutura do Projeto

## 📁 Estrutura do Projeto

```
src/
├── 🎬 actions/              Server Actions (mutações de dados)
│   ├── addCartProduct/      Adicionar produto ao carrinho
│   ├── createShippingAddress/  Criar endereço de entrega
│   ├── finishOrder/         Finalizar pedido
│   └── ...
│
├── 📱 app/                  App Router do Next.js 15
│   ├── authentication/      Páginas de login/registro
│   ├── cart/               Carrinho e checkout
│   │   ├── identification/  Seleção de endereço
│   │   └── confirmation/    Confirmação do pedido
│   ├── category/[slug]/     Páginas de categorias
│   ├── productVariant/[slug]/  Páginas de produtos
│   └── myOrders/           Histórico de pedidos
│
├── 🧩 components/           Componentes reutilizáveis
│   ├── common/             Componentes globais
│   │   ├── header.tsx      Header com menu
│   │   ├── cart.tsx        Sheet do carrinho
│   │   ├── heroBanner.tsx  Banner principal
│   │   └── ...
│   └── ui/                 Componentes shadcn/ui
│
├── 🗄️ db/                   Configuração do banco
│   ├── schema.ts           Schema Drizzle (tabelas)
│   ├── seed.ts             Dados de exemplo
│   └── index.ts            Conexão do banco
│
├── 🧪 tests/               Testes automatizados
│   ├── unit/               Helpers, componentes e formulários
│   ├── integration/        Server Actions e webhook do Stripe
│   └── e2e/                Smoke tests com Playwright
│
├── 🪝 hooks/                Hooks customizados
│   ├── mutations/          React Query mutations
│   │   ├── useIncreaseCartProductQuantity.ts
│   │   ├── useRemoveProductFromCart.ts
│   │   └── ...
│   └── queries/            React Query queries
│       ├── useCart.ts      Query do carrinho
│       └── ...
│
└── 🛠️ lib/                  Utilitários e configurações
    ├── auth.ts             Configuração Better Auth
    ├── authClient.ts       Cliente de autenticação
    └── utils.ts            Funções auxiliares
```

---

## 🗄️ Banco de Dados## 🗄️ Banco de Dados

### Schema Principal

| Tabela               | Descrição                                            |
| -------------------- | ---------------------------------------------------- |
| **user**             | Usuários com autenticação Google OAuth               |
| **session**          | Sessões de login seguras (Better Auth)               |
| **account**          | Contas OAuth externas                                |
| **verification**     | Tokens de verificação de email                       |
| **category**         | Categorias dos produtos                              |
| **product**          | Produtos base com informações gerais                 |
| **product_variant**  | Variações dos produtos (cor, tamanho, preço, imagem) |
| **cart**             | Carrinho por usuário                                 |
| **cart_item**        | Itens no carrinho (ligado a product_variant)         |
| **shipping_address** | Endereços de entrega dos usuários                    |
| **order**            | Pedidos finalizados                                  |
| **order_item**       | Itens dos pedidos                                    |

### 🔧 Comandos Úteis

```bash
# Gerar nova migração após alterações no schema
npx drizzle-kit generate

# Aplicar migrações ao banco
npx drizzle-kit push

# Abrir Drizzle Studio (interface visual do banco)
npx drizzle-kit studio

# Popular dados de exemplo
npm run seed
```

---

## 🎯 Padrões de Desenvolvimento

### Server Actions

- ✅ Organizadas em `src/actions/{actionName}/`
- ✅ Validação com Zod em `schema.ts`
- ✅ Verificação de autenticação obrigatória
- ✅ Retorno consistente e type-safe

**Exemplo:**

```typescript
// src/actions/addCartProduct/index.ts
export const addProductToCart = async (data: AddProductToCartSchema) => {
  // 1. Validar dados
  addProductToCartSchema.parse(data);

  // 2. Verificar autenticação
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("User not authenticated");

  // 3. Executar lógica de negócio
  // ...
};
```

### React Query

- ✅ Hooks customizados para queries e mutations
- ✅ Cache otimizado e invalidação automática
- ✅ Updates otimistas para melhor UX
- ✅ Keys padronizadas para consistência

**Exemplo:**

```typescript
// src/hooks/mutations/useIncreaseCartProductQuantity.ts
export const useIncreaseCartProductQuantity = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado!");
    },
  });
};
```

### Formulários

- ✅ React Hook Form para performance
- ✅ Validação com Zod
- ✅ Componentes shadcn/ui consistentes
- ✅ Inputs especializados (CPF, telefone, CEP)

### Toast Notifications

- ✅ Feedback visual em todas operações
- ✅ Mensagens amigáveis com emojis
- ✅ Botões de ação quando necessário
- ✅ Duração apropriada por tipo de mensagem

---

## 📜 Scripts Disponíveis

```bash
npm run dev          # 🚀 Servidor de desenvolvimento (localhost:3000)
npm run build        # 🏗️  Build otimizado para produção
npm run start        # ▶️  Servidor de produção
npm run lint         # 🔍 Verificar código com ESLint
npm run typecheck    # 🧠 Verificar tipos com TypeScript
npm run seed         # 🌱 Popular banco com dados de exemplo
npm run test         # ✅ Executar toda a suíte
npm run test:unit    # 🧪 Executar testes unitários
npm run test:integration  # 🔗 Executar testes de integração
npm run test:e2e     # 🌐 Executar smoke tests E2E
npm run check        # 🛡️ Rodar lint + typecheck + build
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no Vercel
3. Configure as variáveis de ambiente em `Project Settings > Environment Variables`
4. Deploy automático! ✨

### Variáveis de Ambiente de Produção

```env
DATABASE_URL=sua-url-postgresql-producao
BETTER_AUTH_SECRET=secret-forte-producao
BETTER_AUTH_URL=https://seu-dominio.vercel.app
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
STRIPE_SECRET_KEY=sk_live_sua_key_producao
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_sua_key_producao
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_producao
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
```

### Observações de Deploy

- O projeto depende dessas variáveis em runtime. Se alguma estiver ausente na Vercel, autenticação, checkout, webhook do Stripe ou acesso ao banco vão falhar.
- A build não deve mais quebrar só por falta dessas variáveis, mas a aplicação continuará precisando delas em produção.
- O projeto agora fixa `Node 22.x` via `package.json` para manter o ambiente da Vercel alinhado com o desenvolvimento local.

---

## 🎯 Próximas Melhorias

## 🎯 Próximas Melhorias

### 🔜 Roadmap

- [ ] 📊 **Dashboard Administrativo** – Painel para gerenciar produtos, pedidos e usuários
- [ ] 🔍 **Sistema de Busca** – Pesquisa avançada com filtros e autocompletar
- [ ] ⭐ **Avaliações & Reviews** – Sistema de ratings e comentários
- [ ] ❤️ **Wishlist** – Lista de desejos para usuários
- [ ] 🎟️ **Cupons de Desconto** – Sistema promocional e códigos de desconto
- [ ] 📧 **Sistema de Emails** – Confirmações e notificações via email
- [ ] 📱 **Notificações Push** – Alertas em tempo real
- [ ] 🌐 **Internacionalização** – Suporte multi-idioma
- [ ] 📈 **Analytics** – Integração com Google Analytics
- [ ] 🧪 **Testes** – Cobertura completa com Jest e Testing Library
- [ ] 🔄 **PWA** – Progressive Web App com offline support
- [ ] 🤖 **ChatBot** – Assistente virtual para atendimento

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. ✍️ Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. 📤 Push para a branch (`git push origin feature/nova-feature`)
5. 🎉 Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com 💜 por **[Fabricio Fontenele](https://github.com/Fabricio-Fontenele)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/fabricio-fontenele-302975333/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Fabricio-Fontenele)

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

</div>

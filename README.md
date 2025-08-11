# E-commerce

Um projeto de **e-commerce completo** desenvolvido com **Next.js 15 (App Router)**, **PostgreSQL**, **Drizzle ORM** e **Better Auth**, seguindo **boas práticas de arquitetura** e **desenvolvimento moderno**.

Ideal para estudos, demonstração de habilidades no portfólio e como base para projetos reais.

## Tecnologias Utilizadas

### Core

- **[Next.js 15](https://nextjs.org/)** – Framework React com App Router para aplicações modernas
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática para desenvolvimento seguro
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional robusto
- **[Drizzle ORM](https://orm.drizzle.team/)** – ORM moderno e type-safe

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)** – Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** – Componentes UI modernos e acessíveis
- **[Radix UI](https://www.radix-ui.com/)** – Primitivos UI headless
- **[Lucide React](https://lucide.dev/)** – Ícones consistentes

### Estado & Formulários

- **[TanStack Query](https://tanstack.com/query/)** – Gerenciamento de estado do servidor
- **[React Hook Form](https://react-hook-form.com/)** – Formulários performáticos
- **[Zod](https://zod.dev/)** – Validação de schemas type-safe

### Autenticação

- **[Better Auth](https://www.better-auth.com/)** – Sistema de autenticação moderno
- **Google OAuth** – Login social integrado

## Funcionalidades

### **E-commerce Completo**

- **Catálogo de produtos** com categorias e variações (cor, tamanho, preço)
- **Carrinho de compras** persistente por usuário autenticado
- **Design responsivo** otimizado para mobile e desktop
- **Navegação por categorias** com URLs amigáveis

### **Autenticação Segura**

- **Login/Registro** com Google OAuth via Better Auth
- **Gerenciamento de sessão** seguro e persistente
- **Proteção de rotas** e dados sensíveis

### **Gestão de Pedidos**

- **Checkout completo** com validação de dados
- **Endereços de entrega** com múltiplos endereços por usuário
- **Inputs especializados** (CPF, telefone, CEP)
- **Finalização de pedidos** com confirmação

### **Arquitetura Moderna**

- **Server Actions** para mutações de dados
- **Cache otimizado** com React Query
- **Validação consistente** com Zod em todos os formulários
- **Componentes reutilizáveis** seguindo padrões do shadcn/ui

## Configuração do Projeto

### Pré-requisitos

- **Node.js** 18+
- **PostgreSQL** 14+
- **npm** ou **yarn**

### 1. Clonar o repositório

```bash
git clone https://github.com/Fabricio-Fontenele/Ecommerce.git
cd Ecommerce
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL=postgresql://usuario:senha@localhost:5432/ecommerce

# Better Auth
BETTER_AUTH_SECRET=seu-secret-aqui
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

### 4. Configurar banco de dados

```bash
# Gerar migrações
npx drizzle-kit generate

# Aplicar migrações ao banco
npx drizzle-kit push

# Popular dados de exemplo (opcional)
npm run seed
```

### 5. Executar o projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── actions/           # Server Actions (mutações de dados)
│   ├── addCartProduct/
│   ├── createShippingAddress/
│   └── ...
├── app/              # App Router do Next.js 15
│   ├── authentication/
│   ├── cart/
│   ├── category/
│   └── productVariant/
├── components/       # Componentes reutilizáveis
│   ├── common/      # Componentes globais
│   └── ui/          # Componentes shadcn/ui
├── db/              # Configuração do banco
│   ├── schema.ts    # Schema Drizzle
│   └── seed.ts      # Dados de exemplo
├── hooks/           # Hooks customizados
│   ├── mutations/   # React Query mutations
│   └── queries/     # React Query queries
└── lib/             # Utilitários e configurações
```

## Banco de Dados

Este projeto utiliza **PostgreSQL** com **Drizzle ORM** para um schema type-safe e migrações automáticas.

### Schema Principal

- **`user`** – Usuários com autenticação Google OAuth
- **`session`** – Sessões de login seguras (Better Auth)
- **`account`** – Contas OAuth externas
- **`verification`** – Tokens de verificação de email
- **`category`** – Categorias dos produtos
- **`product`** – Produtos base com informações gerais
- **`product_variant`** – Variações dos produtos (cor, tamanho, preço, imagem)
- **`cart`** – Carrinho por usuário
- **`cart_item`** – Itens no carrinho (ligado a product_variant)
- **`shipping_address`** – Endereços de entrega dos usuários
- **`order`** – Pedidos finalizados
- **`order_item`** – Itens dos pedidos

### Comandos Úteis

```bash
# Gerar nova migração após alterações no schema
npx drizzle-kit generate

# Aplicar migrações ao banco
npx drizzle-kit push

# Abrir Drizzle Studio (interface visual)
npx drizzle-kit studio

# Popular dados de exemplo
npm run seed
```

## Padrões de Desenvolvimento

### Server Actions

- Todas as mutações ficam em `src/actions/{actionName}/`
- Validação com Zod em `schema.ts`
- Verificação de autenticação obrigatória
- Padrão de retorno consistente

### React Query

- Hooks customizados para queries e mutations
- Cache otimizado e updates otimistas
- Keys padronizadas para invalidação

### Formulários

- React Hook Form + Zod para validação
- Componentes shadcn/ui consistentes
- Inputs especializados (CPF, telefone, etc.)

### Autenticação

- Better Auth com Google OAuth
- Sessões persistentes no banco
- Proteção automática de rotas sensíveis

### Variáveis de Ambiente de Produção

```env
DATABASE_URL=sua-url-postgresql-producao
BETTER_AUTH_SECRET=secret-forte-para-producao
BETTER_AUTH_URL=https://seu-dominio.vercel.app
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificar código com ESLint
npm run seed         # Popular banco com dados de exemplo
```

## Próximas Melhorias

- [ ] **Dashboard Administrativo** – Painel para gerenciar produtos, pedidos e usuários
- [ ] **Sistema de Pagamento** – Integração com Stripe/PagSeguro
- [ ] **Notificações** – Email/SMS para confirmação de pedidos
- [ ] **Avaliações** – Sistema de reviews e ratings
- [ ] **Wishlist** – Lista de desejos para usuários
- [ ] **Cupons de Desconto** – Sistema promocional
- [ ] **SEO Avançado** – Meta tags dinâmicas e structured data
- [ ] **PWA** – Progressive Web App com offline support
- [ ] **Analytics** – Integração com Google Analytics/Hotjar
- [ ] **Testes** – Cobertura completa com Jest e Testing Library

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

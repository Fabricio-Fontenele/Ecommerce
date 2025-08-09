# Ecommerce Básico

Um projeto de **ecommerce** simples, desenvolvido com **Next.js**, **PostgreSQL** e **Drizzle ORM**, com foco em **boas práticas** e **arquitetura limpa**.  
Ideal para estudos e demonstração de habilidades no portfólio.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** – Framework React para aplicações rápidas e escaláveis.
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional robusto e confiável.
- **[Drizzle ORM](https://orm.drizzle.team/)** – ORM moderno, typesafe e simples de usar.
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática para mais segurança no desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/)** – Estilização rápida e responsiva.
- **[Zod](https://zod.dev/)** – Validação de dados confiável.
- **[React Hook Form](https://react-hook-form.com/)** – Gerenciamento de formulários eficiente.

## Funcionalidades

- 📂 **Cadastro de produtos** com imagem, nome, descrição e preço.
- 🛒 **Carrinho de compras** persistente.
- 🔍 **Listagem e busca de produtos**.
- 📱 **Layout responsivo** para mobile e desktop.
- 🔐 **Autenticação** _(em breve)_.

## Configuração do Projeto

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### Instalar dependências

```bash
npm install
# ou
yarn install
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/ecommerce
```

### Rodar migrações do banco

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### Rodar o projeto

```bash
npm run dev
```

## Banco de Dados

Este projeto utiliza Drizzle ORM para definir o schema e executar migrações no PostgreSQL.
As tabelas principais incluem:

- `user` – Usuários cadastrados, com autenticação, e campos como nome, email, senha, imagem, etc.
- `session` – Sessões de login dos usuários (tokens, IP, user agent, expiração, etc).
- `account` – Contas externas de autenticação (OAuth, provedores, tokens, etc).
- `verification` – Tokens de verificação para email/login seguro.
- `category` – Categorias dos produtos (nome, slug, etc).
- `product` – Produtos com nome, descrição, categoria, slug, etc.
- `product_variant` – Variações dos produtos (cor, preço, imagem, nome, slug etc).

## Próximos Passos

- Implementar autenticação de usuários.
- Criar página de checkout.
- Adicionar painel administrativo para gerenciamento de produtos.
- Melhorar SEO.

---

📄 **Licença:** MIT – sinta-se livre para usar e modificar.

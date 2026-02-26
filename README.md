# Finance App

Aplicação Full-Stack de controle financeiro pessoal com autenticação de usuários, cadastro de transações e dashboard com gráficos.

## Tecnologias

**Frontend**
- React 18
- Vite
- React Router DOM
- Recharts
- Axios

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Senhas criptografadas com bcrypt
- Rotas protegidas por middleware de autenticação
- Cadastro de transações (receitas e despesas)
- Edição e exclusão de transações
- Filtro por mês e ano
- Dashboard com resumo de receitas, despesas e saldo
- Gráfico de transações com Recharts

## Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Conta no MongoDB Atlas

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com as variáveis:

```
PORT=5000
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Estrutura do projeto

```
finance-app/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

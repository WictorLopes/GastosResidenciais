# 💰 Gastos Residenciais

Projeto fullstack para controle de gastos residenciais, permitindo o cadastro de pessoas, categorias, transações (receitas e despesas) e visualização de saldo e dashboard financeiro.

O sistema é dividido em Frontend e Backend, que devem ser executados juntos para o funcionamento completo da aplicação.

## 🌐 Aplicação Online

Frontend (produção):
🔗 (em breve)

⚠️ Para funcionamento completo (cadastros, edição e exclusão), o backend precisa estar rodando.



## 🧱 Estrutura do Repositório
```bash
gastos-residenciais/
│
├── GastosResidenciais.Backend/       # API Backend (.NET)
├── gastos-residenciais-front/        # Aplicação Frontend (React)
└── README.md                         # Documentação do projeto
```

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend

- React

- TypeScript

- Vite

- Tailwind CSS

- Lucide Icons

### 🔹 Backend

- .NET 8 (ASP.NET Core Web API)

- Entity Framework Core

- SQLite

- DTOs + Services

- Swagger

## ▶️ Como Rodar o Projeto Localmente
### 🖥️ Backend (.NET API)
Pré-requisitos

- .NET SDK 8+

Passo a passo
```bash
cd backend
dotnet restore
dotnet run
```

A API ficará disponível em:
```bash
http://localhost:5158
```

Swagger:
```bash
http://localhost:5158/swagger
```

💡 As migrations são aplicadas automaticamente ao iniciar o projeto.

### 🌐 Frontend (React)
Pré-requisitos

- Node.js 18+

- NPM ou Yarn

Passo a passo
```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em:
```bash
http://localhost:5173
```

### 🔄 Importante

- O frontend depende do backend para funcionar corretamente.

- Certifique-se de que:

    - O backend esteja rodando antes de usar o frontend

# 🚀 Projeto DevOps A3 — Strapi CMS

Este projeto tem como objetivo demonstrar o processo completo de CI/CD utilizando GitHub Actions, Docker e Terraform com o **Strapi CMS**, conforme os requisitos da atividade A3 da disciplina de DevOps.

---

## 📦 Tecnologias utilizadas

- **Strapi CMS** (v5)
- **Docker**
- **Docker Hub**
- **GitHub Actions**
- **Terraform**
- **AWS ECS Fargate**
- **Playwright** (para testes E2E)
- **Node.js 18 + pnpm**
- **SQLite** (persistido via volume no container)

---

## ⚙️ Funcionalidades

- CI/CD com GitHub Actions
- Deploy automático na AWS (ECS + Fargate)
- Build e push de imagem Docker
- Testes automatizados E2E com Playwright
- Uso de Secrets seguros com GitHub Secrets
- Persistência de banco de dados via volume

---

## 📁 Estrutura do projeto

```
.
├── .github/
│   └── workflows/
│       ├── deploy.yml         # Pipeline de Deploy
│       └── tests.yml          # Pipeline de Testes
├── terraform/
│   ├── main.tf                # Infraestrutura AWS
│   └── terraform.tfvars       # Variáveis do Terraform (gerado pela pipeline)
├── tests/
│   └── e2e.spec.ts            # Testes com Playwright
├── .env                       # Variáveis de ambiente (não commitado)
├── Dockerfile                 # Configuração da imagem
└── README.md
```

---

## 🚀 Como rodar localmente

1. Crie um arquivo `.env` com as variáveis obrigatórias:

```
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
DATABASE_FILENAME=.tmp/data.db
```

2. Rode o Docker local:

```bash
docker build -t strapi-a3 .
docker run -p 1337:1337 --env-file .env -v ${PWD}/.tmp:/app/.tmp strapi-a3
```

No Windows (PowerShell):

```powershell
docker run -p 1337:1337 --env-file .env -v ${PWD}/.tmp:/app/.tmp strapi-a3
```

---

## ✅ Testes Automatizados

- Feitos com **Playwright**
- Rodam via GitHub Actions em pull requests
- Testam pelo menos 2 coleções do CMS

### Rodar local

```bash
pnpm install
pnpm exec playwright install
pnpm exec playwright test
```

---

## 🧪 GitHub Actions

### `tests.yml` (PRs)

- Roda em `pull_request`
- Instala dependências
- Sobe o Strapi
- Executa testes E2E

### `deploy.yml` (Deploy)

- Roda em `push` na `develop`
- Faz build/push da imagem Docker
- Executa `terraform apply` para criar infraestrutura na AWS

---

## ☁️ Secrets necessários no GitHub

| Nome                  | Descrição                         |
| --------------------- | --------------------------------- |
| DOCKER_USERNAME       | Usuário Docker Hub                |
| DOCKER_PASSWORD       | Senha Docker Hub                  |
| APP_KEYS              | Chave do Strapi                   |
| API_TOKEN_SALT        | Salt para tokens                  |
| ADMIN_JWT_SECRET      | JWT do admin                      |
| JWT_SECRET            | JWT geral                         |
| DATABASE_FILENAME     | `.tmp/data.db`                    |
| AWS_ACCESS_KEY_ID     | Chave da IAM                      |
| AWS_SECRET_ACCESS_KEY | Chave secreta da IAM              |
| ECS_EXECUTION_ROLE    | Role de execução ECS              |
| ECS_TASK_ROLE         | Role da Task ECS                  |
| SUBNET_IDS            | Lista de subnets da VPC           |
| SECURITY_GROUP_ID     | ID do Security Group (porta 1337) |

---

## 📌 Observações

- Não é utilizado Kubernetes.
- O banco SQLite é persistido com `-v ./tmp:/app/.tmp` no container.
- O deploy é feito com Terraform automaticamente pela pipeline.

---

## 👨‍💻 Acesso ao Strapi

- **URL**: http://localhost:1337
- **Super Admin**
  - Email: admin@satc.edu.br
  - Senha: welcomeToStrapi123

---

## 🧠 Conclusão

Este projeto demonstra na prática como criar uma pipeline completa de DevOps com foco em microsserviços, testes automatizados, containerização e provisionamento de infraestrutura como código.

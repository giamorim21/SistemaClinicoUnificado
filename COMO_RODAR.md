# Como Rodar o SCU — Guia Completo de Ambiente

Este documento explica como subir o Sistema Clínico Unificado em dois cenários:

| Cenário | Quando usar |
|---|---|
| **Docker** (recomendado) | Demonstrações, onboarding de novos devs, qualquer máquina |
| **Local** (sem Docker) | Desenvolvimento ativo com hot-reload |

---

## Índice

1. [Pré-requisitos](#1-pré-requisitos)
2. [Estrutura do Projeto](#2-estrutura-do-projeto)
3. [Opção A — Rodar com Docker](#opção-a--rodar-com-docker)
4. [Opção B — Rodar Localmente](#opção-b--rodar-localmente)
5. [Fluxo de Testes — Primeiro Start](#5-fluxo-de-testes--primeiro-start)
6. [Referência de Variáveis de Ambiente](#6-referência-de-variáveis-de-ambiente)
7. [Endpoints Principais](#7-endpoints-principais)
8. [Problemas Comuns](#8-problemas-comuns)

---

## 1. Pré-requisitos

### Para rodar com Docker

| Ferramenta | Versão mínima | Verificar |
|---|---|---|
| Docker Desktop | 4.x | `docker --version` |
| Docker Compose | v2 (já vem com o Desktop) | `docker compose version` |

> **Windows:** instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) e certifique-se de que o WSL2 Integration está habilitado em _Settings → Resources → WSL Integration_.

### Para rodar localmente

| Ferramenta | Versão mínima | Verificar |
|---|---|---|
| Java JDK | 17 | `java -version` |
| Maven | 3.9 (ou use o `mvnw` incluído) | `mvn -version` |
| Node.js | 18 | `node --version` |
| npm | 9 | `npm --version` |
| PostgreSQL | 14 | `psql --version` |

---

## 2. Estrutura do Projeto

```
SistemaClinicoUnificado/
├── COMO_RODAR.md
└── clinic-system/
    ├── docker-compose.yml
    ├── .env.example
    ├── backend/
    │   ├── Dockerfile
    │   └── src/
    └── frontend/
        └── sistema-clinico-unificado-frontend/
            ├── Dockerfile
            └── nginx.conf
```

---

## Opção A — Rodar com Docker

### Passo 1 — Configure o arquivo `.env`

Dentro de `clinic-system/`, copie o modelo e ajuste as variáveis:

```bash
cd clinic-system
cp .env.example .env
```

Edite o `.env` e defina pelo menos:

```env
DB_PASSWORD=postgres
JWT_SECRET=minha-chave-super-secreta-com-32-chars-minimo
ADMIN_EMAIL=admin@scu.local
ADMIN_PASSWORD=Admin#123
```

> O `.env` está no `.gitignore` e nunca deve ser commitado.

---

### Passo 2 — Suba os containers

```bash
docker compose up --build --detach
```

O Docker irá:
1. Baixar as imagens base
2. Compilar o backend com Maven (~2–5 min no primeiro build)
3. Gerar o build estático do frontend com Vite
4. Subir na ordem: `db` → `backend` → `frontend`

Acompanhe os logs para confirmar que tudo subiu:

```bash
docker compose logs -f backend
```

Aguarde a linha:
```
SCU >> Manager global criado automaticamente: admin@scu.local
Started ClinicSystemApplication in X.XXX seconds
```

> O super usuário Manager é criado **automaticamente na primeira inicialização** — não há nenhum endpoint ou passo manual para isso.

---

### Passo 3 — Acesse

| Serviço | URL |
|---|---|
| Frontend (React) | http://localhost |
| Backend (API) | http://localhost:8080 |
| Banco de Dados | `localhost:5432` |

---

### Parar e reiniciar

```bash
# Parar sem apagar dados
docker compose down

# Parar e apagar o banco (reset total do schema)
docker compose down -v

# Rebuild após mudanças no código
docker compose up --build --detach

# Rebuild de um serviço específico
docker compose up --build backend --detach
```

---

## Opção B — Rodar Localmente

### Passo 1 — Crie o banco no PostgreSQL

```sql
CREATE DATABASE clinic_system;
```

### Passo 2 — Configure credenciais (se diferente do padrão)

**Windows (PowerShell):**
```powershell
$env:SPRING_DATASOURCE_USERNAME = "seu_usuario"
$env:SPRING_DATASOURCE_PASSWORD = "sua_senha"
```

**Linux/Mac/WSL:**
```bash
export SPRING_DATASOURCE_USERNAME=seu_usuario
export SPRING_DATASOURCE_PASSWORD=sua_senha
```

### Passo 3 — Suba o backend

```bash
cd clinic-system/backend

# Windows
mvnw.cmd spring-boot:run

# Linux / Mac / WSL
./mvnw spring-boot:run
```

### Passo 4 — Suba o frontend (novo terminal)

```bash
cd clinic-system/frontend/sistema-clinico-unificado-frontend
npm install   # apenas na primeira vez
npm run dev
```

Acesse `http://localhost:5173`. O Vite já está configurado para redirecionar `/api/*` para `http://localhost:8080`.

---

## 5. Fluxo de Testes — Primeiro Start

Execute os passos abaixo em ordem para validar que toda a stack está funcionando corretamente.

---

### Passo 1 — Verificar o schema do banco

Confirme que o Hibernate criou as quatro tabelas esperadas:

```bash
docker exec -it clinic-system-db-1 psql -U postgres -d clinic_system -c "\dt"
```

Resultado esperado:

```
        List of relations
 Schema |   Name    | Type  |  Owner
--------+-----------+-------+----------
 public | clinic    | table | postgres
 public | doctor    | table | postgres
 public | specialty | table | postgres
 public | user      | table | postgres
```

Se aparecer `users`, `admins`, `pacients` ou outras tabelas do schema antigo, o banco contém dados de uma versão anterior. Faça reset:

```bash
docker compose down -v && docker compose up --build --detach
```

---

### Passo 2 — Verificar criação automática do Manager

Confirme nos logs que o `DataInitializer` rodou com sucesso:

```bash
docker compose logs backend | grep "SCU >>"
```

Resultado esperado:
```
SCU >> Manager global criado automaticamente: admin@scu.local
```

Confirme também diretamente no banco:

```bash
docker exec -it clinic-system-db-1 psql -U postgres -d clinic_system \
  -c 'SELECT name, email, role, active FROM "user";'
```

Resultado esperado:
```
       name        |      email       |  role   | active
-------------------+------------------+---------+--------
 Administrador SCU | admin@scu.local  | manager | t
```

---

### Passo 3 — Testar o login via API

```bash
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@scu.local","password":"Admin#123"}' | python3 -m json.tool
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" `
  -Method POST -ContentType "application/json" `
  -Body '{"email":"admin@scu.local","password":"Admin#123"}'
```

Resposta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "Administrador SCU",
  "email": "admin@scu.local",
  "role": "ROLE_MANAGER"
}
```

Copie o valor de `token` — será usado nos próximos passos. Substitua `<TOKEN>` pelos exemplos abaixo.

---

### Passo 4 — Criar uma especialidade

Sem especialidade cadastrada, o formulário de médico não funciona.

```bash
curl -s -X POST http://localhost:8080/api/specialties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"Cardiologia","description":"Coração e sistema cardiovascular"}' | python3 -m json.tool
```

Resposta esperada:
```json
{
  "id": "uuid-gerado",
  "name": "Cardiologia",
  "description": "Coração e sistema cardiovascular"
}
```

Adicione quantas especialidades precisar antes de continuar.

---

### Passo 5 — Criar uma clínica

```bash
curl -s -X POST http://localhost:8080/api/management/create-clinic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "clinicName": "Clínica Santa Maria",
    "cnpj": "12345678000195",
    "address": "Rua das Flores, 100 — São Paulo/SP",
    "phone": "(11) 99999-9999",
    "adminName": "João Silva",
    "adminEmail": "joao@santamaria.com",
    "adminPassword": "Senha#456",
    "adminCpf": "12345678902",
    "adminBirthDate": "1985-03-15"
  }'
```

Resposta esperada:
```
Clínica 'Clínica Santa Maria' e Admin criados com sucesso!
```

---

### Passo 6 — Cadastrar um médico via API

```bash
curl -s -X POST http://localhost:8080/api/admin/staff/doctor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Dr. Carlos Souza",
    "email": "carlos@santamaria.com",
    "cpf": "98765432100",
    "birthDate": "1980-06-20",
    "password": "Medico#789",
    "specialtyId": "<ID_DA_ESPECIALIDADE>",
    "clinicId": "<ID_DA_CLINICA>",
    "councilType": "CRM",
    "councilNumber": "12345",
    "councilState": "SP"
  }' | python3 -m json.tool
```

Resposta esperada:
```json
{
  "id": "uuid-gerado",
  "userName": "Dr. Carlos Souza",
  "userEmail": "carlos@santamaria.com",
  "specialtyName": "Cardiologia",
  "clinicName": "Clínica Santa Maria",
  "councilType": "CRM",
  "councilNumber": "12345",
  "councilState": "SP",
  "councilStatus": "active",
  "profileEnabled": true
}
```

Para obter os IDs de especialidade e clínica:

```bash
# IDs das especialidades
curl -s http://localhost:8080/api/specialties \
  -H "Authorization: Bearer <TOKEN>"

# IDs das clínicas
curl -s http://localhost:8080/api/management/clinics \
  -H "Authorization: Bearer <TOKEN>"
```

---

### Passo 7 — Testar o frontend completo

1. Acesse **http://localhost** (Docker) ou **http://localhost:5173** (local)
2. Faça login com `admin@scu.local` / `Admin#123`
3. Confirme o redirecionamento automático para `/dashboard-admin`
4. No painel, verifique:
   - Header mostra o nome **Administrador SCU**
   - KPIs da Visão Geral mostram os dados reais (médicos, especialidades, clínicas)
5. Acesse **Equipe → Médicos**:
   - Os dropdowns de Especialidade e Clínica mostram os dados cadastrados
   - A tabela lista o médico criado no Passo 6
   - O botão de toggle ativa/desativa o médico
6. Preencha o formulário e cadastre um segundo médico diretamente pelo dashboard
7. Confirme que o médico aparece imediatamente na tabela sem recarregar a página

---

### Passo 8 — Confirmar dados finais no banco

```bash
docker exec -it clinic-system-db-1 psql -U postgres -d clinic_system -c '
  SELECT u.name, u.email, u.role, d.council_type, d.council_number, s.name as specialty
  FROM "user" u
  LEFT JOIN doctor d ON d.user_id = u.id
  LEFT JOIN specialty s ON s.id = d.specialty_id
  ORDER BY u.role;
'
```

---

## 6. Referência de Variáveis de Ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/clinic_system` | URL de conexão com o banco |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Usuário do PostgreSQL |
| `SPRING_DATASOURCE_PASSWORD` | `postgres` | Senha do PostgreSQL |
| `DDL_AUTO` | `update` | `update` preserva dados; `create` recria o schema do zero |
| `JWT_SECRET` | `dev-secret-...` | Chave de assinatura JWT — **obrigatório trocar em produção** |
| `ADMIN_EMAIL` | `admin@scu.local` | E-mail do Manager global (criado automaticamente) |
| `ADMIN_PASSWORD` | `Admin#123` | Senha do Manager global |
| `ADMIN_NAME` | `Administrador SCU` | Nome do Manager global |
| `ADMIN_CPF` | `00000000000` | CPF do Manager global |

> **Segurança:** nunca commite o `.env`. Em produção, use um gerenciador de segredos (AWS Secrets Manager, Vault, etc.) em vez de variáveis de ambiente em texto plano.

---

## 7. Endpoints Principais

### Públicos (sem autenticação)

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Login — retorna token JWT + dados do usuário |
| `POST` | `/api/pacients/register` | Auto-cadastro de paciente |

> O Manager global é criado automaticamente na inicialização — não existe endpoint público para isso.

### Manager (`ROLE_MANAGER`)

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/management/create-clinic` | Cria clínica + admin vinculado |
| `GET` | `/api/management/clinics` | Lista todas as clínicas |

### Admin ou Manager (`ROLE_ADMIN` ou `ROLE_MANAGER`)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/admin/staff/doctors` | Lista todos os médicos |
| `POST` | `/api/admin/staff/doctor` | Cadastra médico + usuário |
| `POST` | `/api/admin/staff/doctor/{id}/toggle` | Ativa/desativa médico |
| `POST` | `/api/admin/staff/user` | Cadastra qualquer tipo de usuário |
| `GET` | `/api/specialties` | Lista especialidades |
| `POST` | `/api/specialties` | Cadastra especialidade |

### Médico (`ROLE_DOCTOR`)

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/doctor/profile` | Perfil do médico logado |
| `GET` | `/api/doctor/clinic/{clinicId}` | Lista médicos de uma clínica |

---

## 8. Problemas Comuns

### Popup de login ao acessar o backend no navegador

O navegador não deve ser usado para testar endpoints da API — ele sempre envia `GET`. Use **PowerShell**, **curl** ou **Postman/Insomnia**.

---

### Manager não foi criado automaticamente

Verifique os logs do backend:
```bash
docker compose logs backend | grep -E "SCU >>|ERROR|Exception"
```

Se houver erro de banco, o mais provável é que o schema não foi criado. Faça reset:
```bash
docker compose down -v && docker compose up --build --detach
```

---

### `Connection refused` ao banco de dados

```bash
docker compose logs db | tail -20
```

Aguarde aparecer `database system is ready to accept connections`. Se as credenciais estiverem erradas, confira o `.env`.

---

### Tabelas do schema antigo presentes no banco

Se aparecerem tabelas como `users`, `admins`, `pacients` ou `user_roles`:

```bash
docker compose down -v          # apaga o volume
docker compose up --build --detach   # recria do zero
```

---

### Porta 80 ou 8080 já em uso

```bash
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

Altere a porta no `docker-compose.yml` se necessário:
```yaml
ports:
  - "8081:8080"   # host:container
```

---

### Token JWT expirado

O token expira em **1 hora**. Faça login novamente em `/api/auth/login` para obter um novo.

---

### Dropdowns de especialidade/clínica vazios no dashboard

O banco está vazio. Execute os Passos 4 e 5 do Fluxo de Testes para cadastrar especialidade e clínica antes de usar o formulário de médico.

---

*Atualizado em 27/04/2026 — branch `Crud_Medico`*

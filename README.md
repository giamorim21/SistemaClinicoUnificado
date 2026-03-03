<div align="center">
  <h1>🩺 Sistema Clínico Unificado (SCU)</h1>
  <p>Uma plataforma digital unificada e moderna para otimizar jornadas de atendimento médico e gestão hospitalar.</p>

  [![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow.svg)]()
  [![React](https://img.shields.io/badge/Frontend-React_19-blue.svg)]()
  [![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot_3-brightgreen.svg)]()
  [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)]()

</div>

---

## 📖 Sobre o Projeto

O **Sistema Clínico Unificado (SCU)** foi idealizado para transformar e agilizar a jornada de atendimento do paciente, além de fornecer ferramentas poderosas para a equipe médica e administrativa. O sistema cobre desde o primeiro contato do paciente (cadastro, triagem) até o encerramento da consulta médica.

O projeto é dividido em duas frentes integradas:
1. **Portal do Paciente:** Interface web focada na experiência do usuário para realização de cadastros e acompanhamento.
2. **Plataforma Clínica Interna:** Sistema robusto de back-office feito para recepcionistas, médicos e gestores, com ferramentas de prontuário eletrônico (PEP), agenda diária, emissões de prescrições e gestão da clínica.

---

## ✨ Principais Funcionalidades

### 🧑‍⚕️ Para a Equipe Hospitalar (Médicos, Recepção e Gestão)
- **Dashboard Médico Centralizado:** Visualize imediatamente as consultas agendadas para o dia e gerencie pacientes em andamento.
- **Prontuário Eletrônico do Paciente (PEP):** Histórico completo com evolução clínica, diagnósticos e inserção padrão de condições médicas.
- **Prescrições e Atestados Web:** Emissão digital de receitas médicas com envio facilitado, assim como geração de atestados e solicitações de exames.
- **Controle de Autenticação Segura:** Autenticação forte garantindo que Médicos e Pacientes acessem apenas suas visões devidas, através de um sistema completo de herança de usuários.

### � Para os Pacientes
- **Cadastro Ágil e Descomplicado:** Portal intuitivo para inserção segura de dados pessoais.
- **Acompanhamento Pessoal:** Telas customizadas para gerenciar seu contato com a clínica.

---

## �️ Tecnologias Utilizadas

A arquitetura foi pensada em alto desempenho, empregando ferramentas líderes de mercado.

### Frontend
- **Framework:** `React 19` (Single Page Application)
- **Build Tool:** `Vite` (Ambiente ultrarrápido de desenvolvimento)
- **Roteamento:** `React Router DOM v7`
- **Estilização:** `CSS Puro` em união à suíte de classes do `Bootstrap 5` com `Bootstrap Icons`

### Backend
- **Linguagem & Framework:** `Java 17` operando através do robusto `Spring Boot 3.5.6`
- **Arquitetura:** API RESTful com rígida separação em camadas (`Models` / `Repositories` / `Services` / `Controllers`).
- **Persistência de Dados:** `Spring Data JPA` (utilizando o *Hibernate* por trás).
- **Banco de Dados:** `PostgreSQL`
- **Segurança:** `Spring Security` gerenciando acessos baseados em hierarquia de Papéis (Role-based Authorization) e autenticação estateless com Tokens `JWT` (via Auth0).

---

## 🚀 Como Executar o Projeto Localmente

Para testar o software na sua máquina, deverá iniciar o Banco de Dados, o Servidor Backend (API) e o Servidor Frontend em terminais separados.

### Pré-requisitos
- **Java 17** ou superior (JDK) instalado no sistema.
- **Node.js** (Versão 18+) e gerenciador de pacotes `npm`.
- Instância ativa do banco relacional **PostgreSQL**.

### Passo 1: Configurando e Rodando o Back-end
O backend atua como o motor lógico da sua aplicação.

1. Abra um terminal.
2. Navegue até o diretório do backend:
   ```bash
   cd clinic-system/backend
   ```
3. _*(Importante)*_ Verifique em `src/main/resources/application.properties` se as credenciais (username e password) do banco de dados combinam com a sua instalação local do PostgreSQL.
4. Execute a aplicação usando o utilitário nativo do Maven. Ele resolverá downloads de todas as bibliotecas pendentes:
   - **No Windows:**
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **No Linux/Mac:**
     ```bash
     ./mvnw spring-boot:run
     ```
5. A API iniciará com sucesso na porta padrão: `http://localhost:8080`.

### Passo 2: Configurando e Rodando o Front-end
Para iniciar as telas visuais do sistema.

1. Abra um **novo terminal** diferente do primeiro.
2. Acesse a pasta onde hospeda o React:
   ```bash
   cd clinic-system/frontend/sistema-clinico-unificado-frontend
   ```
3. Baixe e instale as árvores de pacotes do Javascript digitando:
   ```bash
   npm install
   ```
4. Suba o servidor reativo de desenvolvimento do Vite com:
   ```bash
   npm run dev
   ```
5. O sistema está no ar! Localize o endereço servido no terminal (provavelmente `http://localhost:5173`) e abra em seu navegador predileto.

---

## 📁 Estrutura Interna do Código-Fonte

```text
SistemaClinicoUnificado/
│
└── clinic-system/
    ├── backend/
    │   ├── src/main/java/com/scu/clinic_system/
    │   │   ├── config/      # Configurações de CORS e do Spring Security
    │   │   ├── controller/  # Interfaces expostas (Endpoints da API)
    │   │   ├── model/       # Estruturas do Banco (User, Doctor, Pacient...)
    │   │   ├── repository/  # Abstração de queries para o PostgreSQL
    │   │   ├── security/    # Tratamentos do Token JWT (Auth0)
    │   │   └── service/     # Core lógico das funcionalidades da clínica
    │   └── pom.xml          # Dependências Maven
    │
    └── frontend/
        └── sistema-clinico-unificado-frontend/
            ├── src/
            │   ├── components/  # Componentes reutilizáveis (Hero, Navbar, Footer...)
            │   ├── pages/       # Telas inteiras (Dashboards, Logins)
            │   ├── styles/      # Estilos CSS segmentados
            │   ├── App.jsx      # Definidor central das Rotas de Navegação
            │   └── main.jsx     # Boostrap da engine do React
            ├── package.json     # Node Scripts
            └── vite.config.js   # Otimizador do Frontend
```

---

## 👥 Equipe de Desenvolvimento

Solução idealizada e programada de ponta-a-ponta por:

| Nome | Funções Recentes |
| :--- | :--- |
| **Georges Andraus** | Desenvolvedor Backend, Arquiteto de Software, DBA |
| **Giovana Amorim Campos** | Scrum Master, Documentador Técnico, Analista de Requisitos |
| **Guilherme Braga Marinho** | Cientista de Dados, DBA, Desenvolvedor Backend |
| **João Mota Santos** | Desenvolvedor Frontend, Testador |
| **Leonardo Sette Tôrres de Oliveira**| Designer UI/UX, Desenvolvedor Frontend |

---

<p align="center">Desenvolvido com dedicação pela equipe SCU 🩵.</p>
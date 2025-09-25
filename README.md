# Sistema Clinico Unificado

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

## 📖 Sobre o Projeto

O objetivo principal deste projeto é otimizar e agilizar a jornada de atendimento ao paciente, desde o contato inicial até a consulta médica. Para isso, estamos desenvolvendo uma plataforma digital unificada que centraliza as informações e melhora a eficiência dos processos clínicos e administrativos, sempre em conformidade com a LGPD.

A solução é composta por dois sistemas principais:
1.  **Portal do Paciente:** Uma aplicação front-end onde os pacientes podem se cadastrar, realizar uma triagem preliminar com um chatbot e acessar seu histórico de saúde.
2.  **Plataforma Clínica Interna:** Um sistema de back-office para recepcionistas, enfermeiros, médicos e gestores hospitalares, otimizando o agendamento, triagem, atendimento e gestão.

---

## ✨ Principais Funcionalidades

### Para Pacientes
-   ✅ Autocadastro seguro de perfil.
-   🤖 Chatbot para triagem preliminar de sintomas e recomendação de especialistas.
-   🗂️ Acesso ao histórico completo de consultas, exames e prescrições.

### Para a Equipe Hospitalar
-   📅 Gestão completa de agendamentos (marcar, remarcar, cancelar).
-   🚀 Check-in inteligente para pacientes novos e pré-cadastrados.
-   🩺 Registro digital de triagem hospitalar (sinais vitais).
-   📋 Prontuário Eletrônico do Paciente (PEP) unificado.
-   📊 Dashboard com indicadores de performance (KPIs) para gestores.
-   ⚙️ Módulo de administração para gestão de usuários e permissões.

---

## 💻 Tecnologias Utilizadas

| Ferramenta | Descrição |
| :--- | :--- |
| **Front-end** | `React`, `Bootstrap` |
| **Back-end** | `Python`, `FastAPI` |
| **Banco de Dados** | `SQL Server` |
| **Conteinerização** | `Docker` |
| **Cloud & DevOps** | `Azure`, `Azure DevOps` |
| **Segurança** | `JWT`, `OAuth 2.0` |
| **Controle de Versão** | `Git` |

---

## 🚀 Começando

Siga estas instruções para configurar e executar o ambiente de desenvolvimento localmente.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [Python](https://www.python.org/downloads/) (versão 3.10 ou superior)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://seu-repositorio-aqui.git](https://seu-repositorio-aqui.git)
    cd nome-do-projeto
    ```

2.  **Configuração das Variáveis de Ambiente:**
    Existem arquivos `.env.example` nos diretórios `frontend/` e `backend/`. Crie cópias desses arquivos e renomeie-as para `.env`, preenchendo as variáveis necessárias.

    * **Backend (`backend/.env`):**
        ```env
        DATABASE_URL="sua_string_de_conexao_com_o_banco"
        SECRET_KEY="sua_chave_secreta_para_jwt"
        ALGORITHM="HS256"
        ```

    * **Frontend (`frontend/.env`):**
        ```env
        REACT_APP_API_BASE_URL="http://localhost:8000/api"
        ```

3.  **Execute o projeto com Docker Compose:**
    Este é o método recomendado, pois ele irá construir e executar os contêineres do front-end, back-end e do banco de dados de forma integrada.

    ```bash
    docker-compose up --build
    ```

4.  **Acesse as aplicações:**
    * 🖥️ **Aplicação Front-end (Portal do Paciente):** [http://localhost:3000](http://localhost:3000)
    * 📄 **Documentação da API Back-end (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🏗️ Estrutura do Projeto

.
├── backend/         # Código da API em FastAPI (Python)
│   ├── app/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/        # Código da Aplicação em React
│   ├── public/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
└── README.md


---

## 👥 Equipe

| Nome | Funções Principais |
| :--- | :--- |
| **Georges Andraus** | Desenvolvedor Backend, Arquiteto de Software, DBA |
| **Giovana Amorim Campos** | Scrum Master, Documentador Técnico, Analista de Requisitos |
| **Guilherme Braga Marinho** | Cientista de Dados, DBA, Desenvolvedor Backend |
| **João Mota Santos** | Desenvolvedor Frontend, Testador |
| **Leonardo Sette Tôrres de Oliveira**| Designer UI/UX, Desenvolvedor Frontend |

---

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
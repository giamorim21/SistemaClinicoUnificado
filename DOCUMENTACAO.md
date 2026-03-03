# Documentação Oficial: Sistema Clínico Unificado (SCU)

## 1. Visão Geral do Projeto

O **Sistema Clínico Unificado (SCU)** é uma plataforma digital completa desenhada para modernizar o fluxo de atendimento em clínicas e hospitais. Ele conecta dois mundos: a experiência do paciente e a gestão interna da equipe de saúde.

### 1.1 O que o projeto resolve?
Atualmente, clínicas sofrem com informações descentralizadas: o agendamento fica em um sistema, o prontuário em papel (ou em um software engessado) e a prescrição de receitas em outro. O SCU unifica tudo isso em uma única base de dados, acessível através de interfaces web rápidas e especializadas para cada tipo de usuário.

---

## 2. O Que Tem no Projeto? (Módulos e Funcionalidades)

O sistema foi desenhado através de uma Arquitetura de Permissões Fortes (*Role-Based Access Control*), onde cada usuário possui uma visão única baseada em seu cargo.

### 🔵 Módulo do Paciente (Portal Público)
Desenvolvido para ser acessível de celulares ou computadores.
* **Autocadastro:** O paciente pode criar sua conta sozinho informando dados essenciais, CPF e aceitando termos da LGPD.
* **Dashboard Pessoal:** (Em expansão) Permitirá visualizar seu histórico de consultas, receitas emitidas e agendamentos futuros.

### 🟢 Módulo Médico (Dashboard Clínico)
A principal interface de uso diário dos profissionais de saúde.
* **Visão de Agenda Diária:** Lista de consultas do dia, ordenadas por horários (9h, 10h, etc), com os motivos do agendamento.
* **Prontuário Eletrônico do Paciente (PEP):** Quando o médico clica em um paciente, ele abre o histórico completo (Alergias, medicamentos em uso) e os campos para a consulta atual (Queixa Principal, Anamnese, Exame Físico e Diagnóstico base CID-10).
* **Emissão de Prescrições e Receitas digitais:** O médico pode adicionar medicamentos, posologias e gerar uma receita com a opção de envio digital.
* **Atestados:** Geração e impressão de atestados médicos personalizados com justificativas de faltas.
* **Exames:** Solicitação de exames laboratoriais ou de imagem com integração no histórico do paciente.

### 🟣 Módulos de Apoio (Backend e Segurança)
O "Cérebro" do sistema invisível aos usuários, que mantem as regras e a segurança funcionais.
* **Autenticação Avançada:** Login protegido por criptografia forte de senha (BCrypt) e Tokens JWT.
* **Gerador Super-Admin:** Endpoint silencioso para criação do primeiro usuário administrador do sistema (Seed Manager).
* **APIs Restful:** Controladores isolados que organizam o fluxo de dados em formato JSON (ideal para o Frontend ler).
* **Herança Híbrida em Banco de Dados:** Modelagem sofisticada no banco de dados, onde *Doctors* (Médicos) e *Pacients* (Pacientes) estendem das mesmas propriedades de base de um *User* (Usuário padrão).

---

## 3. Tecnologias que Fazem o SCU Funcionar

Para suportar essas funcionalidades, utilizamos ferramentas modernas, seguras e com foco no mercado de trabalho atual:

* **Tela/Visual (Frontend):** Construído com **React.js 19** e **Vite**. Tudo é Single Page, garantindo que o site não precise recarregar inteiro a cada clique. A biblioteca **Bootstrap 5** cuida do visual responsivo e do layout de grades.
* **Lógica e Servidor (Backend):** Construído com **Java 17** e o framework **Spring Boot 3**. Ele valida dados, cuida de regras complexas e fala de forma segura com o Banco.
* **Armazenamento de Dados (Banco de Dados):** Usamos o **PostgreSQL**. O Spring Boot comunica automaticamente com o PostgreSQL através de técnicas chamadas Hibernate e JPA, evitando que tenhamos que escrever comandos SQL grandes manualmente.

---

## 4. Passo a Passo Completo: Como Rodar o Projeto na Sua Máquina

Devido à arquitetura dividida, o projeto possui 2 partes independentes que devem ser rodadas em **terminais (Telas Pretas) separadas** do seu computador.

### Preparação do Terreno (Instalações Necessárias)
Antes de começar, certifique-se de que no seu Windows você tenha instalado:
1. **Java JDK 17:** Essencial para o backend em Java funcionar.
2. **Node.js (LTS 18 ou 20):** Contém o "npm", a máquina de baixar pacotes do mundo Javascript.
3. **PostgreSQL:** Certifique-se de que o Postgres está rodando nos serviços do Windows na porta padrão `5432`.
   * *Aviso Crítico do Banco:* Dentro do projeto existe o arquivo **`backend/src/main/resources/application.properties`**. Nele, existe a configuração `@spring.datasource.url`, `@username` e `@password`. Você deve garantir que lá consta a senha correta de instalação do banco na sua máquina e que você criou previamente um database com o comando: `CREATE DATABASE clinic_system`.

---

### ETAPA 1: Iniciando o Backend API (Servidor Java)

1. Abra um terminal do Windows (Prompt de Comando ou PowerShell).
2. Acesse a pasta correspondente ao backend do sistema:
   ```cmd
   cd C:\Users\giovana.amorimc\Documents\SistemaClinicoUnificado\clinic-system\backend
   ```
3. O projeto tem um utilitário chamado "Maven Wrapper" (`mvnw`). Não é necessário instalar o Apache Maven separadamente, basta usar este comando abaixo:
   ```cmd
   mvnw.cmd spring-boot:run
   ```
   > **O que vai acontecer?** Ele fará o download de meia internet (as bibliotecas do Spring, do Hibernate e do JWT). Em seguida, ele compilará o código Java. O banco de dados vai criar/atualizar as tabelas automaticamente. Se aparecer o ícone enorme do *Spring* e no final estiver a frase *Started ClinicSystemApplication in X seconds*, o seu **motor está online na porta 8080 local!** Não feche esse terminal.

---

### ETAPA 2: Iniciando o Frontend (A Interface Web)

1. Abra um **SEGUNDO terminal**.
2. Acesse a pasta onde fica e a Raiz do Frontend (Onde está o `package.json`):
   ```cmd
   cd C:\Users\giovana.amorimc\Documents\SistemaClinicoUnificado\clinic-system\frontend\sistema-clinico-unificado-frontend
   ```
3. Na primeira vez, precisamos ordenar que o sistema instale o React, o Vite e o Bootstrap na nossa máquina local:
   ```cmd
   npm install
   ```
   > Aguarde alguns segundos. Você verá que uma nova pasta chamada `node_modules` será injetada.
4. Agora ligue o servidor de desenvolvimento do frontend:
   ```cmd
   npm run dev
   ```
5. O terminal retornará o endereço em que a tela está disponível (Geralmente é `http://localhost:5173`).
6. **Segure a tecla CTRL do seu teclado e clique** no endereço impresso no terminal, ou apenas copie e cole no seu navegador Google Chrome/Edge.

### Parabéns! 🚀 
Você agora está com o SCU rodando localmente no seu computador e pode testar os cadastros, painel médico e funcionalidades visuais em tempo real integradas com o banco de dados PostgreSQL!

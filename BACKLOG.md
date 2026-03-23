# Backlog – Sistema Clínico Unificado (SCU)
### Formato: Azure DevOps — Épico › Feature › Backlog Item › Task

> **Última atualização:** Março/2026
> Hierarquia: **Épico** › **Feature** › **Backlog Item** › **Task**

---

# 🟣 ÉPICO 1 — Módulo Médico (PEP – Prontuário Eletrônico do Paciente)

> **Objetivo:** Centralizar o atendimento clínico do profissional de saúde, permitindo gestão da agenda, registro de consultas, emissão de documentos e integração com CID-10.

---

## 🔵 Feature 1.1 — Cadastro e Gestão de Profissionais de Saúde

### 📗 Backlog Item 1.1.1 — Backend: Estrutura de Cadastro Médico
**Como** administrador do sistema,
**Quero** gerenciar as informações de médicos no servidor,
**Para que** o cadastro e validações sejam feitos de forma segura e o sistema processe as habilitações corretamente.

#### ✅ Tasks
- [ ] Atualizar estrutura de dados do Médico
  - *Descrição técnica:* Expandir model `Doctor` adicionando campos complementares (councilType, councilState, specialty, etc).
- [ ] Adicionar regras de obrigatoriedade
  - *Descrição técnica:* Adicionar validações Bean Validation nos campos obrigatórios do `Doctor`.
- [ ] Implementar operações de negócio para Médicos
  - *Descrição técnica:* Implementar `DoctorService` para criação, atualização e ativação/desativação, incluindo validação de CRM único por estado.
- [ ] Disponibilizar comunicação da API
  - *Descrição técnica:* Criar `DoctorController` com endpoints (POST, GET, PUT, PATCH) e aplicar proteção `ROLE_ADMIN` e `ROLE_DOCTOR`.

### 📗 Backlog Item 1.1.2 — Frontend: Tela de Cadastro Médico
**Como** administrador do sistema,
**Quero** uma interface para cadastrar médicos,
**Para que** o sistema reconheça o profissional corretamente.

#### ✅ Tasks
- [ ] Construir tela de cadastro principal
  - *Descrição técnica:* Criar formulário de cadastro com dados do médico, especialidade e conselho (dentro do módulo de administração).
- [ ] Incluir configurações adicionais na tela
  - *Descrição técnica:* Adicionar campos de regras de retorno, múltiplas consultas e habilitação de perfil.
- [ ] Conectar tela ao servidor
  - *Descrição técnica:* Integrar formulário enviando dados para a API `POST /api/doctors`.

---

## 🔵 Feature 1.2 — Agenda do Médico

### 📗 Backlog Item 1.2.1 — Backend: Mecanismo de Agendamentos
**Como** sistema,
**Quero** registrar agendamentos de consulta no banco,
**Para que** os agendamentos fiquem salvos e consultáveis.

#### ✅ Tasks
- [ ] Criar estrutura de Consulta
  - *Descrição técnica:* Criar entidade `Appointment` com campos de paciente, médico, data/hora, status e tipo.
- [ ] Implementar lógica de busca e atualização
  - *Descrição técnica:* Criar `AppointmentService` para gerenciar listagens por médico/paciente, agendamento e mudança de status.
- [ ] Disponibilizar agendamento na API
  - *Descrição técnica:* Criar `AppointmentController` para endpoints de GET e POST referentes à agenda.

### 📗 Backlog Item 1.2.2 — Frontend: Painel da Agenda Médica
**Como** médico,
**Quero** visualizar minha agenda nos formatos dia, semana e mês,
**Para que** eu possa acompanhar e gerenciar meus atendimentos.

#### ✅ Tasks
- [ ] Construir interface de agenda interativa
  - *Descrição técnica:* Implementar navegação de visualização por dia, semana e mês no `DashBoardMedico.jsx`.
- [ ] Integrar agenda com dados reais
  - *Descrição técnica:* Substituir mocks pela comunicação com `GET /api/appointments`.
- [ ] Exibir situação de cada consulta na interface
  - *Descrição técnica:* Mostrar visualmente o status (confirmada, andamento, pendente) de modo claro para o médico.

---

## 🔵 Feature 1.3 — Prontuário Eletrônico do Paciente (PEP)

### 📗 Backlog Item 1.3.1 — Backend: Registro Clínico Eletrônico
**Como** sistema,
**Quero** processar dados do registro clínico,
**Para que** fiquem salvos de forma estruturada.

#### ✅ Tasks
- [ ] Estruturar o Prontuário no banco de dados
  - *Descrição técnica:* Criar entidade `MedicalRecord` com detalhes da consulta (queixa, exame, diagnóstico, conduta).
- [ ] Criar serviços do Prontuário
  - *Descrição técnica:* Implementar `MedicalRecordService` e seu Controller para criar e listar por paciente.
- [ ] Preparar base de doenças (CID-10)
  - *Descrição técnica:* Criar tabela e seed via Flyway para CID-10 e disponibilizar endpoint de busca textual.

### 📗 Backlog Item 1.3.2 — Frontend: Preenchimento do Prontuário
**Como** médico,
**Quero** registrar a consulta do paciente de forma interativa,
**Para que** o histórico fique unificado.

#### ✅ Tasks
- [ ] Adicionar busca rápida de pacientes
  - *Descrição técnica:* Implementar campo de pesquisa por nome ou CPF antes de abrir o prontuário.
- [ ] Criar interface do registro da consulta
  - *Descrição técnica:* Construir formulário para nova consulta e conectar ao `POST /api/records`.
- [ ] Adicionar recurso de busca de doenças
  - *Descrição técnica:* Implementar autocomplete integrado ao endpoint do CID-10 no campo de diagnóstico.
- [ ] Listar histórico do paciente
  - *Descrição técnica:* Exibir consultas anteriores em formato de lista expansível puxando do `GET /api/records/patient/{id}`.

---

## 🔵 Feature 1.4 — Prescrição de Tratamentos e Medicamentos

### 📗 Backlog Item 1.4.1 — Backend: Armazenamento de Receitas
**Como** sistema,
**Quero** guardar os dados das receitas médicas,
**Para que** a prescrição médica seja auditável.

#### ✅ Tasks
- [ ] Criar estrutura de dados da Receita
  - *Descrição técnica:* Criar entidade `Prescription` com lista JSON de medicamentos, assinaturas e vínculos.
- [ ] Disponibilizar serviços de Prescrição
  - *Descrição técnica:* Criar `PrescriptionService` e `PrescriptionController` para gestão e listagem via API (`POST` e `GET`).

### 📗 Backlog Item 1.4.2 — Frontend: Emissão de Receitas
**Como** médico,
**Quero** prescrever medicamentos,
**Para que** o paciente receba sua receita.

#### ✅ Tasks
- [ ] Construir tela de prescrição
  - *Descrição técnica:* Implementar lista dinâmica de medicamentos onde o médico adiciona ou remove itens.
- [ ] Integrar prescrição ao sistema
  - *Descrição técnica:* Conectar o formulário à chamada `POST /api/prescriptions`.
- [ ] Oferecer envio e exportação da receita
  - *Descrição técnica:* Adicionar funcionalidade para gerar PDF e opção (checkbox) para envio digital (e-mail/SMS).

---

## 🔵 Feature 1.5 — Emissão de Atestados

### 📗 Backlog Item 1.5.1 — Backend: Registros de Atestado
**Como** sistema,
**Quero** salvar as informações dos atestados,
**Para que** haja um registro oficial.

#### ✅ Tasks
- [ ] Estruturar dados do Atestado
  - *Descrição técnica:* Criar entidade `MedicalCertificate` identificando o tipo (presença, acompanhamento), dias de afastamento e CID-10.
- [ ] Implementar serviços de Atestado na API
  - *Descrição técnica:* Criar `CertificateService` e Controller (`POST` e `GET`) para processar criações e buscas.

### 📗 Backlog Item 1.5.2 — Frontend: Gerador de Atestados
**Como** médico,
**Quero** emitir atestados variados,
**Para que** o paciente tenha a documentação.

#### ✅ Tasks
- [ ] Criar tela para emissão de atestado
  - *Descrição técnica:* Conectar formulário com `POST /api/certificates` e incluir campo autocomplete de CID-10.
- [ ] Permitir a impressão do atestado
  - *Descrição técnica:* Implementar funcionalidade de gerar PDF do atestado formatado.

---

## 🔵 Feature 1.6 — Solicitação de Exames e Encaminhamentos

### 📗 Backlog Item 1.6.1 — Backend: Base de Pedidos Médicos
**Como** sistema,
**Quero** rastrear os pedidos de exames e especialistas,
**Para que** fique registrado no prontuário.

#### ✅ Tasks
- [ ] Criar estrutura para Solicitações Médicas
  - *Descrição técnica:* Criar entidade `ExamRequest` para exames (laboratório, imagem) e encaminhamentos com justificativa.
- [ ] Implementar rotas para as Solicitações
  - *Descrição técnica:* Criar service e controller (`POST` e `GET`) para salvar e consultar por paciente via API.

### 📗 Backlog Item 1.6.2 — Frontend: Ponto de Solicitações Clínicas
**Como** médico,
**Quero** solicitar exames e especialistas de forma simples,
**Para que** o fluxo do cuidado ocorra corretamente.

#### ✅ Tasks
- [ ] Construir tela comum de Solicitações
  - *Descrição técnica:* Implementar seleção intuitiva de tipo (Laboratório, Imagem, Encaminhamento).
- [ ] Integrar preenchimento da Solicitação
  - *Descrição técnica:* Conectar busca de exames à API e salvar tudo via `POST /api/exam-requests`.

---

## 🔵 Feature 1.7 — Retornos e Relatórios Médicos

### 📗 Backlog Item 1.7.1 — Backend: Registro de Relatórios e Retornos
**Como** sistema,
**Quero** guardar agendamentos de retorno e relatórios escritos,
**Para que** sejam resgatados nas próximas consultas.

#### ✅ Tasks
- [ ] Estruturar dados de Retorno e Relatório
  - *Descrição técnica:* Criar entidades `ReturnRequest` e `MedicalReport` vinculadas ao Prontuário.
- [ ] Fornecer serviços via API
  - *Descrição técnica:* Criar endpoints POST e GET para lidar com retornos e relatórios.

### 📗 Backlog Item 1.7.2 — Frontend: Agendamento de Retornos
**Como** médico,
**Quero** agendar retornos e registrar relatórios detalhados,
**Para que** eu acompanhe a evolução do paciente.

#### ✅ Tasks
- [ ] Criar interface para Retornos e Relatórios
  - *Descrição técnica:* Implementar seções separadas para agendar retorno e escrever relatório textual conectados à API.
- [ ] Exibir previsão de retornos
  - *Descrição técnica:* Listar no prontuário todos os retornos já agendados com o paciente.

---

## 🔵 Feature 1.8 — Integração e Qualidade do Dashboard Médico

### 📗 Backlog Item 1.8.1 — Frontend: Visão Geral e Indicadores
**Como** médico,
**Quero** ter um painel com informações atualizadas,
**Para que** eu confie nos dados exibidos.

#### ✅ Tasks
- [ ] Visualizar métricas reais no Dashboard
  - *Descrição técnica:* Substituir os dados estáticos do Overview (pacientes, consultas) pelos dados reais consumidos da API.
- [ ] Atualizar gráficos de atendimento
  - *Descrição técnica:* Substituir gráfico estático por biblioteca (ex: Recharts) integrada com os endpoints da API.
- [ ] Mostrar perfil do usuário logado
  - *Descrição técnica:* Obter informações via token JWT ou `GET /api/doctors/me` para exibir no cabeçalho.
- [ ] Configurar interceptador da API
  - *Descrição técnica:* Configurar serviço centralizado `api.js` (axios) com interceptor de autenticação JWT.
- [ ] Proteger o acesso do Dashboard
  - *Descrição técnica:* Adicionar rota segura (`PrivateRoute`) que bloqueia acessos não autorizados.

---

# 🟣 ÉPICO 2 — Módulo de Administração

> **Objetivo:** Fornecer ao administrador ferramentas para gerir acessos e monitorar parâmetros globais do sistema.

---

## 🔵 Feature 2.1 — Cadastro e Gestão de Usuários

### 📗 Backlog Item 2.1.1 — Backend: Base Central de Usuários
**Como** sistema,
**Quero** centralizar o registro de usuários na base,
**Para que** o controle de acesso seja seguro.

#### ✅ Tasks
- [ ] Aprimorar dados de Administradores
  - *Descrição técnica:* Expandir `Admin` adicionando campos novos (fullName, cpf, position, phone).
- [ ] Implementar serviços de controle de perfis
  - *Descrição técnica:* Criar `AdminService` que crie perfis de qualquer tipo, ative/desative e liste com lógica avançada.
- [ ] Criar controle restrito para Usuários
  - *Descrição técnica:* Criar `AdminController` para gestão de usuários, obrigando a role `ROLE_ADMIN` em todos os endpoints (`POST`, `GET`, `PUT`, `PATCH`).

### 📗 Backlog Item 2.1.2 — Frontend: Painel de Controle de Contas
**Como** administrador,
**Quero** um painel para adicionar e editar usuários da equipe,
**Para que** eu gerencie as contas do sistema e controle quem tem acesso.

#### ✅ Tasks
- [ ] Estruturar Painel Administrativo
  - *Descrição técnica:* Criar componente base `DashboardAdmin.jsx` com menu lateral de navegação.
- [ ] Construir tela de listagem e filtro
  - *Descrição técnica:* Mostrar todos os usuários com capacidade de filtrar por tipo (médico, recepcionista, etc).
- [ ] Desenvolver fluxos de criação e edição
  - *Descrição técnica:* Criar modais e formulários com os dados de usuários conectando aos endpoints do `AdminController`.
- [ ] Adicionar funcionalidade de ativação de conta
  - *Descrição técnica:* Incluir botão interativo para ativar/desativar conta do usuário com confirmação na tela.

---

## 🔵 Feature 2.2 — Controle de Acessos e Permissões por Perfil

### 📗 Backlog Item 2.2.1 — Backend: Regras de Autorização
**Como** sistema,
**Quero** organizar perfis rigorosamente,
**Para que** as validações de API bloqueiem acesso indevido por perfil de usuário.

#### ✅ Tasks
- [ ] Organizar grupos de permissões
  - *Descrição técnica:* Revisar e mapear a listagem de `Role` (ADMIN, DOCTOR, PATIENT, RECEPTIONIST).
- [ ] Oferecer rotas para gerenciar acessos
  - *Descrição técnica:* Criar endpoints `GET` e `PUT` em `/api/admin/users/{id}/permissions` para consultar e atualizar papéis.
- [ ] Aplicar restrições nas rotas globais
  - *Descrição técnica:* Ajustar `SecurityConfig` aplicando restrições corretas baseadas nos roles em toda a aplicação.

### 📗 Backlog Item 2.2.2 — Frontend: Interface de Permissões
**Como** administrador,
**Quero** gerenciar visualmente os acessos e permissões por usuário,
**Para que** seja intuitivo dar ou remover funcionalidades adequadas.

#### ✅ Tasks
- [ ] Construir tela para permissões interativas
  - *Descrição técnica:* Criar tela exibindo uma lista clara de permissões de acesso com checkboxes.
- [ ] Salvar alterações de permissões
  - *Descrição técnica:* Conectar as caixas de seleção ao request de `GET` e `PUT` da API `/api/admin/users/{id}/permissions`.

---

## 🔵 Feature 2.3 — Configurações Gerais do Sistema

### 📗 Backlog Item 2.3.1 — Backend: Parâmetros Globais
**Como** sistema,
**Quero** hospedar informações globais,
**Para que** todas as aplicações usem os mesmos parâmetros operacionais.

#### ✅ Tasks
- [ ] Fornecer rotas para clínicas
  - *Descrição técnica:* Disponibilizar GET, POST e PUT para gestão de localidades hospitalares/clínicas.
- [ ] Fornecer rotas para especialidades e parâmetros
  - *Descrição técnica:* Criar endpoints para listar e editar profissionais/especialidades e configurações administrativas globais do sistema (`settings`).

### 📗 Backlog Item 2.3.2 — Frontend: Configurações de Clínicas e Especialidades
**Como** administrador,
**Quero** cadastrar as filiais e especialidades disponíveis,
**Para que** essas opções reflitam na realidade operacional da instituição.

#### ✅ Tasks
- [ ] Criar gestão de Clínicas
  - *Descrição técnica:* Desenvolver tela e formulário de cadastro de clínicas e hospitais conectado à API.
- [ ] Criar gestão de Especialidades e Parâmetros
  - *Descrição técnica:* Criar telas de configuração de especialidades médicas e de parâmetros gerais da instituição usando a API.

---

## 🔵 Feature 2.4 — Segurança e Infraestrutura

### 📗 Backlog Item 2.4.1 — Backend: Defesa e Documentação de API
**Como** DevOps / administrador de sistema,
**Quero** aplicar padrões modernos de segurança,
**Para que** dados sensíveis de pacientes fiquem protegidos de ataques externos.

#### ✅ Tasks
- [ ] Garantir expiração segura de acessos
  - *Descrição técnica:* Implementar Refresh Token e Blacklist de JWT (ex: tabela `token_blacklist` ou Redis).
- [ ] Proteger o sistema contra robôs de acesso
  - *Descrição técnica:* Adicionar Rate Limiting na rota de login (ex: Bucket4j limitando falhas e repetições).
- [ ] Isolar senhas do código-fonte
  - *Descrição técnica:* Remover credenciais visíveis do `application.properties` para variáveis de ambiente.
- [ ] Rastrear acessos e criar auditoria em banco de dados
  - *Descrição técnica:* Usar `@EntityListeners` para log de dados sensíveis e migrar DDL-Auto para scripts de migração do Flyway.
- [ ] Documentar API e usar conteinerização
  - *Descrição técnica:* Habilitar geração do Swagger UI (`springdoc-openapi`) e configurar `Dockerfile` junto ao `docker-compose.yml`.

---

# 🟣 ÉPICO 3 — Sistema Voltado para o Paciente (Front-end / Portal)

> **Objetivo:** Oferecer interface digital ao paciente para suporte, autocadastro, acompanhamento e triagem inicial.

---

## 🔵 Feature 3.1 — Autocadastro e Autenticação do Paciente

### 📗 Backlog Item 3.1.1 — Backend: Recepção de Novos Pacientes
**Como** sistema,
**Quero** receber e validar novos pacientes no banco,
**Para que** o perfil do paciente seja criado com segurança.

#### ✅ Tasks
- [ ] Liberar rota de criação de pacientes
  - *Descrição técnica:* Configurar `POST /api/pacients` como rota pública livre de restrições.
- [ ] Validar campos recebidos
  - *Descrição técnica:* Validar campo de cobrança `paymentMethod` e remover campos antigos (como `occupation` do modelo).
- [ ] Garantir recebimento completo dos dados
  - *Descrição técnica:* Garantir que a entidade receba e lide com dados variados do convênio (healthPlan, planHolder) e dados familiares complementares.
- [ ] Autenticar paciente corretamente
  - *Descrição técnica:* Garantir que a `POST /api/auth/login` retorne adequadamente o perfil JWT `ROLE_PATIENT`.

### 📗 Backlog Item 3.1.2 — Frontend: Portal de Acesso do Paciente
**Como** paciente,
**Quero** realizar meu autocadastro de forma parcelada ou acessar o meu portal,
**Para que** minha ativação seja amigável.

#### ✅ Tasks
- [ ] Construir o formulário de etapas do Cadastro
  - *Descrição técnica:* Em `Register.jsx`, implementar um "stepper" em três passos: Dados Pessoais -> Convênio -> Dados Complementares.
- [ ] Adicionar recursos do formulário
  - *Descrição técnica:* Implementar validação de CPF no momento que o paciente digita e a capacidade de anexar foto para enviar para a API.
- [ ] Conectar acesso principal
  - *Descrição técnica:* Em `Login.jsx` realizar o envio para o login via `POST /api/auth/login`, armazenando o token recebido no `localStorage`.
- [ ] Criar lógica de redirecionamento de tela
  - *Descrição técnica:* Preparar `PrivateRoute` para redirecionar corretamente o médico para a tela X ou paciente para a sua tela final baseando-se no que a API respondeu.

---

## 🔵 Feature 3.2 — Perfil do Paciente (Visualização e Edição)

### 📗 Backlog Item 3.2.1 — Backend: Controle de Alterações
**Como** sistema,
**Quero** validar edições de dados feitas pelo paciente,
**Para que** informações imutáveis do registro não sejam alteradas indevidamente.

#### ✅ Tasks
- [ ] Criar endpoint atualizado do perfil
  - *Descrição técnica:* Implementar endpoint extraível pelo JWT do próprio usuário via `PUT /api/pacients/me` e `GET`.
- [ ] Proteger as restrições sensíveis
  - *Descrição técnica:* Bloquear logicamente para que campos de forte validação (como CPF) sejam impedidos de serem alterados, sendo limitados a admin.

### 📗 Backlog Item 3.2.2 — Frontend: Edição de Perfil
**Como** paciente,
**Quero** visualizar todos os meus dados agrupados e modificá-los de modo prático,
**Para que** minha documentação refletindo convênios e informações esteja em dia.

#### ✅ Tasks
- [ ] Criar estrutura base do painel do paciente
  - *Descrição técnica:* Montar o design principal em `DashBoardPaciente.jsx` contendo barra lateral, topo e área de informações através de abas.
- [ ] Permitir a edição em blocos de dados
  - *Descrição técnica:* Habilitar pequenos formulários para alterar as restrições permitidas consumindo `PUT /api/pacients/me`.

---

## 🔵 Feature 3.3 — Histórico de Consultas e Exames

### 📗 Backlog Item 3.3.1 — Backend: Compilação de Histórico
**Como** sistema,
**Quero** agrupar toda a jornada retrospectiva do paciente,
**Para que** ele extraia os registros simplificadamente.

#### ✅ Tasks
- [ ] Disponibilizar Histórico unificado do paciente
  - *Descrição técnica:* Expor uma rota resumida do usuário, `GET /api/pacients/me/records` concatenando exames e relatórios por data de prontuário.

### 📗 Backlog Item 3.3.2 — Frontend: Linha do Tempo Médica
**Como** paciente,
**Quero** listar as minhas consultas anteriores obtendo os dados e prescrições emitidas,
**Para que** eu consiga verificar meu tratamento.

#### ✅ Tasks
- [ ] Apresentar interface cronológica
  - *Descrição técnica:* Renderizar um container de lista no modelo de expansão, interligando a visualização e conexão em requisições feitas na API.
- [ ] Permitir abertura de todos arquivos anexos
  - *Descrição técnica:* Ligar opções pra mostrar de forma visual o texto da receita, e exames vinculados à consulta na parte inferior do cartão clicável.

---

## 🔵 Feature 3.4 — Visualização de Consultas Agendadas com Mapa

### 📗 Backlog Item 3.4.1 — Backend: Endereçamento de Agendamentos
**Como** sistema,
**Quero** buscar dados diretos de horários com endereçamento real,
**Para que** a interface gráfica mostre as referências de clínica com eficiência.

#### ✅ Tasks
- [ ] Configurar lista de rotas de agendamentos futuros
  - *Descrição técnica:* Providenciar um request que retorna arrays via `GET /api/pacients/me/appointments` exibindo nome e endereço concatenado da clínica.

### 📗 Backlog Item 3.4.2 — Frontend: Mapa e Localização
**Como** paciente,
**Quero** visualizar com mapas as futuras consultas,
**Para que** eu calcule o percurso e me organize perfeitamente.

#### ✅ Tasks
- [ ] Exibir o lembrete de agendamentos em cartões
  - *Descrição técnica:* Adicionar seção trazendo e priorizando da API em ordem crescente listagens de horários para a pessoa, com a data e nome do médico.
- [ ] Apresentar widget de visualização no mapa integrado
  - *Descrição técnica:* Fazer integração com um iFrame/Google Map ou Leaflet consumindo o trecho de endereço referenciado pela consulta.

---

## 🔵 Feature 3.5 — Chatbot de Triagem Preliminar

### 📗 Backlog Item 3.5.1 — Backend: Inteligência de Triagem
**Como** sistema,
**Quero** interpretar palavras e os incômodos relatados pelo paciente,
**Para que** as prioridades iniciais criem o começo do atendimento agilizado.

#### ✅ Tasks
- [ ] Guardar relatórios das respostas no banco
  - *Descrição técnica:* Aplicar entidade relacional que documente (`TriageSession`) gerando automaticamente links para Prontuário Preliminar.
- [ ] Lidar com lógica textual ou de encaminhamento
  - *Descrição técnica:* Implementar `TriageService` de indicação de médico, expostos dentro do modelo `POST /api/triage`.

### 📗 Backlog Item 3.5.2 — Frontend: Conversa de Triagem Simulada
**Como** paciente,
**Quero** mandar mensagens para o suporte do portal e descobrir sobre meu atendimento,
**Para que** os passos burocráticos e clínicos prévios economizem tempo.

#### ✅ Tasks
- [ ] Desenhar o ambiente virtual de Chat guiado
  - *Descrição técnica:* Estruturar graficamente o fluxo do questionário em bolhas e avatares dentro do portal utilizando troca de informações com a rota `/api/triage`.
- [ ] Entregar um encerramento para a interação da máquina
  - *Descrição técnica:* Finalizar o preenchimento com clareza devolvendo o parecer virtual da recomendação da área da saúde ou do médico focado.

---

## 🔵 Feature 3.6 — Infraestrutura Frontend (Paciente)

### 📗 Backlog Item 3.6.1 — Frontend: Base de Navegação e Estabilidade
**Como** desenvolvedor,
**Quero** criar uma experiência escalonável e centralizada,
**Para que** as interfaces de navegação não quebrem subitamente.

#### ✅ Tasks
- [ ] Criar serviço e interrupções em local único
  - *Descrição técnica:* Estabelecer todo as configurações unidas do Axios HTTP juntamente de tratamentos 401 ou erros de falha num arquivo próprio.
- [ ] Disponibilizar autenticação fluída para qualquer tela
  - *Descrição técnica:* Estabelecer o gerenciamento pelo formato API Context com sessão persistida interligando aberturas e acessos às requisições do paciente.
- [ ] Refazer feedback contínuo e experiência portátil
  - *Descrição técnica:* Inserir por todo pacote transições animadas e checar comportamento responsivo mobile do dashboard inteiro com interatividade (`loading`).

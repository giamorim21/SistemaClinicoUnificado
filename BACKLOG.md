# Backlog – Sistema Clínico Unificado (SCU)
### Formato: Azure DevOps — Épico › Feature › Backlog Item › Task

> **Última atualização:** Março/2026
> Hierarquia: **Épico** (objetivo estratégico) › **Feature** (capacidade entregável) › **Backlog Item** (história de usuário) › **Task** (tarefa técnica)

---

---

# 🟣 ÉPICO 1 — Módulo Médico (PEP – Prontuário Eletrônico do Paciente)

> **Objetivo:** Centralizar o atendimento clínico do profissional de saúde, permitindo gestão da agenda, registro de consultas, emissão de documentos e integração com CID-10.

---

## 🔵 Feature 1.1 — Cadastro e Gestão de Profissionais de Saúde

### 📗 Backlog Item 1.1.1
**Como** administrador do sistema,
**Quero** cadastrar médicos com todas as informações do conselho e perfil profissional,
**Para que** o sistema reconheça o profissional com suas habilitações corretas.

#### ✅ Tasks — Backend
- [ ] Expandir model `Doctor` adicionando campos: `councilType` (CRM, CRO etc.), `councilState`, `councilNumber`, `professionalType`, `situation`, `specialty`, `rqe`, `academicBackground`, `languages`, `institutionalLinks`, `scheduleValidity`, `associatedPrograms`, `actingArea`, `returnRules`, `allowMultipleConsultations`, `doctorProfileEnabled`
- [ ] Adicionar validações Bean Validation nos campos obrigatórios do `Doctor`
- [ ] Implementar `DoctorService.createDoctor()` com validação de CRM único por estado
- [ ] Implementar `DoctorService.updateDoctor()` para edição de perfil
- [ ] Implementar `DoctorService.toggleStatus()` para ativar/desativar médico
- [ ] Criar `DoctorController` com endpoints: `POST /api/doctors`, `GET /api/doctors/{id}`, `GET /api/doctors?specialty=`, `PUT /api/doctors/{id}`, `PATCH /api/doctors/{id}/status`
- [ ] Proteger endpoints com roles `ROLE_ADMIN` e `ROLE_DOCTOR`

#### ✅ Tasks — Frontend
- [ ] Criar formulário de cadastro de médico com todos os campos da documentação (dentro do módulo de administração)
- [ ] Incluir campo de seleção de tipo de conselho (CRM, CRO, etc.) e estado
- [ ] Implementar campo de especialidade e RQE
- [ ] Adicionar seção de configurações: regras de retorno, múltiplas consultas, habilitação de perfil
- [ ] Conectar formulário ao `POST /api/doctors`

---

## 🔵 Feature 1.2 — Agenda do Médico

### 📗 Backlog Item 1.2.1
**Como** médico,
**Quero** visualizar minha agenda nos formatos dia, semana e mês,
**Para que** eu possa acompanhar e gerenciar meus atendimentos.

#### ✅ Tasks — Backend
- [ ] Criar entidade `Appointment` com campos: `id`, `doctorId`, `pacientId`, `dateTime`, `status` (agendado, confirmado, realizado, cancelado), `type` (primeira consulta, retorno), `room`
- [ ] Criar `AppointmentService` com métodos: `listByDoctor(doctorId, date, view)`, `listByPatient(patientId)`, `scheduleAppointment()`, `updateStatus()`
- [ ] Criar `AppointmentController` com endpoints: `GET /api/appointments?doctorId=&date=&view=day|week|month`, `POST /api/appointments`, `PATCH /api/appointments/{id}/status`

#### ✅ Tasks — Frontend
- [ ] Integrar seção "Agenda" do `DashBoardMedico.jsx` com `GET /api/appointments`
- [ ] Implementar navegação de datas (anterior/próximo) nas três visões (dia, semana, mês)
- [ ] Substituir dados mockados por respostas reais da API
- [ ] Exibir status de cada consulta (confirmada, em andamento, pendente)

---

## 🔵 Feature 1.3 — Prontuário Eletrônico do Paciente (PEP)

### 📗 Backlog Item 1.3.1
**Como** médico,
**Quero** registrar consultas de forma estruturada (queixa, antecedentes, exame físico, diagnóstico, conduta),
**Para que** o histórico clínico do paciente fique centralizado e acessível.

#### ✅ Tasks — Backend
- [ ] Criar entidade `MedicalRecord` com campos: `id`, `pacientId`, `doctorId`, `appointmentId`, `consultationDate`, `chiefComplaint`, `personalHistory`, `physicalExam`, `diagnosis` (CID-10), `therapeuticConduct`
- [ ] Criar `MedicalRecordService` com métodos: `create()`, `getById()`, `listByPatient(patientId)`
- [ ] Criar `MedicalRecordController` com endpoints: `POST /api/records`, `GET /api/records/{id}`, `GET /api/records/patient/{id}`
- [ ] Criar tabela/migration de CID-10 e endpoint `GET /api/cid10?search=` para busca textual por código ou descrição
- [ ] Popular base de dados de CID-10 via Flyway seed

#### ✅ Tasks — Frontend
- [ ] Adicionar campo de busca de paciente (por nome ou CPF) antes de abrir prontuário
- [ ] Conectar histórico clínico ao `GET /api/records/patient/{id}`
- [ ] Conectar formulário de "Registro da Consulta Atual" ao `POST /api/records`
- [ ] Implementar autocomplete de CID-10 no campo de diagnóstico (`GET /api/cid10?search=`)
- [ ] Exibir histórico de consultas anteriores em lista expansível

---

## 🔵 Feature 1.4 — Prescrição de Tratamentos e Medicamentos

### 📗 Backlog Item 1.4.1
**Como** médico,
**Quero** prescrever medicamentos e emitir receitas digitais,
**Para que** o paciente receba a prescrição de forma segura e rastreável.

#### ✅ Tasks — Backend
- [ ] Criar entidade `Prescription` com campos: `id`, `medicalRecordId`, `medications` (lista JSON), `issuedDate`, `doctorSignature`
- [ ] Criar `PrescriptionService`: `create()`, `getById()`, `listByRecord()`
- [ ] Criar `PrescriptionController`: `POST /api/prescriptions`, `GET /api/prescriptions/{id}`, `GET /api/prescriptions/record/{id}`

#### ✅ Tasks — Frontend
- [ ] Conectar formulário da seção "Prescrição e Receitas" ao `POST /api/prescriptions`
- [ ] Implementar lista dinâmica de medicamentos (adicionar/remover)
- [ ] Habilitar checkbox de envio de receita digital (e-mail/SMS)
- [ ] Implementar geração de receita em PDF para download

---

## 🔵 Feature 1.5 — Emissão de Atestados

### 📗 Backlog Item 1.5.1
**Como** médico,
**Quero** emitir atestados (presença, justificativa e acompanhamento),
**Para que** o paciente tenha documentação oficial do atendimento.

#### ✅ Tasks — Backend
- [ ] Criar entidade `MedicalCertificate`: `id`, `medicalRecordId`, `type` (enum: PRESENCE, JUSTIFICATION, ACCOMPANIMENT), `daysOff`, `cid10`, `observations`, `issuedDate`
- [ ] Criar `CertificateService`: `create()`, `getById()`
- [ ] Criar `CertificateController`: `POST /api/certificates`, `GET /api/certificates/{id}`

#### ✅ Tasks — Frontend
- [ ] Conectar formulário de atestado ao `POST /api/certificates`
- [ ] Implementar autocomplete de CID-10 no campo do atestado
- [ ] Habilitar geração de atestado em PDF

---

## 🔵 Feature 1.6 — Solicitação de Exames e Encaminhamentos

### 📗 Backlog Item 1.6.1
**Como** médico,
**Quero** solicitar exames e encaminhamentos para especialistas integrado ao CID-10,
**Para que** o fluxo de cuidado do paciente seja contínuo e documentado.

#### ✅ Tasks — Backend
- [ ] Criar entidade `ExamRequest`: `id`, `medicalRecordId`, `requestType` (enum: LAB, IMAGE, REFERRAL), `description`, `cid10`, `clinicalJustification`, `requestDate`
- [ ] Criar `ExamRequestService`: `create()`, `listByPatient()`
- [ ] Criar `ExamRequestController`: `POST /api/exam-requests`, `GET /api/exam-requests/patient/{id}`

#### ✅ Tasks — Frontend
- [ ] Conectar formulário da seção "Exames e Encaminhamentos" ao `POST /api/exam-requests`
- [ ] Implementar seleção de tipo de solicitação (Laboratorial, Imagem, Encaminhamento)
- [ ] Integrar busca de exames/especialidades com CID-10

---

## 🔵 Feature 1.7 — Retornos e Relatórios Médicos

### 📗 Backlog Item 1.7.1
**Como** médico,
**Quero** registrar solicitações de retorno e relatórios médicos,
**Para que** haja continuidade e rastreabilidade no acompanhamento do paciente.

#### ✅ Tasks — Backend
- [ ] Criar entidade `ReturnRequest`: `id`, `medicalRecordId`, `scheduledDate`, `reason`
- [ ] Criar entidade `MedicalReport`: `id`, `medicalRecordId`, `content`, `issuedDate`
- [ ] Criar endpoints: `POST /api/returns`, `POST /api/reports`, `GET /api/returns/patient/{id}`

#### ✅ Tasks — Frontend
- [ ] Implementar seção "Retornos e Relatórios" com formulário conectado à API
- [ ] Listar retornos agendados do paciente
- [ ] Permitir criação e visualização de relatório médico

---

## 🔵 Feature 1.8 — Integração e Qualidade do Dashboard Médico

### 📗 Backlog Item 1.8.1
**Como** médico,
**Quero** que o dashboard exiba dados reais e meu perfil logado,
**Para que** eu possa trabalhar com informações atualizadas sem dados fictícios.

#### ✅ Tasks — Frontend
- [ ] Substituir cards do Overview (consultas, pacientes) por dados reais via API
- [ ] Substituir placeholder do gráfico de atendimentos semanais por componente Recharts integrado à API
- [ ] Exibir nome e CRM do médico logado no header (via token JWT / `GET /api/doctors/me`)
- [ ] Configurar serviço centralizado `api.js` com Axios e interceptor de autenticação JWT
- [ ] Implementar `PrivateRoute` para proteger acesso ao dashboard

---

---

# 🟣 ÉPICO 2 — Módulo de Administração

> **Objetivo:** Fornecer ao administrador as ferramentas para configurar e manter o sistema, gerenciando usuários, permissões, clínicas, especialidades e parâmetros globais.

---

## 🔵 Feature 2.1 — Cadastro e Gestão de Usuários

### 📗 Backlog Item 2.1.1
**Como** administrador,
**Quero** criar, editar e desativar contas de usuários (médicos, recepcionistas e admins),
**Para que** o acesso ao sistema seja controlado e auditável.

#### ✅ Tasks — Backend
- [ ] Expandir model `Admin` adicionando campos: `fullName`, `cpf`, `position` (cargo), `phone`, `advancedPermissions`
- [ ] Implementar `AdminService.createUser()` para criação de qualquer perfil (médico, recepcionista, admin)
- [ ] Implementar `AdminService.updateUser()`, `deactivateUser()`, `listAllUsers()`
- [ ] Criar `AdminController` com endpoints: `POST /api/admin/users`, `GET /api/admin/users`, `PUT /api/admin/users/{id}`, `PATCH /api/admin/users/{id}/status`
- [ ] Proteger todos os endpoints com `ROLE_ADMIN`

#### ✅ Tasks — Frontend
- [ ] Criar página `DashboardAdmin.jsx` com sidebar de navegação
- [ ] Criar tela de listagem de usuários com filtro por tipo (médico, recepcionista, admin)
- [ ] Criar modal/formulário de criação de usuário com campos: nome, CPF, cargo, e-mail, telefone, login
- [ ] Criar formulário de edição de usuário
- [ ] Implementar botão de ativar/desativar conta com confirmação
- [ ] Conectar todas as ações aos endpoints do `AdminController`

---

## 🔵 Feature 2.2 — Controle de Acessos e Permissões por Perfil

### 📗 Backlog Item 2.2.1
**Como** administrador,
**Quero** gerenciar as permissões de cada perfil de usuário,
**Para que** cada profissional acesse apenas as funcionalidades adequadas ao seu papel.

#### ✅ Tasks — Backend
- [ ] Revisar e mapear os `Role` existentes (ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT, ROLE_RECEPTIONIST)
- [ ] Criar endpoint `GET /api/admin/users/{id}/permissions` para consultar permissões
- [ ] Criar endpoint `PUT /api/admin/users/{id}/permissions` para atualizar permissões
- [ ] Garantir que `SecurityConfig` aplica restrições corretas por role em todos os endpoints

#### ✅ Tasks — Frontend
- [ ] Criar tela de gerenciamento de permissões por usuário
- [ ] Exibir lista de permissões disponíveis com checkboxes
- [ ] Conectar ao `GET` e `PUT /api/admin/users/{id}/permissions`

---

## 🔵 Feature 2.3 — Configurações Gerais do Sistema

### 📗 Backlog Item 2.3.1
**Como** administrador,
**Quero** configurar clínicas, hospitais, especialidades e parâmetros do sistema,
**Para que** o sistema reflita a realidade operacional da instituição.

#### ✅ Tasks — Backend
- [ ] Criar endpoints para gestão de clínicas: `POST /api/admin/clinics`, `GET /api/admin/clinics`, `PUT /api/admin/clinics/{id}`
- [ ] Criar endpoint para gestão de especialidades: `GET /api/admin/specialties`, `POST /api/admin/specialties`
- [ ] Criar endpoint para parâmetros globais do sistema: `GET /api/admin/settings`, `PUT /api/admin/settings`

#### ✅ Tasks — Frontend
- [ ] Criar tela de configuração de clínicas/hospitais com formulário de cadastro e listagem
- [ ] Criar tela de gerenciamento de especialidades disponíveis no sistema
- [ ] Criar tela de parâmetros gerais do sistema

---

## 🔵 Feature 2.4 — Segurança e Infraestrutura

### 📗 Backlog Item 2.4.1
**Como** administrador de sistema,
**Quero** que o sistema tenha controles de segurança e rastreabilidade robustos,
**Para que** dados sensíveis de pacientes e médicos sejam protegidos adequadamente.

#### ✅ Tasks — Backend
- [ ] Implementar Refresh Token e Blacklist de JWT (tabela `token_blacklist` ou Redis)
- [ ] Adicionar Rate Limiting no endpoint `/api/auth/login` (ex: Bucket4j — máx. 5 tentativas/min)
- [ ] Mover credenciais do `application.properties` para variáveis de ambiente (`.env` ou AWS Secrets Manager)
- [ ] Implementar Audit Logging com `@EntityListeners` para tabelas sensíveis (`MedicalRecord`, `Prescription`)
- [ ] Substituir `ddl-auto=update` por Flyway Migrations versionadas
- [ ] Integrar `springdoc-openapi` para gerar Swagger UI com todos os endpoints documentados
- [ ] Criar `Dockerfile` para backend e `docker-compose.yml` orquestrando backend + frontend + banco

---

---

# 🟣 ÉPICO 3 — Sistema Voltado para o Paciente (Front-end / Portal)

> **Objetivo:** Oferecer ao paciente uma interface digital de primeiro contato com o serviço de saúde, incluindo autocadastro, acesso ao perfil, histórico, consultas agendadas e chatbot de triagem preliminar.

---

## 🔵 Feature 3.1 — Autocadastro e Autenticação do Paciente

### 📗 Backlog Item 3.1.1
**Como** paciente,
**Quero** realizar meu autocadastro com dados pessoais, de convênio e de saúde,
**Para que** eu possa acessar o sistema e ter um prontuário pré-gerado.

#### ✅ Tasks — Backend
- [ ] Garantir que `POST /api/pacients` seja público (sem autenticação)
- [ ] Validar campo `paymentMethod` (meio de pagamento preferencial) — adicionar ao model se ausente
- [ ] Validar campo `occupation` está removido do model (já comentado ✅ — confirmar e limpar)
- [ ] Garantir campos de convênio: `healthPlan`, `planNumber`, `planValidity`, `planHolder` (titular/dependente)
- [ ] Garantir campos complementares: `cns`, `bloodType`, `guardianName`, `allergies`, `fatherName`, `motherName`
- [ ] Retornar JWT no `POST /api/auth/login` com redirect correto por role (ROLE_PATIENT → dashboard do paciente)

#### ✅ Tasks — Frontend
- [ ] Expandir `Register.jsx` em formulário multi-etapa (stepper com 3 passos):
  - **Passo 1 – Dados Pessoais:** nome completo, data de nascimento, sexo, foto, CPF, identidade, nacionalidade, endereço, telefone, celular, e-mail
  - **Passo 2 – Convênio:** plano de saúde, número da carteirinha, validade, titularidade (titular/dependente)
  - **Passo 3 – Dados Complementares:** nome dos pais, tipo sanguíneo, CNS, meio de pagamento, nome do responsável, alergias
- [ ] Adicionar validação de CPF em tempo real no frontend
- [ ] Implementar upload de foto de perfil
- [ ] Conectar formulário ao `POST /api/pacients`
- [ ] Exibir feedback de sucesso e redirecionar ao login após cadastro

### 📗 Backlog Item 3.1.2
**Como** paciente já cadastrado,
**Quero** fazer login de forma segura e acessar meu perfil,
**Para que** eu possa gerenciar meus dados e visualizar minhas informações de saúde.

#### ✅ Tasks — Backend
- [ ] Garantir que `POST /api/auth/login` retorna role no payload JWT
- [ ] Criar endpoint `GET /api/pacients/me` (autenticado) que retorna dados do paciente logado

#### ✅ Tasks — Frontend
- [ ] Conectar `Login.jsx` ao `POST /api/auth/login`
- [ ] Armazenar JWT no `localStorage` ou `sessionStorage`
- [ ] Implementar redirecionamento por role após login (médico → DashBoardMedico, paciente → DashBoardPaciente)
- [ ] Criar `PrivateRoute` para proteger rotas autenticadas

---

## 🔵 Feature 3.2 — Perfil do Paciente (Visualização e Edição)

### 📗 Backlog Item 3.2.1
**Como** paciente,
**Quero** visualizar e editar meus dados cadastrais,
**Para que** minhas informações estejam sempre atualizadas no sistema.

#### ✅ Tasks — Backend
- [ ] Criar endpoint `PUT /api/pacients/me` para atualização dos dados do paciente logado
- [ ] Restringir edição de campos sensíveis (CPF, identidade) apenas por admin

#### ✅ Tasks — Frontend
- [ ] Construir layout base do `DashBoardPaciente.jsx` com sidebar e header com nome/foto do paciente
- [ ] Criar seção "Meu Perfil" exibindo todos os dados cadastrais organizados em abas (Pessoais, Convênio, Saúde)
- [ ] Implementar formulário de edição inline dos campos editáveis
- [ ] Conectar ao `GET /api/pacients/me` e `PUT /api/pacients/me`

---

## 🔵 Feature 3.3 — Histórico de Consultas e Exames

### 📗 Backlog Item 3.3.1
**Como** paciente,
**Quero** visualizar o histórico completo das minhas consultas e exames com todos os detalhes,
**Para que** eu tenha controle sobre meu histórico de saúde.

#### ✅ Tasks — Backend
- [ ] Criar endpoint `GET /api/pacients/me/records` retornando lista de consultas com: data, local, médico, horário, relatórios, prescrições e exames vinculados

#### ✅ Tasks — Frontend
- [ ] Criar seção "Histórico" no `DashBoardPaciente.jsx`
- [ ] Listar consultas passadas em cards com data, médico, local e tipo
- [ ] Permitir expansão de cada consulta para ver: relatório, prescrição emitida, exames solicitados
- [ ] Conectar ao `GET /api/pacients/me/records`

---

## 🔵 Feature 3.4 — Visualização de Consultas Agendadas com Mapa

### 📗 Backlog Item 3.4.1
**Como** paciente,
**Quero** visualizar minhas consultas agendadas com integração a mapas,
**Para que** eu saiba onde e quando comparecer.

#### ✅ Tasks — Backend
- [ ] Criar endpoint `GET /api/pacients/me/appointments` retornando consultas futuras com: data, horário, médico, clínica/hospital e endereço completo

#### ✅ Tasks — Frontend
- [ ] Criar seção "Consultas Agendadas" no `DashBoardPaciente.jsx`
- [ ] Listar consultas futuras ordenadas por data com médico, local e horário
- [ ] Integrar mapa (Google Maps API ou Leaflet) para exibir a localização da clínica
- [ ] Conectar ao `GET /api/pacients/me/appointments`

---

## 🔵 Feature 3.5 — Chatbot de Triagem Preliminar

### 📗 Backlog Item 3.5.1
**Como** paciente,
**Quero** descrever meus sintomas em um chatbot e receber uma sugestão de especialidade,
**Para que** eu seja direcionado ao profissional correto e já tenha um prontuário preliminar gerado.

#### ✅ Tasks — Backend
- [ ] Criar entidade `TriageSession`: `id`, `pacientId`, `symptoms` (texto livre / lista), `suggestedSpecialty`, `createdAt`, `preliminaryRecordId`
- [ ] Criar `TriageService`: lógica de sugestão de especialidade com base em palavras-chave dos sintomas
- [ ] Criar endpoint `POST /api/triage` que recebe sintomas, sugere especialidade e cria prontuário preliminar vinculado ao paciente
- [ ] Criar endpoint `GET /api/triage/{pacientId}` para buscar triagens anteriores

#### ✅ Tasks — Frontend
- [ ] Criar seção "Triagem / Chatbot" no `DashBoardPaciente.jsx`
- [ ] Implementar interface de chat com fluxo guiado: coleta de sintomas em etapas
- [ ] Exibir especialidade sugerida ao final do fluxo
- [ ] Mostrar confirmação de criação de prontuário preliminar
- [ ] Conectar ao `POST /api/triage`

---

## 🔵 Feature 3.6 — Infraestrutura Frontend (Paciente)

### 📗 Backlog Item 3.6.1
**Como** desenvolvedor,
**Quero** ter uma camada de serviços e gerenciamento de estado centralizada no frontend,
**Para que** todas as funcionalidades do portal do paciente sejam consistentes e seguras.

#### ✅ Tasks — Frontend
- [ ] Criar `src/services/api.js` com Axios configurado: baseURL, interceptor de autenticação (JWT no header `Authorization: Bearer`)
- [ ] Implementar tratamento centralizado de erros HTTP (401 → logout, 403 → mensagem de acesso negado, 500 → mensagem genérica)
- [ ] Implementar gerenciamento de estado de autenticação com Context API (`AuthContext`) ou Zustand
- [ ] Garantir responsividade completa do `DashBoardPaciente.jsx` em mobile
- [ ] Adicionar estados de loading (spinners) e mensagens de erro/sucesso em todos os formulários do portal

---

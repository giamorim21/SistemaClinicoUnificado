# Backlog do Semestre - Sistema Clínico Unificado (SCU)

Este documento contém propostas de Épicos e Histórias de Usuário voltados para o aprimoramento do backend, focando em segurança, novas tecnologias, confiabilidade corporativa e finalização de módulos.

## ÉPICO 1: Fortalecimento da Segurança e Auditoria 🔒
*Atualmente a aplicação possui JWT estático e Bcrypt. É preciso elevar a segurança a padrões corporativos (HealthTech).*

- **[Security] Implementar Refresh Tokens e Blacklist de JWT**
  - O Token JWT atual possui expiração fixa e o sistema não invalida tokens no caso de um *logout*. É necessário adicionar uma tabela ou Redis para *Blacklist* de tokens invalidados e habilitar o fluxo de *Refresh Token*.
- **[Security] Rate Limiting (Proteção contra Força Bruta)**
  - Implementar limite de requisições no endpoint de `/api/auth/login` (ex: Bucket4j) para evitar ataques de força bruta visando descobrir senhas de médicos ou administradores.
- **[Security] Gestão Centralizada de Segredos e Variáveis de Ambiente**
  - Mover credenciais hardcoded (como a URL atual do Supabase no `application.properties`) para gerenciamento estrito via `.env` blindado e/ou AWS Secrets Manager.
- **[Security] Trilha de Auditoria (Audit Logging)**
  - Criar um sistema de log (ex: `@EntityListeners(AuditingEntityListener.class)` do Spring Data JPA) para registrar quem (qual usuário/IP) alterou certas tabelas sensíveis (como Prontuários e Prescrições) e quando.

## ÉPICO 2: Qualidade de Código e CI/CD 🚀
*Garantir que o código permaneça limpo, escalável e sem defeitos em produção.*

- **[Tech] Controle de Migração de Banco de Dados (Flyway / Liquibase)**
  - Substituir a estratégia `spring.jpa.hibernate.ddl-auto=update` por um versionamento oficial de banco de dados (Migrations). Isso garante segurança na evolução estrutural dos bancos locais, de homologação e produção.
- **[Tech] Containerização com Docker**
  - Criar um `Dockerfile` para o backend Java, outro para o frontend React e orquestrá-los (juntamente com o banco PostgreSQL) em um `docker-compose.yml`, eliminando o problema de "na minha máquina funciona".
- **[Tech] Configuração de CI/CD (GitHub Actions)**
  - Criar testes unitários para os principais Services (AuthService, PacientService) e automatizar o processo de *build* e testes a cada *Pull Request* no repositório.
- **[Tech] Documentação de API com Swagger/OpenAPI**
  - Integrar a biblioteca `springdoc-openapi` para gerar uma interface visual (Swagger UI) contendo a documentação viva e interativa de todos os *endpoints* disponíveis para facilitar a vida do Frontend (João e Leonardo).

## ÉPICO 3: Conclusão dos Módulos Principais (Core Features) ⚙️
*Pelos arquivos examinados, diversos módulos de regras de negócio ainda estão como "stubs" (arquivos em branco ou minúsculos).*

- **[Feature] Implementar Lógica do `DoctorService` e `DoctorController`**
  - Desenvolver o fluxo de "Dashboard Médico Centralizado" mencionado na documentação e o mapeamento da Agenda Diária do médico.
- **[Feature] Implementar `ManagementService` (Gestão Clínica)**
  - Finalizar os fluxos administrativos, incluindo a criação de médicos, recepcionistas, e geração de relatórios administrativos.
- **[Feature] Prontuário Eletrônico do Paciente (PEP) e Prescrições**
  - Estruturar a validação de assinaturas em receitas, criar tabela detalhada contendo modelo CID-10 para registros (Queixa, Anamnese, Exame).

## ÉPICO 4: Otimização de Performance e Monitoramento 📊
- **[Tech] Implementação de Caching (Redis)**
  - Realizar cache das listas mais acessadas que mudam pouco (ex: Lista de Médicos disponíveis, Especialidades e CIDs), tirando carga do PostgreSQL (Supabase).
- **[Tech] Monitoramento de Saúde da Aplicação**
  - Adicionar o **Spring Boot Actuator** integrado ao **Prometheus e Grafana** para medir o consumo de CPU/Memória da aplicação em tempo real.

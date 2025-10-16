import React from "react";
import Section from "../components/Section";

/* HERO está como componente separado */
import Hero from "../components/Hero";

/* QUEM SOMOS é uma page própria */
import QuemSomos from "./QuemSomos";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 2. DESAFIOS & SOLUÇÃO */}
      <Section id="solucao">
        <div className="row align-items-center g-5">
          {/* Esquerda */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">Desafios da Gestão Clínica</h2>
            <p className="text-secondary mb-4">Os gargalos que atrasam o atendimento e elevam custos:</p>

            <ul className="list-unstyled list-check">
              <li><i className="bi bi-check2-circle text-success"></i><span>Burocracia e retrabalho em cadastros e fichas.</span></li>
              <li><i className="bi bi-check2-circle text-success"></i><span>Baixa integração entre recepção, triagem e atendimento.</span></li>
              <li><i className="bi bi-check2-circle text-success"></i><span>Fila e tempo de espera imprevisíveis.</span></li>
              <li><i className="bi bi-check2-circle text-success"></i><span>Dificuldade em enxergar indicadores e relatórios.</span></li>
              <li><i className="bi bi-check2-circle text-success"></i><span>Riscos de compliance e segurança de dados.</span></li>
            </ul>
          </div>

          {/* Direita */}
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                className="img-fluid rounded-4 shadow platform-graphic"
                alt="Mockup do dashboard SCU em tablet"
                src="https://images.unsplash.com/photo-1586773860383-d828d9d42fa2?q=80&w=1400&auto=format&fit=crop"
              />
            </div>
            <div className="mt-3 small text-secondary">
              Dashboard principal com indicadores claros, listas priorizadas e gráficos.
            </div>
          </div>
        </div>
      </Section>

      {/* 3. QUEM SOMOS */}
      <QuemSomos />

      {/* 4. PLATAFORMA COMPLETA */}
      <Section id="plataforma">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Uma Plataforma Completa para sua Clínica</h2>
          <p className="text-secondary">Benefícios específicos para cada perfil — com um fluxo simples e integrado.</p>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills justify-content-center gap-2 mb-4" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="gestores-tab" data-bs-toggle="pill" data-bs-target="#gestores" type="button" role="tab" aria-controls="gestores" aria-selected="true">Gestores</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="medicos-tab" data-bs-toggle="pill" data-bs-target="#medicos" type="button" role="tab" aria-controls="medicos" aria-selected="false">Médicos</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="recepcao-tab" data-bs-toggle="pill" data-bs-target="#recepcao" type="button" role="tab" aria-controls="recepcao" aria-selected="false">Recepção</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pacientes-tab" data-bs-toggle="pill" data-bs-target="#pacientes" type="button" role="tab" aria-controls="pacientes" aria-selected="false">Pacientes</button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          {/* GESTORES */}
          <div className="tab-pane fade show active" id="gestores" role="tabpanel" aria-labelledby="gestores-tab" tabIndex="0">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h5 className="fw-bold">Indicadores em tempo real</h5>
                <p className="text-secondary">Acompanhe capacidade, filas, SLA de triagem e produtividade. Gere relatórios e antecipe decisões.</p>
                <ul className="list-unstyled list-check">
                  <li><i className="bi bi-check2-circle text-success"></i><span>Dashboards personalizáveis.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Alertas e metas operacionais.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Exportações e integrações.</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid platform-graphic" alt="Fluxo da plataforma para gestores"
                     src="https://images.unsplash.com/photo-1581091014534-8986b0628f45?q=80&w=1400&auto=format&fit=crop" />
              </div>
            </div>
          </div>

          {/* MÉDICOS */}
          <div className="tab-pane fade" id="medicos" role="tabpanel" aria-labelledby="medicos-tab" tabIndex="0">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h5 className="fw-bold">Prontuário e atendimento sem atritos</h5>
                <p className="text-secondary">Histórico completo, triagem prévia e prescrições integradas facilitam decisões clínicas.</p>
                <ul className="list-unstyled list-check">
                  <li><i className="bi bi-check2-circle text-success"></i><span>Resumo pré-consulta e alertas.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Pedidos e laudos integrados.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Modelos e atalhos inteligentes.</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid platform-graphic" alt="Fluxo da plataforma para médicos"
                     src="https://images.unsplash.com/photo-1587502536981-2f2b6d9e4f58?q=80&w=1400&auto=format&fit=crop" />
              </div>
            </div>
          </div>

          {/* RECEPÇÃO */}
          <div className="tab-pane fade" id="recepcao" role="tabpanel" aria-labelledby="recepcao-tab" tabIndex="0">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h5 className="fw-bold">Recepção ágil e integrada</h5>
                <p className="text-secondary">Cadastro inteligente, conferência de convênio e fila organizada por prioridade.</p>
                <ul className="list-unstyled list-check">
                  <li><i className="bi bi-check2-circle text-success"></i><span>Busca rápida e pré-cadastro pelo app.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Token/QR para evitar retrabalho.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Comunicação direta com triagem.</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid platform-graphic" alt="Fluxo da plataforma para recepção"
                     src="https://images.unsplash.com/photo-1586861203924-4f8f7f8a5c05?q=80&w=1400&auto=format&fit=crop" />
              </div>
            </div>
          </div>

          {/* PACIENTES */}
          <div className="tab-pane fade" id="pacientes" role="tabpanel" aria-labelledby="pacientes-tab" tabIndex="0">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h5 className="fw-bold">Experiência do paciente no centro</h5>
                <p className="text-secondary">App intuitivo para cadastro, histórico, exames e acompanhamento do atendimento.</p>
                <ul className="list-unstyled list-check">
                  <li><i className="bi bi-check2-circle text-success"></i><span>Triagem orientada por chatbot.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Transparência de status e orientações.</span></li>
                  <li><i className="bi bi-check2-circle text-success"></i><span>Confirmações e lembretes automáticos.</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <img className="img-fluid platform-graphic" alt="Fluxo da plataforma para pacientes"
                     src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop" />
              </div>
            </div>
          </div>
        </div>

        {/* Infográfico */}
        <div className="mt-5">
          <div className="bg-white p-4 platform-graphic">
            <div className="row text-center g-4 align-items-center">
              <div className="col-md-3">
                <i className="bi bi-calendar-check fs-1 text-primary d-block mb-2"></i>
                <div className="small">Agende &amp; Triagem</div>
              </div>
              <div className="col-md-1 d-none d-md-block"><i className="bi bi-arrow-right fs-3"></i></div>
              <div className="col-md-3">
                <i className="bi bi-clipboard2-pulse fs-1 text-primary d-block mb-2"></i>
                <div className="small">Atendimento Clínico</div>
              </div>
              <div className="col-md-1 d-none d-md-block"><i className="bi bi-arrow-right fs-3"></i></div>
              <div className="col-md-3">
                <i className="bi bi-bar-chart-line fs-1 text-primary d-block mb-2"></i>
                <div className="small">Gestão &amp; Análise</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. SEGURANÇA */}
      <Section id="seguranca" soft>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Segurança e Conformidade</h2>
          <p className="text-secondary">Robustez e confiança de ponta a ponta.</p>
        </div>

        <div className="row g-4">
          {[
            { icon: "bi-shield-lock", title: "Conformidade LGPD", txt: "Coleta, armazenamento e processamento conforme boas práticas e princípios da LGPD." },
            { icon: "bi-cloud-check", title: "Segurança em Nuvem", txt: "Criptografia em trânsito e em repouso, controle de acesso e auditorias periódicas." },
            { icon: "bi-fingerprint", title: "Autenticação Forte", txt: "MFA, políticas de senha e trilhas de auditoria para máxima rastreabilidade." },
          ].map((c, i) => (
            <div className="col-lg-4" key={i}>
              <div className="card card-lift green p-4 h-100">
                <div className="text-center mb-3"><i className={`bi ${c.icon} fs-1 text-success`} /></div>
                <h5 className="text-center mb-2">{c.title}</h5>
                <p className="text-secondary text-center mb-0">{c.txt}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. CTA */}
      <Section id="cta" className="cta">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6 text-black">
            <h2 className="fw-bold mb-3 text-white">Transforme a Gestão da sua Clínica Hoje Mesmo.</h2>
            <p className="mb-0 text-white fw-semibold">
              Preencha o formulário e nossa equipe entrará em contato para agendar uma demonstração personalizada.
            </p>
          </div>

          <div className="col-lg-6">
            <form className="bg-white rounded-4 p-4 shadow">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome</label>
                  <input type="text" className="form-control" placeholder="Seu nome" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">E-mail</label>
                  <input type="email" className="form-control" placeholder="seu@email.com" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Telefone</label>
                  <input type="tel" className="form-control" placeholder="(00) 00000-0000" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cargo</label>
                  <select className="form-select" defaultValue="Selecione…">
                    <option>Selecione…</option>
                    <option>Gestor</option>
                    <option>Médico</option>
                    <option>Recepção</option>
                    <option>TI/Compliance</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Mensagem (opcional)</label>
                  <textarea className="form-control" rows="3" placeholder="Conte brevemente sobre sua clínica e necessidades" />
                </div>
                <div className="col-12 d-grid d-sm-flex gap-3">
                  <button type="submit" className="btn btn-submit">Solicitar Demonstração</button>
                  <div className="d-flex align-items-center text-muted small">Resposta em até 1 dia útil</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
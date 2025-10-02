import React from "react";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="overlay"></div>
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7 text-white">
            <span className="badge rounded-pill brand-soft mb-3 bg-white text-primary">
              <i className="bi bi-cloud-check me-2"></i>Plataforma 100% online
            </span>
            <h1 className="display-5 fw-bold mb-2">Sistema Clínico Unificado</h1>
            <p className="lead mb-3">
              Uma plataforma digital que conecta paciente, recepção, triagem e médico em um fluxo único — simples, rápido e seguro — com dados centralizados e conformidade com a LGPD.
            </p>
            <div className="d-flex flex-wrap gap-4 small">
              <span><i className="bi bi-shield-lock me-1 text-accent"></i> LGPD &amp; auditoria</span>
              <span><i className="bi bi-diagram-3 me-1 text-accent"></i> APIs &amp; webhooks</span>
              <span><i className="bi bi-graph-up-arrow me-1 text-accent"></i> Indicadores em tempo real</span>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-soft h-100">
              <div className="card-body p-4">
                <h6 className="text-uppercase text-secondary mb-2">Para quem foi feito</h6>
                <ul className="list-unstyled small text-secondary list-check mb-0">
                  <li><i className="bi bi-check2-circle me-2"></i>Pacientes — jornada digital com histórico acessível</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Recepção — cadastro, agendamento e check-in sem papel</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Triagem — sinais vitais e observações integradas</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Médicos — prontuário unificado e prescrições digitais</li>
                  <li><i className="bi bi-check2-circle me-2"></i>Gestores — dashboards, relatórios e governança</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

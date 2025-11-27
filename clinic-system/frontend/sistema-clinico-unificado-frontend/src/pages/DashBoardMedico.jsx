import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/home.css";

export default function DashBoardMedico() {
  const [activeSection, setActiveSection] = useState("overview");
  const [agendaView, setAgendaView] = useState("day");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleAgendaViewChange = (view) => {
    setAgendaView(view);
  };

  const renderAgendaContent = () => {
    if (agendaView === "day") {
      return (
        <>
          <p className="text-gray-500 italic mb-4">
            Conteúdo da Agenda: Visão{" "}
            <span className="uppercase font-semibold text-primary">DIA</span>
          </p>

          <div className="day-view">
            <h4 className="text-xl font-medium mb-3">
              Agenda de Hoje (26/11/2025)
            </h4>
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 border-l-4 border-primary rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    09:00 - Ana Clara Pires
                  </p>
                  <p className="text-sm text-gray-600">
                    Retorno - Dor de Cabeça Recorrente
                  </p>
                </div>
                <span className="text-xs text-primary font-medium">
                  Confirmada
                </span>
              </li>
              <li className="p-3 bg-green-50 border-l-4 border-secondary rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    10:00 - Pedro Henrique Lima
                  </p>
                  <p className="text-sm text-gray-600">
                    Primeira Consulta - Check-up Anual
                  </p>
                </div>
                <span className="text-xs text-secondary font-medium">
                  Em Andamento
                </span>
              </li>
            </ul>
          </div>
        </>
      );
    }

    return (
      <>
        <p className="text-gray-500 italic mb-4">
          Visualização da Agenda:{" "}
          <span className="uppercase font-semibold text-primary">
            {agendaView === "week" ? "SEMANA" : "MÊS"}
          </span>
        </p>
        <h4 className="text-xl font-medium mb-3">Agenda de [Data/Período]</h4>
        <div className="h-40 flex items-center justify-center bg-blue-50 border border-dashed rounded-lg text-gray-500">
          Conteúdo do Calendário ou Lista de Compromissos para a visão de{" "}
          {agendaView === "week" ? "Semana" : "Mês"}
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-root">
      <style>{`
        :root {
          --color-primary: #007BFF;
          --color-secondary: #00A86B;
          --color-background: #F4F7FB;
          --color-card-bg: #FFFFFF;
        }

        .dashboard-root {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: var(--color-background);
          min-height: 100vh;
        }

        .dashboard-layout {
          display: flex;
        }

        /* BARRA LATERAL FIXA À ESQUERDA */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 260px;
          background-color: #f9fafb; /* fundo claro */
          border-right: 1px solid #e5e7eb;
          box-shadow: 0 0 20px rgba(15, 23, 42, 0.08);
          padding: 16px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease-in-out;
          z-index: 50;
        }

        .sidebar-header-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .sidebar-closed {
          transform: translateX(-100%);
        }

        .sidebar-open {
          transform: translateX(0);
        }

        /* Em telas grandes, a sidebar fica sempre visível */
        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0) !important;
          }
        }

        /* CONTEÚDO PRINCIPAL DESLOCADO PARA DAR ESPAÇO À SIDEBAR */
        .main-content {
          flex: 1;
          padding: 24px;
          margin-left: 260px; /* largura da sidebar */
          min-height: 100vh;
        }

        @media (max-width: 767px) {
          .main-content {
            margin-left: 0;
            padding: 16px;
          }
        }

        /* Ícone / itens da sidebar */
        .sidebar-icon {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        /* Cards */
        .stat-card {
          transition: all 0.3s;
          cursor: pointer;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        /* MENU LATERAL – BOTÕES EM DESTAQUE */
        .menu-item {
          border-radius: 999px;
          padding: 10px 12px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4b5563;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          transition: background-color 0.2s, color 0.2s, transform 0.1s;
        }

        .menu-item:hover {
          background-color: #e5f0ff;
          color: var(--color-primary);
          transform: translateX(2px);
        }

        .menu-item.active {
          background-color: #e0edff;
          color: var(--color-primary);
          font-weight: 600;
          box-shadow: inset 2px 0 0 0 var(--color-primary);
        }

        .tab-button.active {
          background-color: var(--color-primary);
          color: white;
          box-shadow:
            0 4px 6px -1px rgba(0, 123, 255, 0.2),
            0 2px 4px -2px rgba(0, 123, 255, 0.2);
        }

        .bg-background {
          background-color: var(--color-background);
        }
        .bg-card-bg {
          background-color: var(--color-card-bg);
        }
        .text-primary {
          color: var(--color-primary);
        }
        .text-secondary {
          color: var(--color-secondary);
        }
        .border-primary {
          border-color: var(--color-primary);
        }
        .border-secondary {
          border-color: var(--color-secondary);
        }
      `}</style>

      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <aside
          className={
            "sidebar " + (isSidebarOpen ? "sidebar-open" : "sidebar-closed")
          }
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="sidebar-header-title">MedCare</h1>
            <button
              className="btn btn-link p-0 d-md-none text-muted"
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <nav>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "overview" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("overview")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-6h2v6zm4 0h-2v-6h2v6zm4-8H5V7h14v2z" />
                  </svg>
                  <span>Dashboard</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "agenda" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("agenda")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                  <span>Agenda</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "prontuario" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("prontuario")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M13 18H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2zm-2-9V6H6v3h5zm0 2H6v3h5v-3zm0 5H6v2h5v-2zM17 14h-2v2h2v-2zm-2-2h2v-2h-2v2zm2-4h-2V6h2v2z" />
                  </svg>
                  <span>Prontuário e Histórico</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "prescricao" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("prescricao")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M19 12h-2V7h-4V5h4V3h2v2h2v2h-2v5zm-7 7h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H5V5h7c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2zm2-2h2v-2h-2v2zm-2-4h2V9h-2v2z" />
                  </svg>
                  <span>Prescrição e Receitas</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "atestados" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("atestados")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm4.5 9.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 18H6v-1h6v1zm-2-3H6v-1h4v1z" />
                  </svg>
                  <span>Emissão de Atestados</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "exames" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("exames")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M16 9h-2V7h-2V5h2V3h2v2h2v2h-2v2zm-4 7H8v-2h4v2zm0-4H8v-2h4v2zM18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z" />
                  </svg>
                  <span>Exames e Encaminhamentos</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={
                    "menu-item " +
                    (activeSection === "retornos" ? "active" : "")
                  }
                  onClick={() => handleMenuClick("retornos")}
                >
                  <svg className="sidebar-icon" viewBox="0 0 24 24">
                    <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c.94 0 1.83-.16 2.66-.45l.23-.08.18-.08c.5-.2.96-.45 1.38-.75l.18-.13c.42-.3.8-.65 1.14-1.03l.16-.18.15-.17c.33-.36.63-.76.9-1.19L20 12c0-4.41-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM11 7h2v5h-2z" />
                  </svg>
                  <span>Retornos e Relatórios</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="main-content">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light d-md-none me-3"
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="bi bi-list" />
              </button>
              <h2 className="h3 mb-0 text-dark">Dashboard Médica</h2>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted d-none d-sm-inline">
                Dr(a). [Seu Nome Aqui] | CRM/UF
              </span>
              <img
                src="https://placehold.co/40x40/007BFF/FFFFFF?text=DR"
                alt="Avatar do Médico"
                className="rounded-circle border border-primary"
                width={40}
                height={40}
              />
            </div>
          </header>

          <div id="content-container">
            {/* Overview */}
            {activeSection === "overview" && (
              <section data-section-content="overview">
                <div className="row g-4 mb-4">
                  <div className="col-12 col-md-3">
                    <div className="stat-card bg-card-bg p-3 rounded-4 shadow-sm border-start border-4 border-primary">
                      <p className="text-muted small mb-1">
                        Consultas Agendadas Hoje
                      </p>
                      <p className="h2 fw-bold mb-0">12</p>
                      <p className="small text-secondary mt-1">
                        +3 novas desde ontem
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-3">
                    <div className="stat-card bg-card-bg p-3 rounded-4 shadow-sm border-start border-4 border-success">
                      <p className="text-muted small mb-1">Próximo Paciente</p>
                      <p className="fw-bold mb-0 text-truncate">
                        João da Silva Souza
                      </p>
                      <p className="small text-muted mt-1">
                        14:30h (Sala 02)
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-3">
                    <div className="stat-card bg-card-bg p-3 rounded-4 shadow-sm border-start border-4 border-warning">
                      <p className="text-muted small mb-1">Ações Pendentes</p>
                      <p className="h2 fw-bold mb-0">3</p>
                      <p className="small text-warning mt-1">
                        Aguardando Retorno e Prescrição
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-3">
                    <div className="stat-card bg-card-bg p-3 rounded-4 shadow-sm border-start border-4 border-info">
                      <p className="text-muted small mb-1">
                        Total de Pacientes Ativos
                      </p>
                      <p className="h2 fw-bold mb-0">456</p>
                      <p className="small text-info mt-1">
                        Ver estatísticas completas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h3 className="h5 mb-3">
                    Atendimentos Semanais (Últimas 4 Semanas)
                  </h3>
                  <div className="border border-dashed rounded-4 d-flex align-items-center justify-content-center text-muted py-5">
                    [Placeholder para Gráfico de Barras/Linhas]
                  </div>
                </div>
              </section>
            )}

            {/* Agenda */}
            {activeSection === "agenda" && (
              <section data-section-content="agenda">
                <h3 className="h4 mb-4">Visualização da Agenda</h3>

                <div className="d-flex bg-light rounded-pill p-1 mb-4" style={{maxWidth: 420}}>
                  <button
                    type="button"
                    className={
                      "flex-fill tab-button btn btn-sm rounded-pill border-0 " +
                      (agendaView === "day"
                        ? "active"
                        : "text-secondary bg-transparent")
                    }
                    onClick={() => handleAgendaViewChange("day")}
                  >
                    Dia
                  </button>
                  <button
                    type="button"
                    className={
                      "flex-fill tab-button btn btn-sm rounded-pill border-0 " +
                      (agendaView === "week"
                        ? "active"
                        : "text-secondary bg-transparent")
                    }
                    onClick={() => handleAgendaViewChange("week")}
                  >
                    Semana
                  </button>
                  <button
                    type="button"
                    className={
                      "flex-fill tab-button btn btn-sm rounded-pill border-0 " +
                      (agendaView === "month"
                        ? "active"
                        : "text-secondary bg-transparent")
                    }
                    onClick={() => handleAgendaViewChange("month")}
                  >
                    Mês
                  </button>
                </div>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  {renderAgendaContent()}
                </div>
              </section>
            )}

            {/* Prontuário */}
            {activeSection === "prontuario" && (
              <section data-section-content="prontuario">
                <h3 className="h4 mb-4">Prontuário Eletrônico (PE)</h3>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h4 className="h5 text-primary border-bottom pb-2 mb-4">
                    Paciente Selecionado: Maria Eduarda Ferreira
                  </h4>

                  <div className="mb-4">
                    <h5 className="h6 mb-2">Histórico Clínico Completo</h5>
                    <ul className="small bg-light p-3 rounded-3 border">
                      <li className="mb-1">
                        <strong>Alergias:</strong> Penicilina.
                      </li>
                      <li className="mb-1">
                        <strong>Medicamentos em Uso:</strong> Omeprazol 20mg
                        (1x ao dia).
                      </li>
                      <li className="mb-1">
                        <strong>Antecedentes Familiares:</strong> Hipertensão
                        (Mãe).
                      </li>
                      <li>
                        <strong>Última Consulta:</strong> 05/10/2025.
                      </li>
                    </ul>
                    <button className="btn btn-link btn-sm mt-1 p-0 text-primary">
                      Ver todas as consultas anteriores
                    </button>
                  </div>

                  <hr className="my-4" />

                  <h5 className="h6 mb-3">Registro da Consulta Atual</h5>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Queixa Principal (QP)
                      </label>
                      <textarea className="form-control" rows="3" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Antecedentes Pessoais (AP)
                      </label>
                      <textarea className="form-control" rows="3" />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Exame Físico (EF)
                      </label>
                      <textarea className="form-control" rows="3" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Diagnóstico (Com campo de busca CID-10)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar CID-10..."
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small">
                      Conduta Terapêutica
                    </label>
                    <textarea className="form-control" rows="3" />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                      Salvar Registro da Consulta
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Prescrição */}
            {activeSection === "prescricao" && (
              <section data-section-content="prescricao">
                <h3 className="h4 mb-4">Prescrição e Receitas Digitais</h3>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h4 className="h5 text-primary border-bottom pb-2 mb-4">
                    Nova Prescrição para [Nome do Paciente]
                  </h4>

                  <div className="mb-4">
                    <div className="border rounded-3 p-3 d-flex justify-content-between align-items-start bg-light">
                      <div>
                        <p className="fw-semibold text-secondary mb-1">
                          Amoxicilina + Clavulanato 875/125mg
                        </p>
                        <p className="small mb-0">
                          Posologia: 1 comprimido a cada 12 horas.
                        </p>
                        <p className="small text-muted mb-0">Duração: 7 dias.</p>
                      </div>
                      <button className="btn btn-link text-danger p-0 small">
                        Remover
                      </button>
                    </div>
                  </div>

                  <h5 className="h6 mb-3">Adicionar Medicamento</h5>
                  <div className="row g-3 align-items-end mb-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Medicamento (Busca na Base)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome, dosagem..."
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label small">Posologia</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 1 comp a cada 8h"
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <button className="btn btn-success w-100">
                        Adicionar
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked
                        id="enviarReceita"
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="enviarReceita"
                      >
                        Enviar Receita Digital (SMS/E-mail)
                      </label>
                    </div>
                    <button className="btn btn-primary">
                      Finalizar e Emitir Receita
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Atestados */}
            {activeSection === "atestados" && (
              <section data-section-content="atestados">
                <h3 className="h4 mb-4">Emissão de Atestados</h3>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h4 className="h5 text-primary border-bottom pb-2 mb-4">
                    Novo Atestado para [Nome do Paciente]
                  </h4>

                  <div className="mb-3">
                    <label className="form-label small">Tipo de Atestado</label>
                    <select className="form-select">
                      <option>Atestado de Presença</option>
                      <option>
                        Atestado de Justificativa de Falta (Doença)
                      </option>
                      <option>Atestado de Acompanhamento (Familiar)</option>
                    </select>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Número de Dias de Afastamento
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1}
                        min={0}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        CID-10 (Opcional - Buscável)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: J10.0"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small">
                      Observações Adicionais
                    </label>
                    <textarea className="form-control" rows={2} />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                      Emitir Atestado (PDF/Digital)
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Exames */}
            {activeSection === "exames" && (
              <section data-section-content="exames">
                <h3 className="h4 mb-4">
                  Solicitação de Exames e Encaminhamentos
                </h3>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h4 className="h5 text-primary border-bottom pb-2 mb-4">
                    Solicitações para [Nome do Paciente]
                  </h4>

                  <div className="mb-4">
                    <div className="border rounded-3 p-3 d-flex justify-content-between align-items-start bg-light">
                      <div>
                        <p className="fw-semibold mb-1">
                          Exame: Hemograma Completo
                        </p>
                        <p className="small text-muted mb-0">
                          Encaminhamento: Laboratório de Análises Clínicas ABC
                        </p>
                      </div>
                      <button className="btn btn-link text-danger small p-0">
                        Excluir
                      </button>
                    </div>
                  </div>

                  <h5 className="h6 mb-3">Nova Solicitação</h5>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Tipo de Solicitação
                      </label>
                      <select className="form-select">
                        <option>Exame Laboratorial</option>
                        <option>Exame de Imagem</option>
                        <option>Encaminhamento para Especialista</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small">
                        Descrição/Especialidade (Com busca CID-10)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar Exame ou Especialidade (Ex: Glicemia, Cardiologista)..."
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small">
                        Justificativa Clínica
                      </label>
                      <textarea className="form-control" rows={2} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                      Adicionar Solicitação
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Retornos */}
            {activeSection === "retornos" && (
              <section data-section-content="retornos">
                <h3 className="h4 mb-4">
                  Solicitação de Retornos e Relatórios Médicos
                </h3>

                <div className="bg-card-bg p-4 rounded-4 shadow-sm">
                  <h4 className="h5 text-primary border-bottom pb-2 mb-4">
                    Ações Pós-Consulta para [Nome do Paciente]
                  </h4>

                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="border rounded-3 p-3 bg-light h-100">
                        <h5 className="h6 text-secondary mb-3">
                          Solicitar Retorno
                        </h5>
                        <div className="mb-3">
                          <label className="form-label small">
                            Data Sugerida para Retorno
                          </label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small">Motivo</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            placeholder="Ex: Avaliação de resultados de exames"
                          />
                        </div>
                        <button className="btn btn-success w-100">
                          Agendar/Sugerir Retorno
                        </button>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="border rounded-3 p-3 bg-light h-100">
                        <h5 className="h6 text-secondary mb-3">
                          Registro de Relatório Médico
                        </h5>
                        <div className="mb-3">
                          <label className="form-label small">
                            Destinatário/Finalidade
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: INSS, Cirurgião, Escola"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small">
                            Conteúdo do Relatório
                          </label>
                          <textarea className="form-control" rows={4} />
                        </div>
                        <button className="btn btn-primary w-100">
                          Gerar Relatório (PDF)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

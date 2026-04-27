import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/admin-dashboard.css";

export default function DashBoardAdmin() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staffTab, setStaffTab] = useState("doctors");

  const handleMenu = (section) => {
    setActiveSection(section);
    if (window.innerWidth < 992) setSidebarOpen(false);
  };

  const menuItems = [
    { id: "overview", icon: "bi-grid-1x2-fill", label: "Visão Geral" },
    { id: "staff", icon: "bi-people-fill", label: "Equipe" },
    { id: "clinic", icon: "bi-hospital-fill", label: "Clínica" },
    { id: "reports", icon: "bi-bar-chart-line-fill", label: "Relatórios" },
    { id: "logs", icon: "bi-journal-text", label: "Logs de Atividade" },
    { id: "settings", icon: "bi-gear-fill", label: "Configurações" },
  ];

  const mockDoctors = [
    { name: "Dr. Carlos Silva", crm: "CRM/SP 12345", specialty: "Cardiologia", email: "carlos@clinica.com", status: "Ativo" },
    { name: "Dra. Ana Souza", crm: "CRM/SP 67890", specialty: "Dermatologia", email: "ana@clinica.com", status: "Ativo" },
    { name: "Dr. Pedro Lima", crm: "CRM/SP 11223", specialty: "Ortopedia", email: "pedro@clinica.com", status: "Inativo" },
  ];

  const mockReceptionists = [
    { name: "Maria Oliveira", cpf: "***.***.***-01", shift: "Manhã", registration: "REC-001", email: "maria@clinica.com", status: "Ativo" },
    { name: "José Santos", cpf: "***.***.***-02", shift: "Tarde", registration: "REC-002", email: "jose@clinica.com", status: "Ativo" },
  ];

  const mockNurses = [
    { name: "Carla Mendes", coren: "COREN/SP 45678", area: "Triagem", shift: "Manhã", email: "carla@clinica.com", status: "Ativo" },
    { name: "Bruno Ferreira", coren: "COREN/RJ 99012", area: "UTI", shift: "Noite", email: "bruno@clinica.com", status: "Ativo" },
    { name: "Juliana Costa", coren: "COREN/MG 33456", area: "Emergência", shift: "Tarde", email: "juliana@clinica.com", status: "Inativo" },
  ];

  const mockAdmins = [
    { name: "Ricardo Gomes", cpf: "***.***.***-10", role: "Diretor Administrativo", email: "ricardo@clinica.com", phone: "(11) 91234-0001", status: "Ativo" },
    { name: "Fernanda Alves", cpf: "***.***.***-11", role: "Coord. Financeiro", email: "fernanda@clinica.com", phone: "(11) 91234-0002", status: "Ativo" },
  ];

  const mockManagement = [
    { name: "Marcos Ribeiro", cpf: "***.***.***-20", role: "Gestor Operacional", sector: "Operações", level: "Avançado", email: "marcos@clinica.com", status: "Ativo" },
    { name: "Patrícia Dias", cpf: "***.***.***-21", role: "Gestora de RH", sector: "Recursos Humanos", level: "Total", email: "patricia@clinica.com", status: "Ativo" },
    { name: "Lucas Martins", cpf: "***.***.***-22", role: "Gestor Clínico", sector: "Clínico", level: "Intermediário", email: "lucas@clinica.com", status: "Inativo" },
  ];

  const mockLogs = [
    { action: "Cadastro de médico", user: "Admin", detail: "Dr. Carlos Silva adicionado", time: "Hoje, 14:32", color: "blue" },
    { action: "Atualização de clínica", user: "Admin", detail: "Endereço atualizado", time: "Hoje, 11:15", color: "green" },
    { action: "Recepcionista desativada", user: "Admin", detail: "Joana Ferreira desativada", time: "Ontem, 16:45", color: "red" },
    { action: "Relatório exportado", user: "Admin", detail: "Relatório mensal de consultas", time: "Ontem, 09:20", color: "yellow" },
    { action: "Nova recepcionista", user: "Admin", detail: "Maria Oliveira cadastrada", time: "23/04, 10:00", color: "blue" },
  ];

  // Helper: tabela de staff reutilizável com botões de editar e status
  const renderStaffTable = (title, columns, rows) => (
    <div className="adm-card">
      <div className="adm-card-title"><i className="bi bi-list-ul" /> {title}</div>
      <div className="table-responsive">
        <table className="adm-table">
          <thead><tr>{columns.map((c, i) => <th key={i}>{c.label}</th>)}<th>Status</th><th style={{width:110}}>Ações</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map((c, j) => <td key={j} className={j === 0 ? "fw-semibold" : ""}>{r[c.key]}</td>)}
                <td><span className={`adm-badge ${r.status === "Ativo" ? "active" : "inactive"}`}>{r.status}</span></td>
                <td>
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-outline-primary" style={{borderRadius:8,fontSize:"0.78rem"}} title="Editar"><i className="bi bi-pencil-square" /></button>
                    <button className={`btn btn-sm ${r.status === "Ativo" ? "btn-outline-danger" : "btn-outline-success"}`} style={{borderRadius:8,fontSize:"0.78rem"}} title={r.status === "Ativo" ? "Desativar" : "Ativar"}><i className={`bi ${r.status === "Ativo" ? "bi-toggle-on" : "bi-toggle-off"}`} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ─── SIDEBAR ───
  const renderSidebar = () => (
    <>
      {sidebarOpen && <div className="adm-sidebar-overlay show" onClick={() => setSidebarOpen(false)} />}
      <aside className={`adm-sidebar ${sidebarOpen ? "adm-sidebar-open" : "adm-sidebar-closed"}`}>
        <div className="adm-sidebar-brand">
          <div className="adm-sidebar-brand-icon"><i className="bi bi-shield-lock-fill" /></div>
          <div>
            <div className="adm-sidebar-brand-text">SCU</div>
            <div className="adm-sidebar-brand-sub">Painel Admin</div>
          </div>
          <button className="btn btn-link ms-auto d-lg-none text-white p-0" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="adm-sidebar-label">Menu Principal</div>
        <ul className="adm-sidebar-menu">
          {menuItems.map((m) => (
            <li key={m.id}>
              <button className={`adm-menu-btn ${activeSection === m.id ? "active" : ""}`} onClick={() => handleMenu(m.id)}>
                <i className={`bi ${m.icon}`} />
                <span>{m.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="adm-sidebar-footer">
          <button className="adm-menu-btn" style={{ color: "rgba(255,255,255,0.5)" }}>
            <i className="bi bi-box-arrow-left" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );

  // ─── OVERVIEW ───
  const renderOverview = () => {
    const kpis = [
      { label: "Médicos Cadastrados", value: "8", sub: <><span className="up">+2</span> este mês</>, icon: "bi-heart-pulse-fill", iconClass: "blue", cardClass: "" },
      { label: "Recepcionistas", value: "4", sub: "Todos ativos", icon: "bi-person-badge-fill", iconClass: "green", cardClass: "accent" },
      { label: "Pacientes Ativos", value: "1.247", sub: <><span className="up">+89</span> novos este mês</>, icon: "bi-people-fill", iconClass: "yellow", cardClass: "warning" },
      { label: "Consultas Hoje", value: "34", sub: <><span className="down">-5</span> vs. ontem</>, icon: "bi-calendar-check-fill", iconClass: "cyan", cardClass: "info" },
    ];

    return (
      <section className="adm-fade-in">
        <div className="row g-4 mb-4">
          {kpis.map((k, i) => (
            <div className="col-12 col-sm-6 col-xl-3" key={i}>
              <div className={`adm-kpi-card ${k.cardClass}`}>
                <div className={`adm-kpi-icon ${k.iconClass}`}><i className={`bi ${k.icon}`} /></div>
                <div className="adm-kpi-label">{k.label}</div>
                <div className="adm-kpi-value">{k.value}</div>
                <div className="adm-kpi-sub">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="adm-card">
              <div className="adm-card-title"><i className="bi bi-graph-up" /> Atendimentos — Últimas 4 Semanas</div>
              <div className="adm-chart-placeholder">
                <i className="bi bi-bar-chart-line" />
                Gráfico de atendimentos semanais<br />
                <small>(Integração com biblioteca de gráficos em breve)</small>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="adm-card">
              <div className="adm-card-title"><i className="bi bi-clock-history" /> Atividade Recente</div>
              {mockLogs.slice(0, 4).map((l, i) => (
                <div className="adm-activity-item" key={i}>
                  <div className={`adm-activity-dot ${l.color}`} />
                  <div>
                    <div className="adm-activity-text"><strong>{l.action}</strong> — {l.detail}</div>
                    <div className="adm-activity-time">{l.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ─── STAFF ───
  const staffTabs = [
    { id: "doctors", label: "Médicos" },
    { id: "receptionists", label: "Recepcionistas" },
    { id: "nurses", label: "Enfermeiros" },
    { id: "admins", label: "Administradores" },
    { id: "management", label: "Gestão" },
  ];

  const renderStaff = () => (
    <section className="adm-fade-in">
      <div className="adm-tab-nav" style={{ maxWidth: 620, flexWrap: "wrap" }}>
        {staffTabs.map((t) => (
          <button key={t.id} className={`adm-tab-btn ${staffTab === t.id ? "active" : ""}`} onClick={() => setStaffTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {staffTab === "doctors" && (
        <>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Médico / Profissional de Saúde</div>
            <div className="adm-form-section">
              <div className="adm-form-section-title"><i className="bi bi-person" /> Dados de Acesso</div>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label">Usuário (E-mail)</label><input type="email" className="form-control" placeholder="medico@clinica.com" /></div>
                <div className="col-md-6"><label className="form-label">Senha</label><input type="password" className="form-control" placeholder="••••••••" /></div>
              </div>
            </div>
            <div className="adm-form-section">
              <div className="adm-form-section-title"><i className="bi bi-card-checklist" /> Conselho Profissional</div>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Tipo de Conselho</label>
                  <select className="form-select"><option>CRM</option><option>CRO</option><option>CRP</option><option>CREFITO</option><option>CRN</option><option>Outro</option></select>
                </div>
                <div className="col-md-3"><label className="form-label">Número</label><input type="text" className="form-control" placeholder="00000" /></div>
                <div className="col-md-3">
                  <label className="form-label">Estado (UF)</label>
                  <select className="form-select"><option>SP</option><option>RJ</option><option>MG</option><option>RS</option><option>PR</option><option>BA</option><option>Outro</option></select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Situação</label>
                  <select className="form-select"><option>Ativo</option><option>Inativo</option><option>Suspenso</option></select>
                </div>
              </div>
            </div>
            <div className="adm-form-section">
              <div className="adm-form-section-title"><i className="bi bi-award" /> Especialização</div>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Tipo de Profissional</label>
                  <select className="form-select"><option>Médico</option><option>Dentista</option><option>Psicólogo</option><option>Fisioterapeuta</option><option>Nutricionista</option></select>
                </div>
                <div className="col-md-3"><label className="form-label">Especialidade</label><input type="text" className="form-control" placeholder="Ex: Cardiologia" /></div>
                <div className="col-md-3"><label className="form-label">RQE</label><input type="text" className="form-control" placeholder="Nº do RQE" /></div>
                <div className="col-md-3"><label className="form-label">Área de Atuação</label><input type="text" className="form-control" placeholder="Ex: Hemodinâmica" /></div>
              </div>
            </div>
            <div className="adm-form-section">
              <div className="adm-form-section-title"><i className="bi bi-mortarboard" /> Formação e Vínculos</div>
              <div className="row g-3">
                <div className="col-md-4"><label className="form-label">Formação Acadêmica</label><input type="text" className="form-control" placeholder="Ex: USP — Medicina" /></div>
                <div className="col-md-4"><label className="form-label">Idiomas</label><input type="text" className="form-control" placeholder="Ex: Português, Inglês" /></div>
                <div className="col-md-4"><label className="form-label">Vínculos Institucionais</label><input type="text" className="form-control" placeholder="Hospital/Clínica" /></div>
              </div>
            </div>
            <div className="adm-form-section">
              <div className="adm-form-section-title"><i className="bi bi-sliders" /> Configurações</div>
              <div className="row g-3">
                <div className="col-md-3"><label className="form-label">Validade da Escala</label><input type="date" className="form-control" /></div>
                <div className="col-md-3"><label className="form-label">Programas Associados</label><input type="text" className="form-control" placeholder="SUS, Convênio..." /></div>
                <div className="col-md-3"><label className="form-label">Regras de Retorno</label><input type="text" className="form-control" placeholder="Ex: 30 dias" /></div>
                <div className="col-md-3 d-flex flex-column gap-2 pt-4">
                  <div className="form-check"><input className="form-check-input" type="checkbox" id="multiConsult" /><label className="form-check-label small" htmlFor="multiConsult">Múltiplas consultas</label></div>
                  <div className="form-check"><input className="form-check-input" type="checkbox" id="habProfile" defaultChecked /><label className="form-check-label small" htmlFor="habProfile">Perfil médico habilitado</label></div>
                </div>
              </div>
            </div>
            <div className="text-end mt-3"><button className="adm-btn-primary"><i className="bi bi-check-lg" /> Cadastrar Profissional</button></div>
          </div>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-list-ul" /> Médicos Cadastrados</div>
            <div className="table-responsive">
              <table className="adm-table">
                <thead><tr><th>Nome</th><th>CRM</th><th>Especialidade</th><th>E-mail</th><th>Status</th></tr></thead>
                <tbody>
                  {mockDoctors.map((d, i) => (
                    <tr key={i}>
                      <td className="fw-semibold">{d.name}</td><td>{d.crm}</td><td>{d.specialty}</td><td>{d.email}</td>
                      <td><span className={`adm-badge ${d.status === "Ativo" ? "active" : "inactive"}`}>{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {staffTab === "receptionists" && (
        <>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Nova Recepcionista</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Nome Completo</label><input type="text" className="form-control" placeholder="Nome completo" /></div>
              <div className="col-md-3"><label className="form-label">CPF</label><input type="text" className="form-control" placeholder="000.000.000-00" /></div>
              <div className="col-md-3"><label className="form-label">Data de Nascimento</label><input type="date" className="form-control" /></div>
              <div className="col-md-3">
                <label className="form-label">Sexo</label>
                <select className="form-select"><option>Selecione</option><option>Feminino</option><option>Masculino</option><option>Outro</option></select>
              </div>
              <div className="col-md-9"><label className="form-label">Endereço</label><input type="text" className="form-control" placeholder="Rua, nº, bairro, cidade — UF" /></div>
              <div className="col-md-4"><label className="form-label">Telefone</label><input type="tel" className="form-control" placeholder="(00) 00000-0000" /></div>
              <div className="col-md-4"><label className="form-label">E-mail</label><input type="email" className="form-control" placeholder="recepcionista@clinica.com" /></div>
              <div className="col-md-4"><label className="form-label">Matrícula</label><input type="text" className="form-control" placeholder="REC-000" /></div>
              <div className="col-md-4">
                <label className="form-label">Turno de Trabalho</label>
                <select className="form-select"><option>Selecione</option><option>Manhã</option><option>Tarde</option><option>Noite</option><option>Integral</option></select>
              </div>
              <div className="col-md-4"><label className="form-label">Permissões</label><input type="text" className="form-control" placeholder="Ex: Agendamento, Cadastro" /></div>
              <div className="col-md-4"><label className="form-label">Senha</label><input type="password" className="form-control" placeholder="••••••••" /></div>
              <div className="col-12 text-end"><button className="adm-btn-accent"><i className="bi bi-check-lg" /> Cadastrar Recepcionista</button></div>
            </div>
          </div>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-list-ul" /> Recepcionistas Cadastradas</div>
            <div className="table-responsive">
              <table className="adm-table">
                <thead><tr><th>Nome</th><th>Matrícula</th><th>Turno</th><th>E-mail</th><th>Status</th></tr></thead>
                <tbody>
                  {mockReceptionists.map((r, i) => (
                    <tr key={i}>
                      <td className="fw-semibold">{r.name}</td><td>{r.registration}</td><td>{r.shift}</td><td>{r.email}</td>
                      <td><span className={`adm-badge ${r.status === "Ativo" ? "active" : "inactive"}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {staffTab === "nurses" && (
        <>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Enfermeiro(a)</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Nome Completo</label><input type="text" className="form-control" placeholder="Nome completo" /></div>
              <div className="col-md-3"><label className="form-label">CPF</label><input type="text" className="form-control" placeholder="000.000.000-00" /></div>
              <div className="col-md-3"><label className="form-label">Data de Nascimento</label><input type="date" className="form-control" /></div>
              <div className="col-md-3"><label className="form-label">COREN — Número</label><input type="text" className="form-control" placeholder="00000" /></div>
              <div className="col-md-3">
                <label className="form-label">COREN — Estado</label>
                <select className="form-select"><option>SP</option><option>RJ</option><option>MG</option><option>RS</option><option>PR</option><option>BA</option><option>Outro</option></select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Sexo</label>
                <select className="form-select"><option>Selecione</option><option>Feminino</option><option>Masculino</option><option>Outro</option></select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Turno</label>
                <select className="form-select"><option>Selecione</option><option>Manhã</option><option>Tarde</option><option>Noite</option><option>Integral</option></select>
              </div>
              <div className="col-md-8"><label className="form-label">Endereço</label><input type="text" className="form-control" placeholder="Rua, nº, bairro, cidade — UF" /></div>
              <div className="col-md-4"><label className="form-label">Telefone</label><input type="tel" className="form-control" placeholder="(00) 00000-0000" /></div>
              <div className="col-md-4"><label className="form-label">E-mail</label><input type="email" className="form-control" placeholder="enfermeiro@clinica.com" /></div>
              <div className="col-md-4"><label className="form-label">Experiência</label><input type="text" className="form-control" placeholder="Ex: 5 anos — UTI" /></div>
              <div className="col-md-4"><label className="form-label">Área de Atuação</label><input type="text" className="form-control" placeholder="Ex: Triagem, UTI" /></div>
              <div className="col-md-6"><label className="form-label">Permissões</label><input type="text" className="form-control" placeholder="Ex: Triagem, Medicação" /></div>
              <div className="col-md-6"><label className="form-label">Senha</label><input type="password" className="form-control" placeholder="••••••••" /></div>
              <div className="col-12 text-end"><button className="adm-btn-primary"><i className="bi bi-check-lg" /> Cadastrar Enfermeiro(a)</button></div>
            </div>
          </div>
        </>
      )}

      {staffTab === "admins" && (
        <>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Administrador</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Nome Completo</label><input type="text" className="form-control" placeholder="Nome completo" /></div>
              <div className="col-md-3"><label className="form-label">CPF</label><input type="text" className="form-control" placeholder="000.000.000-00" /></div>
              <div className="col-md-3"><label className="form-label">Cargo</label><input type="text" className="form-control" placeholder="Ex: Diretor Administrativo" /></div>
              <div className="col-md-4"><label className="form-label">E-mail</label><input type="email" className="form-control" placeholder="admin@clinica.com" /></div>
              <div className="col-md-4"><label className="form-label">Telefone</label><input type="tel" className="form-control" placeholder="(00) 00000-0000" /></div>
              <div className="col-md-4"><label className="form-label">Login de Acesso</label><input type="text" className="form-control" placeholder="admin.login" /></div>
              <div className="col-md-6"><label className="form-label">Permissões Avançadas</label><input type="text" className="form-control" placeholder="Ex: Total, Financeiro, RH" /></div>
              <div className="col-md-6"><label className="form-label">Senha</label><input type="password" className="form-control" placeholder="••••••••" /></div>
              <div className="col-12 text-end"><button className="adm-btn-primary"><i className="bi bi-check-lg" /> Cadastrar Administrador</button></div>
            </div>
          </div>
        </>
      )}

      {staffTab === "management" && (
        <>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Gestor</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Nome Completo</label><input type="text" className="form-control" placeholder="Nome completo" /></div>
              <div className="col-md-3"><label className="form-label">CPF</label><input type="text" className="form-control" placeholder="000.000.000-00" /></div>
              <div className="col-md-3"><label className="form-label">Cargo</label><input type="text" className="form-control" placeholder="Ex: Gestor Operacional" /></div>
              <div className="col-md-4"><label className="form-label">Área / Setor</label><input type="text" className="form-control" placeholder="Ex: Operações, Financeiro" /></div>
              <div className="col-md-4"><label className="form-label">Data de Nascimento</label><input type="date" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">E-mail</label><input type="email" className="form-control" placeholder="gestor@clinica.com" /></div>
              <div className="col-md-4"><label className="form-label">Telefone</label><input type="tel" className="form-control" placeholder="(00) 00000-0000" /></div>
              <div className="col-md-4">
                <label className="form-label">Nível de Acesso</label>
                <select className="form-select"><option>Selecione</option><option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Total</option></select>
              </div>
              <div className="col-md-4"><label className="form-label">Usuário</label><input type="text" className="form-control" placeholder="gestor.login" /></div>
              <div className="col-md-6"><label className="form-label">Permissões</label><input type="text" className="form-control" placeholder="Ex: Relatórios, Equipe, Escalas" /></div>
              <div className="col-md-6"><label className="form-label">Senha</label><input type="password" className="form-control" placeholder="••••••••" /></div>
              <div className="col-12 text-end"><button className="adm-btn-accent"><i className="bi bi-check-lg" /> Cadastrar Gestor</button></div>
            </div>
          </div>
        </>
      )}
    </section>
  );

  // ─── CLINIC ───
  const renderClinic = () => (
    <section className="adm-fade-in">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-hospital" /> Dados da Clínica</div>
            {[
              { icon: "bi-building", label: "Nome", value: "Clínica Saúde Integrada" },
              { icon: "bi-file-earmark-text", label: "CNPJ", value: "12.345.678/0001-90" },
              { icon: "bi-geo-alt", label: "Endereço", value: "Av. Paulista, 1000 — São Paulo, SP" },
              { icon: "bi-telephone", label: "Telefone", value: "(11) 3456-7890" },
              { icon: "bi-envelope", label: "E-mail", value: "contato@clinicasaude.com" },
            ].map((item, i) => (
              <div className="adm-clinic-info-item" key={i}>
                <div className="adm-clinic-info-icon"><i className={`bi ${item.icon}`} /></div>
                <div><div className="adm-clinic-info-label">{item.label}</div><div className="adm-clinic-info-value">{item.value}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-pencil-square" /> Editar Dados da Clínica</div>
            <div className="row g-3">
              <div className="col-md-8"><label className="form-label">Nome da Clínica</label><input type="text" className="form-control" defaultValue="Clínica Saúde Integrada" /></div>
              <div className="col-md-4"><label className="form-label">CNPJ</label><input type="text" className="form-control" defaultValue="12.345.678/0001-90" /></div>
              <div className="col-12"><label className="form-label">Endereço</label><input type="text" className="form-control" defaultValue="Av. Paulista, 1000 — São Paulo, SP" /></div>
              <div className="col-md-6"><label className="form-label">Telefone</label><input type="tel" className="form-control" defaultValue="(11) 3456-7890" /></div>
              <div className="col-md-6"><label className="form-label">E-mail</label><input type="email" className="form-control" defaultValue="contato@clinicasaude.com" /></div>
              <div className="col-12 text-end"><button className="adm-btn-primary"><i className="bi bi-save" /> Salvar Alterações</button></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─── REPORTS ───
  const renderReports = () => (
    <section className="adm-fade-in">
      <div className="row g-4 mb-4">
        {[
          { icon: "bi-calendar2-week", title: "Consultas Mensais", desc: "Relatório de todas as consultas realizadas no mês", color: "blue" },
          { icon: "bi-people", title: "Produtividade da Equipe", desc: "Desempenho de médicos e recepcionistas", color: "green" },
          { icon: "bi-currency-dollar", title: "Financeiro", desc: "Receita, custos e faturamento por período", color: "yellow" },
          { icon: "bi-graph-up-arrow", title: "Indicadores SLA", desc: "Tempo médio de espera e satisfação", color: "cyan" },
        ].map((r, i) => (
          <div className="col-md-6 col-xl-3" key={i}>
            <div className="adm-kpi-card" style={{ cursor: "pointer" }}>
              <div className={`adm-kpi-icon ${r.color}`}><i className={`bi ${r.icon}`} /></div>
              <div className="fw-semibold mb-1" style={{ fontSize: "0.95rem" }}>{r.title}</div>
              <div className="adm-kpi-sub">{r.desc}</div>
              <button className="adm-btn-outline mt-3 w-100 justify-content-center" style={{ padding: "7px 14px", fontSize: "0.8rem" }}>
                <i className="bi bi-download" /> Exportar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="adm-card">
        <div className="adm-card-title"><i className="bi bi-graph-up" /> Gráfico de Desempenho</div>
        <div className="adm-chart-placeholder">
          <i className="bi bi-pie-chart" />
          Área de gráficos interativos<br />
          <small>(Integração com biblioteca de gráficos em breve)</small>
        </div>
      </div>
    </section>
  );

  // ─── LOGS ───
  const renderLogs = () => (
    <section className="adm-fade-in">
      <div className="adm-card">
        <div className="adm-card-title"><i className="bi bi-journal-text" /> Registro de Atividades do Sistema</div>
        <div className="table-responsive">
          <table className="adm-table">
            <thead><tr><th>Ação</th><th>Detalhes</th><th>Usuário</th><th>Data/Hora</th></tr></thead>
            <tbody>
              {mockLogs.map((l, i) => (
                <tr key={i}>
                  <td><span className={`adm-badge ${l.color === "blue" ? "active" : l.color === "red" ? "inactive" : "pending"}`}>{l.action}</span></td>
                  <td>{l.detail}</td><td>{l.user}</td><td className="text-muted">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  // ─── SETTINGS ───
  const renderSettings = () => (
    <section className="adm-fade-in">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-bell" /> Notificações</div>
            {[
              { label: "E-mail de novos cadastros", desc: "Receber e-mail quando novos colaboradores forem cadastrados", checked: true },
              { label: "Alertas de segurança", desc: "Notificar tentativas de login suspeitas", checked: true },
              { label: "Relatórios semanais", desc: "Enviar resumo semanal por e-mail", checked: false },
            ].map((s, i) => (
              <div className="adm-setting-row" key={i}>
                <div><div className="adm-setting-label">{s.label}</div><div className="adm-setting-desc">{s.desc}</div></div>
                <div className="form-check form-switch"><input className="form-check-input" type="checkbox" defaultChecked={s.checked} style={{ width: "42px", height: "22px" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-clock" /> Horário de Funcionamento</div>
            <div className="row g-3">
              <div className="col-6"><label className="form-label">Abertura</label><input type="time" className="form-control" defaultValue="07:00" /></div>
              <div className="col-6"><label className="form-label">Fechamento</label><input type="time" className="form-control" defaultValue="19:00" /></div>
              <div className="col-12">
                <label className="form-label">Dias de Funcionamento</label>
                <div className="d-flex flex-wrap gap-2">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
                    <button key={i} className={`adm-tab-btn ${i < 5 ? "active" : ""}`} style={{ flex: "0 0 auto", padding: "6px 14px", fontSize: "0.8rem" }}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="col-12 text-end mt-2"><button className="adm-btn-primary"><i className="bi bi-save" /> Salvar Horários</button></div>
            </div>
          </div>
          <div className="adm-card">
            <div className="adm-card-title"><i className="bi bi-shield-check" /> Segurança</div>
            <div className="adm-setting-row">
              <div><div className="adm-setting-label">Autenticação em dois fatores (2FA)</div><div className="adm-setting-desc">Camada extra de segurança no login</div></div>
              <div className="form-check form-switch"><input className="form-check-input" type="checkbox" defaultChecked style={{ width: "42px", height: "22px" }} /></div>
            </div>
            <div className="adm-setting-row">
              <div><div className="adm-setting-label">Sessão expira em</div><div className="adm-setting-desc">Tempo máximo de inatividade</div></div>
              <select className="form-select" style={{ width: "120px" }} defaultValue="30"><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 hora</option></select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─── RENDER SECTION ───
  const sectionTitles = { overview: "Visão Geral", staff: "Gestão de Equipe", clinic: "Dados da Clínica", reports: "Relatórios", logs: "Logs de Atividade", settings: "Configurações" };

  const renderContent = () => {
    switch (activeSection) {
      case "overview": return renderOverview();
      case "staff": return renderStaff();
      case "clinic": return renderClinic();
      case "reports": return renderReports();
      case "logs": return renderLogs();
      case "settings": return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-layout">
        {renderSidebar()}
        <main className="adm-main">
          <header className="adm-header">
            <div className="d-flex align-items-center gap-3">
              <button className="adm-mobile-toggle" onClick={() => setSidebarOpen(true)}><i className="bi bi-list" /></button>
              <div>
                <h1 className="adm-header-title">{sectionTitles[activeSection]}</h1>
                <div className="adm-header-greeting">Bem-vindo(a) de volta, Administrador</div>
              </div>
            </div>
            <div className="adm-header-profile">
              <div className="adm-header-info">
                <div className="adm-header-name">Admin SCU</div>
                <div className="adm-header-role">Administrador da Clínica</div>
              </div>
              <div className="adm-header-avatar">AD</div>
            </div>
          </header>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

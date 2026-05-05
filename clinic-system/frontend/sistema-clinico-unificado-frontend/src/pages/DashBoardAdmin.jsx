import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/admin-dashboard.css";
import { apiFetch, getUser, logout } from "../utils/auth";

const COUNCIL_STATES = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const emptyDoctorForm = {
  name: "", email: "", cpf: "", birthDate: "", password: "",
  specialtyId: "", clinicId: "",
  councilType: "CRM", councilNumber: "", councilState: "SP",
  rqe: "", formation: "", languages: "", areasOfPractice: "",
};

const emptySpecialtyForm = { name: "", description: "" };

const emptyClinicForm = {
  clinicName: "", cnpj: "", address: "", phone: "", isFilial: false, parentClinicId: ""
};

const emptyManagerForm = {
  name: "", email: "", cpf: "", birthDate: "", password: "", clinicId: ""
};

export default function DashBoardAdmin() {
  const navigate = useNavigate();
  const user = getUser();

  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [staffTab, setStaffTab]           = useState("doctors");

  // ── dados da API ──────────────────────────────────────────────────────────
  const [doctors,    setDoctors]    = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [clinics,    setClinics]    = useState([]);
  const [managers,   setManagers]   = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [apiError,   setApiError]   = useState("");

  // ── formulário de médico ──────────────────────────────────────────────────
  const [doctorForm,   setDoctorForm]   = useState(emptyDoctorForm);
  const [formError,    setFormError]    = useState("");
  const [formSuccess,  setFormSuccess]  = useState("");
  const [submitting,   setSubmitting]   = useState(false);

  // ── formulários de especialidade e clínica ────────────────────────────────
  const [specialtyForm, setSpecialtyForm] = useState(emptySpecialtyForm);
  const [specFormError, setSpecFormError] = useState("");
  const [specFormSuccess, setSpecFormSuccess] = useState("");
  const [submittingSpec, setSubmittingSpec] = useState(false);

  const [clinicForm, setClinicForm] = useState(emptyClinicForm);
  const [clinicFormError, setClinicFormError] = useState("");
  const [clinicFormSuccess, setClinicFormSuccess] = useState("");
  const [submittingClinic, setSubmittingClinic] = useState(false);

  const [managerForm, setManagerForm] = useState(emptyManagerForm);
  const [managerFormError, setManagerFormError] = useState("");
  const [managerFormSuccess, setManagerFormSuccess] = useState("");
  const [submittingManager, setSubmittingManager] = useState(false);

  // ── busca inicial ─────────────────────────────────────────────────────────
  const fetchDoctors = useCallback(async () => {
    try {
      const res = await apiFetch("/api/admin/staff/doctors");
      if (res.ok) setDoctors(await res.json());
    } catch { /* silencioso */ }
  }, []);

  const fetchManagers = useCallback(async () => {
    try {
      const res = await apiFetch("/api/management/managers");
      if (res.ok) setManagers(await res.json());
    } catch { /* silencioso */ }
  }, []);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [resSpec, resClinic] = await Promise.all([
          apiFetch("/api/specialties"),
          apiFetch("/api/management/clinics"),
        ]);
        if (resSpec.ok)   setSpecialties(await resSpec.json());
        if (resClinic.ok) setClinics(await resClinic.json());
        await fetchDoctors();
        await fetchManagers();
      } catch {
        setApiError("Não foi possível carregar dados do servidor.");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [fetchDoctors, fetchManagers]);

  // ── submit formulário médico ──────────────────────────────────────────────
  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const required = ["name","email","cpf","birthDate","password","specialtyId","clinicId","councilNumber","councilState"];
    const missing = required.filter(k => !doctorForm[k]);
    if (missing.length) { setFormError("Preencha todos os campos obrigatórios."); return; }
    if (doctorForm.cpf.replace(/\D/g,"").length !== 11) { setFormError("CPF deve ter 11 dígitos."); return; }

    setSubmitting(true);
    try {
      const payload = {
        ...doctorForm,
        cpf: doctorForm.cpf.replace(/\D/g,""),
      };
      const res = await apiFetch("/api/admin/staff/doctor", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) { setFormError(typeof body === "string" ? body : "Erro ao cadastrar médico."); return; }

      setFormSuccess(`Médico ${body.userName} cadastrado com sucesso!`);
      setDoctorForm(emptyDoctorForm);
      await fetchDoctors();
    } catch {
      setFormError("Erro de conexão com o servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateSpecialty = async (e) => {
    e.preventDefault();
    setSpecFormError("");
    setSpecFormSuccess("");

    if (!specialtyForm.name) { setSpecFormError("O nome da especialidade é obrigatório."); return; }

    setSubmittingSpec(true);
    try {
      const res = await apiFetch("/api/specialties", {
        method: "POST",
        body: JSON.stringify(specialtyForm),
      });
      if (!res.ok) { setSpecFormError("Erro ao cadastrar especialidade."); return; }

      const body = await res.json();
      setSpecFormSuccess(`Especialidade ${body.name} cadastrada com sucesso!`);
      setSpecialtyForm(emptySpecialtyForm);
      const resSpec = await apiFetch("/api/specialties");
      if (resSpec.ok) setSpecialties(await resSpec.json());
    } catch {
      setSpecFormError("Erro de conexão com o servidor.");
    } finally {
      setSubmittingSpec(false);
    }
  };

  const handleCreateClinic = async (e) => {
    e.preventDefault();
    setClinicFormError("");
    setClinicFormSuccess("");

    if (!clinicForm.clinicName || !clinicForm.cnpj) { 
      setClinicFormError("Preencha todos os campos obrigatórios (Nome e CNPJ)."); 
      return; 
    }
    if (clinicForm.isFilial && !clinicForm.parentClinicId) {
      setClinicFormError("Selecione a clínica matriz.");
      return;
    }

    setSubmittingClinic(true);
    try {
      const payload = {
        clinicName: clinicForm.clinicName,
        cnpj: clinicForm.cnpj.replace(/\D/g,""),
        address: clinicForm.address,
        phone: clinicForm.phone,
        parentClinicId: clinicForm.isFilial ? clinicForm.parentClinicId : null
      };
      const res = await apiFetch("/api/management/create-clinic", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) { 
        const errorText = await res.text();
        setClinicFormError(errorText || "Erro ao cadastrar clínica."); 
        return; 
      }

      setClinicFormSuccess(`Clínica ${clinicForm.clinicName} cadastrada com sucesso!`);
      setClinicForm(emptyClinicForm);
      const resClinic = await apiFetch("/api/management/clinics");
      if (resClinic.ok) setClinics(await resClinic.json());
    } catch {
      setClinicFormError("Erro de conexão com o servidor.");
    } finally {
      setSubmittingClinic(false);
    }
  };

  const handleCreateManager = async (e) => {
    e.preventDefault();
    setManagerFormError("");
    setManagerFormSuccess("");

    const required = ["name","email","cpf","birthDate","password","clinicId"];
    const missing = required.filter(k => !managerForm[k]);
    if (missing.length) { setManagerFormError("Preencha todos os campos obrigatórios."); return; }

    setSubmittingManager(true);
    try {
      const payload = { ...managerForm, cpf: managerForm.cpf.replace(/\D/g,"") };
      const res = await apiFetch("/api/management/create-manager", {
        method: "POST", body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errorText = await res.text();
        setManagerFormError(errorText || "Erro ao cadastrar manager."); return;
      }
      setManagerFormSuccess("Manager cadastrado com sucesso!");
      setManagerForm(emptyManagerForm);
      await fetchManagers();
    } catch {
      setManagerFormError("Erro de conexão.");
    } finally {
      setSubmittingManager(false);
    }
  };

  // ── toggle ativo/inativo ──────────────────────────────────────────────────
  const handleToggleDoctor = async (id) => {
    try {
      const res = await apiFetch(`/api/admin/staff/doctor/${id}/toggle`, { method: "POST" });
      if (res.ok) await fetchDoctors();
    } catch { /* silencioso */ }
  };

  const handleLogout = () => { logout(); navigate("/login"); };
  const handleMenu   = (s) => { setActiveSection(s); if (window.innerWidth < 992) setSidebarOpen(false); };
  const setField     = (k) => (e) => setDoctorForm(f => ({ ...f, [k]: e.target.value }));
  const setSpecField = (k) => (e) => setSpecialtyForm(f => ({ ...f, [k]: e.target.value }));
  const setClinicField = (k) => (e) => setClinicForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setManagerField = (k) => (e) => setManagerForm(f => ({ ...f, [k]: e.target.value }));

  // ── helpers de UI ─────────────────────────────────────────────────────────
  const menuItems = [
    { id: "overview", icon: "bi-grid-1x2-fill",      label: "Visão Geral" },
    { id: "staff",    icon: "bi-people-fill",          label: "Equipe" },
    { id: "specialties", icon: "bi-award-fill",        label: "Especialidades" },
    { id: "clinic",   icon: "bi-hospital-fill",        label: "Clínicas" },
    { id: "reports",  icon: "bi-bar-chart-line-fill",  label: "Relatórios" },
    { id: "logs",     icon: "bi-journal-text",         label: "Logs" },
    { id: "settings", icon: "bi-gear-fill",            label: "Configurações" },
  ];

  const mockLogs = [
    { action: "Login", user: user?.name || "Admin", detail: "Acesso ao painel", time: "Agora", color: "blue" },
  ];

  // ─── SIDEBAR ──────────────────────────────────────────────────────────────
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
                <i className={`bi ${m.icon}`} /><span>{m.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="adm-sidebar-footer">
          <button className="adm-menu-btn" style={{ color: "rgba(255,255,255,0.5)" }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-left" /><span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );

  // ─── OVERVIEW ─────────────────────────────────────────────────────────────
  const renderOverview = () => {
    const kpis = [
      { label: "Médicos Cadastrados", value: doctors.length, icon: "bi-heart-pulse-fill", iconClass: "blue", cardClass: "" },
      { label: "Especialidades", value: specialties.length, icon: "bi-award-fill", iconClass: "green", cardClass: "accent" },
      { label: "Clínicas", value: clinics.length, icon: "bi-hospital-fill", iconClass: "yellow", cardClass: "warning" },
      { label: "Médicos Ativos", value: doctors.filter(d => d.profileEnabled).length, icon: "bi-person-check-fill", iconClass: "cyan", cardClass: "info" },
    ];
    return (
      <section className="adm-fade-in">
        {loading && <div className="alert alert-info">Carregando dados...</div>}
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <div className="row g-4 mb-4">
          {kpis.map((k, i) => (
            <div className="col-12 col-sm-6 col-xl-3" key={i}>
              <div className={`adm-kpi-card ${k.cardClass}`}>
                <div className={`adm-kpi-icon ${k.iconClass}`}><i className={`bi ${k.icon}`} /></div>
                <div className="adm-kpi-label">{k.label}</div>
                <div className="adm-kpi-value">{k.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="adm-card">
          <div className="adm-card-title"><i className="bi bi-clock-history" /> Atividade Recente</div>
          {mockLogs.map((l, i) => (
            <div className="adm-activity-item" key={i}>
              <div className={`adm-activity-dot ${l.color}`} />
              <div>
                <div className="adm-activity-text"><strong>{l.action}</strong> — {l.detail}</div>
                <div className="adm-activity-time">{l.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // ─── ABA MÉDICOS ──────────────────────────────────────────────────────────
  const renderDoctors = () => (
    <>
      {/* Formulário de cadastro */}
      <div className="adm-card">
        <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Médico</div>

        {formError   && <div className="alert alert-danger py-2">{formError}</div>}
        {formSuccess && <div className="alert alert-success py-2">{formSuccess}</div>}

        <form onSubmit={handleCreateDoctor}>
          {/* Dados de acesso */}
          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-person" /> Dados Pessoais e Acesso</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Nome Completo *</label>
                <input className="form-control" value={doctorForm.name} onChange={setField("name")} placeholder="Dr. João Silva" /></div>
              <div className="col-md-6"><label className="form-label">E-mail *</label>
                <input type="email" className="form-control" value={doctorForm.email} onChange={setField("email")} placeholder="medico@clinica.com" /></div>
              <div className="col-md-4"><label className="form-label">CPF *</label>
                <input className="form-control" value={doctorForm.cpf} onChange={setField("cpf")} placeholder="000.000.000-00" /></div>
              <div className="col-md-4"><label className="form-label">Data de Nascimento *</label>
                <input type="date" className="form-control" value={doctorForm.birthDate} onChange={setField("birthDate")} /></div>
              <div className="col-md-4"><label className="form-label">Senha *</label>
                <input type="password" className="form-control" value={doctorForm.password} onChange={setField("password")} placeholder="••••••••" /></div>
            </div>
          </div>

          {/* Conselho */}
          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-card-checklist" /> Conselho Profissional</div>
            <div className="row g-3">
              <div className="col-md-3"><label className="form-label">Tipo *</label>
                <select className="form-select" value={doctorForm.councilType} onChange={setField("councilType")}>
                  <option value="CRM">CRM</option>
                  <option value="COREM">COREM</option>
                </select>
              </div>
              <div className="col-md-4"><label className="form-label">Número *</label>
                <input className="form-control" value={doctorForm.councilNumber} onChange={setField("councilNumber")} placeholder="00000" /></div>
              <div className="col-md-2"><label className="form-label">Estado *</label>
                <select className="form-select" value={doctorForm.councilState} onChange={setField("councilState")}>
                  {COUNCIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-md-3"><label className="form-label">RQE</label>
                <input className="form-control" value={doctorForm.rqe} onChange={setField("rqe")} placeholder="Nº RQE (opcional)" /></div>
            </div>
          </div>

          {/* Especialidade e clínica */}
          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-award" /> Especialidade e Clínica</div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Especialidade *</label>
                <select className="form-select" value={doctorForm.specialtyId} onChange={setField("specialtyId")}>
                  <option value="">Selecione...</option>
                  {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {specialties.length === 0 && <div className="form-text text-warning">Nenhuma especialidade cadastrada ainda.</div>}
              </div>
              <div className="col-md-6"><label className="form-label">Clínica *</label>
                <select className="form-select" value={doctorForm.clinicId} onChange={setField("clinicId")}>
                  <option value="">Selecione...</option>
                  {clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {clinics.length === 0 && <div className="form-text text-warning">Nenhuma clínica cadastrada ainda.</div>}
              </div>
            </div>
          </div>

          {/* Formação */}
          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-mortarboard" /> Formação (opcional)</div>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label">Formação Acadêmica</label>
                <input className="form-control" value={doctorForm.formation} onChange={setField("formation")} placeholder="Ex: USP — Medicina" /></div>
              <div className="col-md-4"><label className="form-label">Idiomas</label>
                <input className="form-control" value={doctorForm.languages} onChange={setField("languages")} placeholder="Ex: Português, Inglês" /></div>
              <div className="col-md-4"><label className="form-label">Áreas de Atuação</label>
                <input className="form-control" value={doctorForm.areasOfPractice} onChange={setField("areasOfPractice")} placeholder="Ex: Hemodinâmica" /></div>
            </div>
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="adm-btn-primary" disabled={submitting}>
              <i className="bi bi-check-lg" /> {submitting ? "Cadastrando..." : "Cadastrar Médico"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de médicos */}
      <div className="adm-card">
        <div className="adm-card-title">
          <i className="bi bi-list-ul" /> Médicos Cadastrados
          <span className="ms-2 badge bg-secondary">{doctors.length}</span>
        </div>
        {loading ? (
          <div className="text-center py-4 text-muted">Carregando...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-4 text-muted">Nenhum médico cadastrado ainda.</div>
        ) : (
          <div className="table-responsive">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Nome</th><th>Conselho</th><th>Especialidade</th>
                  <th>Clínica</th><th>E-mail</th><th>Status</th><th style={{width:90}}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d.id}>
                    <td className="fw-semibold">{d.userName}</td>
                    <td>{d.councilType}/{d.councilState} {d.councilNumber}</td>
                    <td>{d.specialtyName}</td>
                    <td>{d.clinicName}</td>
                    <td>{d.userEmail}</td>
                    <td>
                      <span className={`adm-badge ${d.profileEnabled ? "active" : "inactive"}`}>
                        {d.profileEnabled ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${d.profileEnabled ? "btn-outline-danger" : "btn-outline-success"}`}
                        style={{ borderRadius: 8, fontSize: "0.78rem" }}
                        title={d.profileEnabled ? "Desativar" : "Ativar"}
                        onClick={() => handleToggleDoctor(d.id)}
                      >
                        <i className={`bi ${d.profileEnabled ? "bi-toggle-on" : "bi-toggle-off"}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  // ─── STAFF (tabs) ──────────────────────────────────────────────────────────
  const staffTabs = [
    { id: "doctors", label: "Médicos" },
    { id: "managers", label: "Managers" },
    { id: "receptionists", label: "Recepcionistas" },
    { id: "nurses", label: "Enfermeiros" },
  ];

  const renderManagers = () => (
    <>
      <div className="adm-card mb-4">
        <div className="adm-card-title"><i className="bi bi-person-plus-fill" /> Cadastrar Novo Manager</div>
        {managerFormError   && <div className="alert alert-danger py-2">{managerFormError}</div>}
        {managerFormSuccess && <div className="alert alert-success py-2">{managerFormSuccess}</div>}

        <form onSubmit={handleCreateManager}>
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">Nome Completo *</label>
              <input className="form-control" value={managerForm.name} onChange={setManagerField("name")} placeholder="João Silva" /></div>
            <div className="col-md-6"><label className="form-label">E-mail *</label>
              <input type="email" className="form-control" value={managerForm.email} onChange={setManagerField("email")} placeholder="manager@clinica.com" /></div>
            <div className="col-md-4"><label className="form-label">CPF *</label>
              <input className="form-control" value={managerForm.cpf} onChange={setManagerField("cpf")} placeholder="000.000.000-00" /></div>
            <div className="col-md-4"><label className="form-label">Data de Nascimento *</label>
              <input type="date" className="form-control" value={managerForm.birthDate} onChange={setManagerField("birthDate")} /></div>
            <div className="col-md-4"><label className="form-label">Senha de Acesso *</label>
              <input type="password" className="form-control" value={managerForm.password} onChange={setManagerField("password")} placeholder="••••••••" /></div>
            <div className="col-md-12"><label className="form-label">Clínica Vinculada *</label>
              <select className="form-select" value={managerForm.clinicId} onChange={setManagerField("clinicId")}>
                <option value="">Selecione...</option>
                {clinics.map(c => <option key={c.id} value={c.id}>{c.name} {c.parentClinic ? `(Filial)` : `(Matriz)`}</option>)}
              </select>
            </div>
          </div>
          <div className="text-end mt-3">
            <button type="submit" className="adm-btn-primary" disabled={submittingManager}>
              <i className="bi bi-check-lg" /> {submittingManager ? "Cadastrando..." : "Cadastrar Manager"}
            </button>
          </div>
        </form>
      </div>

      <div className="adm-card">
        <div className="adm-card-title"><i className="bi bi-list-ul" /> Managers Cadastrados</div>
        {loading ? (
          <div className="text-center py-4 text-muted">Carregando...</div>
        ) : managers.length === 0 ? (
          <div className="text-center py-4 text-muted">Nenhum manager cadastrado ainda.</div>
        ) : (
          <div className="table-responsive">
            <table className="adm-table">
              <thead>
                <tr><th>Nome</th><th>E-mail</th><th>Clínica Vinculada</th><th>Status</th></tr>
              </thead>
              <tbody>
                {managers.map(m => (
                  <tr key={m.id}>
                    <td className="fw-semibold">{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.clinicName}</td>
                    <td>
                      <span className={`adm-badge ${m.active ? "active" : "inactive"}`}>
                        {m.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  const renderStaff = () => (
    <section className="adm-fade-in">
      <div className="adm-tab-nav" style={{ maxWidth: 500, flexWrap: "wrap" }}>
        {staffTabs.map((t) => (
          <button key={t.id} className={`adm-tab-btn ${staffTab === t.id ? "active" : ""}`} onClick={() => setStaffTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {staffTab === "doctors" && renderDoctors()}
      {staffTab === "managers" && renderManagers()}

      {staffTab !== "doctors" && staffTab !== "managers" && (
        <div className="adm-card">
          <div className="text-center py-5 text-muted">
            <i className="bi bi-tools" style={{ fontSize: "2rem" }} />
            <div className="mt-2">Em desenvolvimento — próxima sprint</div>
          </div>
        </div>
      )}
    </section>
  );

  // ─── ESPECIALIDADES ────────────────────────────────────────────────────────
  const renderSpecialties = () => (
    <section className="adm-fade-in">
      {/* Formulário de Especialidade */}
      <div className="adm-card mb-4">
        <div className="adm-card-title"><i className="bi bi-plus-circle" /> Cadastrar Especialidade</div>
        {specFormError   && <div className="alert alert-danger py-2">{specFormError}</div>}
        {specFormSuccess && <div className="alert alert-success py-2">{specFormSuccess}</div>}

        <form onSubmit={handleCreateSpecialty}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Nome da Especialidade *</label>
              <input className="form-control" value={specialtyForm.name} onChange={setSpecField("name")} placeholder="Ex: Cardiologia" />
            </div>
            <div className="col-md-8">
              <label className="form-label">Descrição</label>
              <input className="form-control" value={specialtyForm.description} onChange={setSpecField("description")} placeholder="Breve descrição da especialidade..." />
            </div>
          </div>
          <div className="text-end mt-3">
            <button type="submit" className="adm-btn-primary" disabled={submittingSpec}>
              <i className="bi bi-check-lg" /> {submittingSpec ? "Cadastrando..." : "Cadastrar Especialidade"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Especialidades */}
      <div className="adm-card">
        <div className="adm-card-title">
          <i className="bi bi-award-fill" /> Especialidades Cadastradas
          <span className="ms-2 badge bg-secondary">{specialties.length}</span>
        </div>
        {specialties.length === 0 ? (
          <div className="text-center py-4 text-muted">Nenhuma especialidade cadastrada ainda.</div>
        ) : (
          <div className="table-responsive">
            <table className="adm-table">
              <thead>
                <tr><th>Nome</th><th>Descrição</th></tr>
              </thead>
              <tbody>
                {specialties.map(s => (
                  <tr key={s.id}>
                    <td className="fw-semibold">{s.name}</td>
                    <td>{s.description || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  // ─── CLINIC ───────────────────────────────────────────────────────────────
  const renderClinic = () => (
    <section className="adm-fade-in">
      {/* Formulário de Clínica */}
      <div className="adm-card mb-4">
        <div className="adm-card-title"><i className="bi bi-plus-circle" /> Cadastrar Nova Clínica</div>
        {clinicFormError   && <div className="alert alert-danger py-2">{clinicFormError}</div>}
        {clinicFormSuccess && <div className="alert alert-success py-2">{clinicFormSuccess}</div>}

        <form onSubmit={handleCreateClinic}>
          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-hospital" /> Dados da Clínica</div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome da Clínica *</label>
                <input className="form-control" value={clinicForm.clinicName} onChange={setClinicField("clinicName")} placeholder="Ex: Clínica Saúde" />
              </div>
              <div className="col-md-6">
                <label className="form-label">CNPJ *</label>
                <input className="form-control" value={clinicForm.cnpj} onChange={setClinicField("cnpj")} placeholder="00.000.000/0000-00" />
              </div>
              <div className="col-md-8">
                <label className="form-label">Endereço</label>
                <input className="form-control" value={clinicForm.address} onChange={setClinicField("address")} placeholder="Rua, Número, Bairro, Cidade - UF" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Telefone</label>
                <input className="form-control" value={clinicForm.phone} onChange={setClinicField("phone")} placeholder="(00) 0000-0000" />
              </div>
            </div>
          </div>

          <div className="adm-form-section">
            <div className="adm-form-section-title"><i className="bi bi-diagram-3" /> Hierarquia</div>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="isFilialSwitch" checked={clinicForm.isFilial} onChange={setClinicField("isFilial")} />
                  <label className="form-check-label fw-bold" htmlFor="isFilialSwitch">Esta clínica é uma filial de outra clínica existente?</label>
                </div>
              </div>
              {clinicForm.isFilial && (
                <div className="col-md-6">
                  <label className="form-label">Selecione a Clínica Matriz *</label>
                  <select className="form-select" value={clinicForm.parentClinicId} onChange={setClinicField("parentClinicId")}>
                    <option value="">Selecione...</option>
                    {clinics.filter(c => !c.parentClinic).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="adm-btn-primary" disabled={submittingClinic}>
              <i className="bi bi-check-lg" /> {submittingClinic ? "Cadastrando..." : "Cadastrar Clínica"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Clínicas */}
      <h5 className="mb-3"><i className="bi bi-h-square" /> Clínicas Cadastradas</h5>
      {clinics.length === 0 ? (
        <div className="adm-card text-center py-5 text-muted">Nenhuma clínica cadastrada.</div>
      ) : (
        <div className="row g-4">
          {clinics.map(c => (
            <div className="col-lg-6" key={c.id}>
              <div className="adm-card">
                <div className="adm-card-title"><i className="bi bi-hospital" /> {c.name}</div>
                {[
                  { icon: "bi-file-earmark-text", label: "CNPJ",      value: c.cnpj },
                  { icon: "bi-geo-alt",            label: "Endereço",  value: c.address || "—" },
                  { icon: "bi-telephone",          label: "Telefone",  value: c.phone   || "—" },
                ].map((item, i) => (
                  <div className="adm-clinic-info-item" key={i}>
                    <div className="adm-clinic-info-icon"><i className={`bi ${item.icon}`} /></div>
                    <div><div className="adm-clinic-info-label">{item.label}</div><div className="adm-clinic-info-value">{item.value}</div></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  // ─── seções estáticas ─────────────────────────────────────────────────────
  const renderReports = () => (
    <section className="adm-fade-in">
      <div className="adm-card text-center py-5 text-muted">
        <i className="bi bi-bar-chart-line" style={{ fontSize: "2rem" }} />
        <div className="mt-2">Relatórios — em desenvolvimento</div>
      </div>
    </section>
  );

  const renderLogs = () => (
    <section className="adm-fade-in">
      <div className="adm-card">
        <div className="adm-card-title"><i className="bi bi-journal-text" /> Logs</div>
        {mockLogs.map((l, i) => (
          <div className="adm-activity-item" key={i}>
            <div className={`adm-activity-dot ${l.color}`} />
            <div>
              <div className="adm-activity-text"><strong>{l.action}</strong> — {l.detail}</div>
              <div className="adm-activity-time">{l.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="adm-fade-in">
      <div className="adm-card text-center py-5 text-muted">
        <i className="bi bi-gear" style={{ fontSize: "2rem" }} />
        <div className="mt-2">Configurações — em desenvolvimento</div>
      </div>
    </section>
  );

  // ─── RENDER PRINCIPAL ─────────────────────────────────────────────────────
  const sectionTitles = {
    overview: "Visão Geral", staff: "Gestão de Equipe",
    specialties: "Especialidades", clinic: "Clínicas", 
    reports: "Relatórios", logs: "Logs", settings: "Configurações",
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":  return renderOverview();
      case "staff":     return renderStaff();
      case "specialties": return renderSpecialties();
      case "clinic":    return renderClinic();
      case "reports":   return renderReports();
      case "logs":      return renderLogs();
      case "settings":  return renderSettings();
      default:          return renderOverview();
    }
  };

  const initials = (user?.name || "AD").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

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
                <div className="adm-header-greeting">Bem-vindo(a), {user?.name || "Administrador"}</div>
              </div>
            </div>
            <div className="adm-header-profile">
              <div className="adm-header-info">
                <div className="adm-header-name">{user?.name || "Admin SCU"}</div>
                <div className="adm-header-role">{user?.email || ""}</div>
              </div>
              <div className="adm-header-avatar" style={{ cursor: "pointer" }} onClick={handleLogout} title="Sair">
                {initials}
              </div>
            </div>
          </header>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

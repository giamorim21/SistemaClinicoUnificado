import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/home.css";

export default function DashBoardMedico() {
  const [section, setSection] = useState("dashboard");
  const [data, setData] = useState({
    pacientes: [],
    consultas: [],
    prescricoes: [],
    atestados: [],
    exames: [],
    receitas: [],
    relatorios: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("medicoData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("medicoData", JSON.stringify(data));
  }, [data]);

  const addItem = (section, item) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <DashboardView />;
      case "agenda":
        return <AgendaView addItem={addItem} data={data} />;
      case "pacientes":
        return <PacientesView addItem={addItem} data={data} />;
      case "prontuarios":
        return <ProntuariosView addItem={addItem} />;
      case "config":
        return <ConfiguracoesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "var(--soft)" }}>
      {/* Sidebar */}
      <nav
        className="d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: "250px",
          background: "var(--brand)",
        }}
      >
        <a
          href="#"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <i className="bi bi-hospital me-2 fs-4"></i>
          <span className="fs-5 fw-semibold">Painel Médico</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#"
              onClick={() => setSection("dashboard")}
              className={`nav-link text-white ${section === "dashboard" ? "active bg-dark" : ""}`}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setSection("agenda")}
              className={`nav-link text-white ${section === "agenda" ? "active bg-dark" : ""}`}
            >
              <i className="bi bi-calendar3 me-2"></i> Agenda
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setSection("pacientes")}
              className={`nav-link text-white ${section === "pacientes" ? "active bg-dark" : ""}`}
            >
              <i className="bi bi-people me-2"></i> Pacientes
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setSection("prontuarios")}
              className={`nav-link text-white ${section === "prontuarios" ? "active bg-dark" : ""}`}
            >
              <i className="bi bi-file-earmark-medical me-2"></i> Prontuários
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setSection("config")}
              className={`nav-link text-white ${section === "config" ? "active bg-dark" : ""}`}
            >
              <i className="bi bi-gear me-2"></i> Configurações
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle me-2 fs-5"></i>
            <strong>Dr. Roberto</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark shadow">
            <li>
              <a className="dropdown-item" href="#">
                Perfil
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Sair
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="flex-grow-1 p-4">{renderSection()}</main>
    </div>
  );
}

/* === DASHBOARD PRINCIPAL === */
function DashboardView() {
  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        <i className="bi bi-speedometer2 me-2 text-primary"></i>Visão Geral
      </h3>
      <div className="row g-4">
        {[
          { title: "Consultas Hoje", value: "12", icon: "calendar3", color: "primary" },
          { title: "Pacientes Ativos", value: "248", icon: "people", color: "success" },
          { title: "Prontuários Pendentes", value: "3", icon: "file-earmark-medical", color: "warning" },
          { title: "Tempo Médio", value: "28min", icon: "clock", color: "info" },
        ].map((stat, i) => (
          <div className="col-md-3" key={i}>
            <div className="card shadow-sm border-0 text-center py-4">
              <i className={`bi bi-${stat.icon} text-${stat.color} fs-2 mb-2`}></i>
              <h6 className="fw-bold">{stat.title}</h6>
              <h3 className="fw-bolder text-dark">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h5 className="mb-3">
          <i className="bi bi-activity me-2 text-primary"></i>Atividades Recentes
        </h5>
        <ul className="list-group">
          {[
            "Prontuário atualizado - Maria Silva",
            "Receita emitida - João Santos",
            "Exame solicitado - Ana Costa",
            "Atestado gerado - Carla Mendes",
          ].map((a, i) => (
            <li className="list-group-item" key={i}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* === AGENDA === */
function AgendaView({ addItem, data }) {
  const [consulta, setConsulta] = useState({ paciente: "", data: "", descricao: "" });
  const handleAdd = () => {
    if (!consulta.paciente || !consulta.data) return;
    addItem("consultas", consulta);
    setConsulta({ paciente: "", data: "", descricao: "" });
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        <i className="bi bi-calendar3 me-2 text-primary"></i>Agenda
      </h3>

      <div className="card p-4 mb-4 shadow-sm border-0">
        <h6>Nova Consulta</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Paciente"
              value={consulta.paciente}
              onChange={(e) => setConsulta({ ...consulta, paciente: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="datetime-local"
              className="form-control"
              value={consulta.data}
              onChange={(e) => setConsulta({ ...consulta, data: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição"
              value={consulta.descricao}
              onChange={(e) => setConsulta({ ...consulta, descricao: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-1"></i>Adicionar
        </button>
      </div>

      <h6>Consultas Agendadas</h6>
      {data.consultas.length === 0 ? (
        <p className="text-muted">Nenhuma consulta registrada.</p>
      ) : (
        <ul className="list-group">
          {data.consultas.map((c, i) => (
            <li className="list-group-item" key={i}>
              <strong>{c.paciente}</strong> — {c.data}
              <br />
              <small>{c.descricao}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* === PACIENTES === */
function PacientesView({ addItem, data }) {
  const [novo, setNovo] = useState({ nome: "", cpf: "", telefone: "" });
  const handleAdd = () => {
    if (!novo.nome) return;
    addItem("pacientes", novo);
    setNovo({ nome: "", cpf: "", telefone: "" });
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        <i className="bi bi-people me-2 text-primary"></i>Pacientes
      </h3>

      <div className="card p-4 shadow-sm border-0 mb-4">
        <h6>Novo Paciente</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              value={novo.nome}
              onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="CPF"
              value={novo.cpf}
              onChange={(e) => setNovo({ ...novo, cpf: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Telefone"
              value={novo.telefone}
              onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAdd}>
          <i className="bi bi-person-plus me-1"></i>Salvar
        </button>
      </div>

      <h6>Lista de Pacientes</h6>
      {data.pacientes.length === 0 ? (
        <p className="text-muted">Nenhum paciente cadastrado.</p>
      ) : (
        <ul className="list-group">
          {data.pacientes.map((p, i) => (
            <li className="list-group-item" key={i}>
              <strong>{p.nome}</strong> — {p.cpf || "Sem CPF"} — {p.telefone || "Sem telefone"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* === PRONTUÁRIOS === */
function ProntuariosView({ addItem }) {
  const [form, setForm] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    addItem("prontuarios", form);
    setForm({});
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        <i className="bi bi-file-earmark-medical me-2 text-primary"></i>Prontuário Eletrônico
      </h3>
      <div className="card p-4 shadow-sm border-0">
        <div className="row g-3">
          {["queixa", "antecedentes", "exame", "diagnostico", "conduta"].map((f) => (
            <div className="col-12" key={f}>
              <label className="form-label text-capitalize">{f}</label>
              <textarea
                name={f}
                className="form-control"
                rows="3"
                value={form[f] || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          <i className="bi bi-save me-1"></i>Salvar Registro
        </button>
      </div>
    </div>
  );
}

/* === CONFIGURAÇÕES === */
function ConfiguracoesView() {
  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        <i className="bi bi-gear me-2 text-primary"></i>Configurações
      </h3>
      <div className="card p-4 shadow-sm border-0">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input className="form-control" defaultValue="Dr. Roberto Silva" />
          </div>
          <div className="col-md-6">
            <label className="form-label">CRM</label>
            <input className="form-control" defaultValue="12345-SP" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Especialidade</label>
            <input className="form-control" defaultValue="Clínico Geral" />
          </div>
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input className="form-control" defaultValue="dr.roberto@clinica.com.br" />
          </div>
        </div>
        <button className="btn btn-primary mt-3">
          <i className="bi bi-save me-1"></i>Salvar Alterações
        </button>
      </div>
    </div>
  );
}

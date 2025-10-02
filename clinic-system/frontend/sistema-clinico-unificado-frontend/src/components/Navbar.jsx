import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="#top">
          <i className="bi bi-hospital me-2"></i>SCU
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#visao-geral">Visão Geral</a></li>
            <li className="nav-item"><a className="nav-link" href="#motivo">O Motivo</a></li>
            <li className="nav-item"><a className="nav-link" href="#como">Como Funciona</a></li>
            <li className="nav-item"><a className="nav-link" href="#capacidades">Capacidades</a></li>
            <li className="nav-item"><a className="nav-link" href="#beneficios">Benefícios</a></li>
            <li className="nav-item"><a className="nav-link" href="#seguranca">Segurança</a></li>
            <li className="nav-item"><a className="nav-link" href="#integracoes">Integrações</a></li>
            <li className="nav-item"><a className="nav-link" href="#quem-somos">Quem Somos</a></li>
            <li className="nav-item"><a className="nav-link" href="#contato">Fale Conosco</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

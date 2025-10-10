import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark">
      <div className="container py-2">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#top">
          <img src="assets/logo.png" alt="Logo SCU" height="80" className="me-2" />
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
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><a className="nav-link" href="#solucao">Solução</a></li>
            <li className="nav-item"><a className="nav-link" href="#quem-somos">Quem Somos</a></li>
            <li className="nav-item"><a className="nav-link" href="#plataforma">Plataforma</a></li>
            <li className="nav-item"><a className="nav-link" href="#seguranca">Segurança</a></li>
            <li className="nav-item ms-lg-2">
              <a className="btn btn-demo" href="#cta">Agende uma Demonstração</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

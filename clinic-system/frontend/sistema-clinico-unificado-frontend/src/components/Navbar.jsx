import React, { useState } from "react";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => setLoginOpen((prev) => !prev);
  const closeLogin = () => setLoginOpen(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark">
      <div className="container py-2">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#top">
          <img src="assets/logo.png" alt="Logo SCU" height="80" className="me-2" />
        </a>

        {/* Botão mobile */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link" href="#solucao">Solução</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#quem-somos">Quem Somos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#plataforma">Plataforma</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#seguranca">Segurança</a>
            </li>

            {/* Botão Acessar com dropdown controlado por React */}
            <li className="nav-item dropdown ms-lg-3 position-relative">
              <button
                type="button"
                className="btn btn-outline-light px-3 py-2 fw-semibold dropdown-toggle"
                onClick={toggleLogin}
                style={{
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Acessar
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end ${loginOpen ? "show" : ""}`}
                aria-labelledby="loginDropdown"
                style={{ minWidth: "190px" }}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={closeLogin}
                  >
                    <i className="bi bi-door-open me-2 text-primary"></i>
                    Entrar
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/register"
                    onClick={closeLogin}
                  >
                    <i className="bi bi-person-plus me-2 text-success"></i>
                    Registrar
                  </a>
                </li>
              </ul>
            </li>

            {/* Botão de Demonstração */}
            <li className="nav-item ms-lg-2">
              <a className="btn btn-demo" href="#cta">
                Agende uma Demonstração
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

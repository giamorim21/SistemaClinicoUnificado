import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLogin = () => setLoginOpen((prev) => !prev);
  const closeLogin = () => setLoginOpen(false);

  /* Detecta scroll para alterar estilo */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Fecha dropdown ao clicar fora */
  useEffect(() => {
    if (!loginOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest(".scu-login-dropdown")) closeLogin();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [loginOpen]);

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top navbar-dark scu-navbar ${
        scrolled ? "scu-navbar-scrolled" : ""
      }`}
    >
      <div className="container py-1">
        {/* Logo + Nome */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#top">
          <img src="/assets/logo.png" alt="Logo SCU" height="48" />
          <div className="d-none d-md-block lh-1">
            <span className="fw-bold d-block" style={{ fontSize: "1.05rem" }}>
              SCU
            </span>
            <span className="opacity-75" style={{ fontSize: ".7rem" }}>
              Sistema Clínico Unificado
            </span>
          </div>
        </a>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-1">
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
          </ul>

          {/* Ações */}
          <div className="d-flex align-items-center gap-2 ms-lg-3">
            {/* Dropdown Acessar */}
            <div className="scu-login-dropdown position-relative">
              <button
                type="button"
                className="btn btn-outline-light btn-sm px-3 py-2 fw-semibold rounded-pill"
                onClick={toggleLogin}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Acessar
              </button>

              {loginOpen && (
                <div className="scu-dropdown-menu shadow-lg rounded-3 p-2">
                  <a
                    href="/login"
                    className="scu-dropdown-item d-flex align-items-start gap-2 rounded-2 p-2 text-decoration-none"
                    onClick={closeLogin}
                  >
                    <i className="bi bi-door-open text-primary mt-1"></i>
                    <div>
                      <span className="fw-semibold d-block text-dark">Entrar</span>
                      <small className="text-secondary">Acesse sua conta</small>
                    </div>
                  </a>
                  <a
                    href="/register"
                    className="scu-dropdown-item d-flex align-items-start gap-2 rounded-2 p-2 text-decoration-none"
                    onClick={closeLogin}
                  >
                    <i className="bi bi-person-plus text-success mt-1"></i>
                    <div>
                      <span className="fw-semibold d-block text-dark">Registrar</span>
                      <small className="text-secondary">Crie sua conta grátis</small>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Botão Demo */}
            <a className="btn btn-demo btn-sm px-3 py-2 rounded-pill" href="#cta">
              <i className="bi bi-play-circle me-1"></i>
              Demonstração
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

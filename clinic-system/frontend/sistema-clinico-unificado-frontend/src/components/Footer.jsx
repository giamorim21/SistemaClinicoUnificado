import React, { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <footer className="pt-4">
      <div className="top-line"></div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="fs-5 fw-bold text-white mb-2">SCU</div>
            <p className="small text-secondary mb-2">Sistema Clínico Unificado</p>
            <p className="small text-secondary">
              Tecnologia para uma jornada clínica mais simples, segura e eficiente.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="text-white mb-3">Navegação</h6>
            <ul className="list-unstyled small">
              <li><a href="#solucao">Solução</a></li>
              <li><a href="#quem-somos">Quem Somos</a></li>
              <li><a href="#plataforma">Plataforma</a></li>
              <li><a href="#seguranca">Segurança</a></li>
              <li><a href="#cta">Contato</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="text-white mb-3">Contato</h6>
            <ul className="list-unstyled small">
              <li><i className="bi bi-envelope me-2" /><a href="mailto:contato@scu.exemplo">contato@scu.exemplo</a></li>
              <li><i className="bi bi-telephone me-2" /><a href="#">(00) 00000-0000</a></li>
              <li><i className="bi bi-geo-alt me-2" /><span>Brasil</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-3 mt-3 border-top border-secondary">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <div className="small text-secondary">© {year} SCU. Todos os direitos reservados.</div>
            <div className="small">
              <a href="#">Termos</a> • <a href="#">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

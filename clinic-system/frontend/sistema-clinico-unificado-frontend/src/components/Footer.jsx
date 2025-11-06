import React, { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <footer className="pt-4">
      <div className="top-line"></div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Coluna 1 – Descrição */}
          <div className="col-md-4">
            <div className="fs-5 fw-bold text-white mb-2">SCU</div>
            <p className="small text-secondary mb-2">Sistema Clínico Unificado</p>
            <p className="small text-secondary">
              Tecnologia para uma jornada clínica mais simples, segura e eficiente.
            </p>
          </div>

          {/* Coluna 2 – Navegação */}
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

          {/* Coluna 3 – Contato + QR Code lateral */}
          <div className="col-md-4">
            <h6 className="text-white mb-3">Contato</h6>

            {/* Flex container para alinhar lista e QR lado a lado */}
            <div className="d-flex align-items-start">
              {/* Lista de contato */}
              <ul className="list-unstyled small mb-0">
                <li>
                  <i className="bi bi-envelope me-2" />
                  <a href="mailto:contato@scu.exemplo">contato@scu.exemplo</a>
                </li>
                <li>
                  <i className="bi bi-telephone me-2" />
                  <a href="#">(00) 00000-0000</a>
                </li>
                <li>
                  <i className="bi bi-geo-alt me-2" />
                  <span>Brasil</span>
                </li>
              </ul>

              {/* QR Code à direita com mais espaçamento */}
              <div
                className="text-center"
                style={{ marginLeft: "40px" }} // 👈 afastamento aumentado
              >
                <img
                  src="/assets/QrCode.png"
                  alt="QR Code SCU"
                  className="img-fluid"
                  style={{
                    maxWidth: "110px",
                    border: "2px solid #fff",
                    borderRadius: "8px",
                    padding: "1px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="pt-3 mt-3 border-top border-secondary">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <div className="small text-secondary">
              © {year} SCU. Todos os direitos reservados.
            </div>
            <div className="small">
              <a href="#">Termos</a> • <a href="#">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero-content text-center">
        <div className="d-inline-block mb-3">
          <span className="badge badge-pill px-3 py-2">
            Plataforma modular e acessível para clínicas
          </span>
        </div>

        <h1 className="display-5 fw-bold mb-3">
          O Fim da Burocracia na Saúde. O Início da Eficiência Clínica.
        </h1>

        <p className="lead mx-auto mb-4" style={{ maxWidth: 780 }}>
          Um ecossistema unificado que conecta cadastro do paciente, triagem
          inteligente, atendimento médico e gestão — tudo com segurança e
          conformidade.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <a href="#cta" className="btn btn-hero">Agende uma Demonstração</a>
        </div>
      </div>
    </header>
  );
}
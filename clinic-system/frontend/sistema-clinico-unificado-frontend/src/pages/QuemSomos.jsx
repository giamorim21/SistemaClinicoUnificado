import React from "react";
import Section from "../components/Section";
import Carousel from "../components/Carousel";

export default function QuemSomos() {
  return (
    <Section id="quem-somos" soft>
      <div className="row g-5 align-items-center">
        {/* Texto */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-3">Movidos pelo desafio de inovar.</h2>
          <p className="text-secondary mb-4">
            Somos um time multidisciplinar focado em simplificar a jornada clínica.
            Acreditamos que tecnologia deve reduzir atritos, elevar a experiência do
            paciente e liberar o tempo das equipes para o que realmente importa.
          </p>
          <p className="text-secondary">
            Com o SCU, unimos design, engenharia e compliance para entregar uma
            plataforma moderna, segura e acessível.
          </p>
        </div>

        {/* Carrossel */}
        <div className="col-lg-7">
          <Carousel />
        </div>
      </div>
    </Section>
  );
}

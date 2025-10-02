import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";

export default function QuemSomos() {
  return (
    <>
      <Navbar />
      <Section id="sobre">
        <div className="card shadow-soft p-4 text-center">
          <h2 className="fw-bold mb-3">Quem Somos</h2>
          <p className="mx-auto" style={{ maxWidth: 800 }}>
            Conteúdo de exemplo da página “Quem Somos”. Você pode removê-la se for usar apenas âncoras.
          </p>
        </div>
      </Section>
      <Footer />
    </>
  );
}

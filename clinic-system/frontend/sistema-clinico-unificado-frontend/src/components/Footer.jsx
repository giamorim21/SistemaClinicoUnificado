import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 border-top text-center small text-secondary">
      © <span>{year}</span> Sistema Clínico Unificado — Documento de apresentação institucional.
    </footer>
  );
}

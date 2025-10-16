import React from "react";

export default function Section({ id, soft = false, className = "", children }) {
  return (
    <section id={id} className={`section ${soft ? "section-soft" : ""} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

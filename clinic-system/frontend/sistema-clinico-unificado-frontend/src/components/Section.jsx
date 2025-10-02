import React from "react";

export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

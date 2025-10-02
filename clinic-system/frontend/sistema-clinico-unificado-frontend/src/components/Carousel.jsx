import React from "react";

export default function Carousel() {
  return (
    <section className="section" id="carrossel-imagens">
      <div className="container">
        <div id="visaoCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#visaoCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#visaoCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#visaoCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active text-center">
              <img src="/assets/1.png" className="d-block w-100 rounded-4 shadow-soft" alt="Imagem 1" />
            </div>
            <div className="carousel-item text-center">
              <img src="/assets/2.png" className="d-block w-100 rounded-4 shadow-soft" alt="Imagem 2" />
            </div>
            <div className="carousel-item text-center">
              <img src="/assets/3.png" className="d-block w-100 rounded-4 shadow-soft" alt="Imagem 3" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#visaoCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#visaoCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <img src="/src/assets/logo-upchiapas.png" alt="Universidad Politécnica de Chiapas" className="footer-logo" />
      </div>

      <div className="footer-center">
        <p>Carretera Tuxtla Gutiérrez - Portillo Zaragoza Km 21+500<br />
          Col. Las Brisas; Suchiapa, Chiapas. CP 29150. Teléfono: 01961 61 71460<br />
          Suchiapa, Chiapas.
        </p>
      </div>

      <div className="footer-right">
        <img src="/src/assets/logo-secreducacion.png" alt="Secretaría de Educación" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;

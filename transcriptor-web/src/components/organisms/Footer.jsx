// src/components/organisms/Footer.jsx
import React from 'react';
import LogoUP from '../atoms/LogoUP'; // El logo de la Universidad Politécnica
import LogoSE from '../atoms/LogoSE'; // El logo de la Secretaría de Educación
import styles from '../../assets/style/Footer.module.css'; // Estilos para el footer

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.logoContainer}>
      <LogoUP />
    </div>
    <div className={styles.infoContainer}>
      <p>Carretera Tuxtla Gutiérrez - Portillo Zaragoza Km 21+500</p>
      <p>Col. Las Brisas, Suchiapa, Chiapas. CP.29150. Teléfono: 01961 61 71460. Suchiapa, Chiapas.</p>
    </div>
    <div className={styles.logoContainer}>
      <LogoSE />
    </div>
  </footer>
);

export default Footer;

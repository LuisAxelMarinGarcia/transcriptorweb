// src/components/atoms/Logo.jsx
import React from 'react';
import logo from '../../assets/imgs/logo.png'; // Ruta al archivo del logo
import styles from '../../assets/style/LogoTranscribeme.module.css'; // Los estilos específicos del logo

const Logo = ({ className }) => (
  <img src={logo} alt="Transcribeme" className={`${styles.logo} ${className}`} />
);

export default Logo;
// src/components/atoms/LogoSE.jsx
import React from 'react';
import logoSE from '../../assets/imgs/LogoSE.png'; // Ruta al logo de la Secretaría de Educación
import styles from '../../assets/style/LogoSE.module.css'; // Estilos para el logo

const LogoSE = () => <img src={logoSE} alt="Secretaría de Educación" className={styles.logo} />;

export default LogoSE;

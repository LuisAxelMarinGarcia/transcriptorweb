// src/components/atoms/LogoUP.jsx
import React from 'react';
import logoUP from '../../assets/imgs/LogoUP.png'; // Ruta al logo de la Universidad Politécnica
import styles from '../../assets/style/LogoUP.module.css'; // Estilos para el logo

const LogoUP = () => <img src={logoUP} alt="Universidad Politécnica de Chiapas" className={styles.logo} />;

export default LogoUP;

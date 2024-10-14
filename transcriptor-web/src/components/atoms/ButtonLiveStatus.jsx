import React from 'react';
import styles from '../../assets/style/ButtonLiveStatus.module.css';  // Creamos un archivo CSS para los estilos del botón

const ButtonLiveStatus = ({ label = "Transcripción en vivo...", icon = "🟢" }) => (
  <button className={styles.liveButton}>
    {label} <span className={styles.liveIcon}>{icon}</span>
  </button>
);

export default ButtonLiveStatus;

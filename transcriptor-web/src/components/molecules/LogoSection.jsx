import React from 'react';
import styles from './LogoSection.module.css';
import logo from '../../assets/imgs/LogoTranscribeme.png';
import pngImage from '../../assets/imgs/UserImage.png'; // Ruta de tu imagen

const LogoSection = () => {
  return (
    <div className={styles.logoSection}>
      <img src={logo} alt="Logo Transcribeme" className={styles.logo} />
      <img src={pngImage} alt="Imagen decorativa" className={styles.image} />
    </div>
  );
};

export default LogoSection;

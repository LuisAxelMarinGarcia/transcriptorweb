import React from 'react';
import styles from '../../assets/style/Login.module.css'; 
import logo from '../../assets/imgs/logo.png';
import userImage from '../../assets/imgs/Student Deco.png';

const LogoSection = () => {
  return (
    <div className={styles['right-side']}>
      <img src={logo} alt="Logo Transcribeme" className={styles.logo} />
      <img src={userImage} alt="Imagen Usuario" />
    </div>
  );
};

export default LogoSection;
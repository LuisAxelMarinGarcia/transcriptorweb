import React from 'react';
import Logo from '../atoms/LogoTranscribeme'; 
import Avatar from '../atoms/AvatarPerfil';
import ButtonLiveStatus from '../atoms/ButtonLiveStatus'; // Importamos el átomo del botón
import styles from '../../assets/style/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logoContainer}>
      <Logo />
    </div>
    <div className={styles.statusContainer}>
      <ButtonLiveStatus />
      <Avatar size="medium" />
    </div>
  </header>
);

export default Header;

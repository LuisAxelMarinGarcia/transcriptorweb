import React from 'react';
import avatar from '../../assets/imgs/Avatar.png'; // Ruta de la imagen de avatar
import styles from '../../assets/style/Avatar.module.css'; //

const Avatar = ({ className, size = 'medium' }) => (
  <img src={avatar} alt="Avatar" className={`${styles.avatar} ${styles[size]} ${className}`} />
);

export default Avatar;

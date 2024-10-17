import React from 'react';
import styles from '../../assets/styles/IconLogin.module.css';

const Icon = ({ src, alt, size = '24px' }) => (
  <img 
    src={src} 
    alt={alt} 
    className={styles.icon} 
    style={{ width: size, height: size }} 
  />
);

export default Icon;

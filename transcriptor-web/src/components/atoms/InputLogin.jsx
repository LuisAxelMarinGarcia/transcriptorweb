import React from 'react';
import styles from '../../assets/style/InputLogin.module.css';

const Input = ({ type, placeholder, icon }) => (
  <div className={styles.inputWrapper}>
    <img src={icon} alt="icon" className={styles.icon} />
    <input type={type} placeholder={placeholder} className={styles.input} />
  </div>
);

export default Input;

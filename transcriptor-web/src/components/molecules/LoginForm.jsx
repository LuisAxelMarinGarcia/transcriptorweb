import React from 'react';
import styles from './LoginForm.module.css';
import Input from '../atoms/InputLogin';
import Button from '../atoms/ButtonLogin';
import Icon from '../atoms/IconLogin'; 

const LoginForm = ({ userType }) => {
  return (
    <div className={styles.loginForm}>
      <div className={styles.tabs}>
        <div className={userType === 'student' ? styles.active : ''}>Estudiante</div>
        <div className={userType === 'teacher' ? styles.active : ''}>Docente</div>
      </div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <Icon name="userIcon" />
          <Input type="text" placeholder="Usuario" />
        </div>
        <div className={styles.inputContainer}>
          <Icon name="passwordIcon" />
          <Input type="password" placeholder="Contraseña" />
        </div>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <Button label="Iniciar sesión" />
      </form>
    </div>
  );
};

export default LoginForm;

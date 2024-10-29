// src/pages/LoginDocentePage.jsx
import React, { useState } from 'react';
import LoginTemplate from '../../templates/LoginTemplate';
import TeacherForm from '../../molecules/Login/LoginFormDocent';  // Asegúrate de que exista este componente
import styles from '../../../assets/style/Login.module.css';  // Importa los estilos

const LoginDocentePage = () => {
  const [isStudent, setIsStudent] = useState(false);  // Predeterminamos "Docente"

  return (
    <div className={styles['login-page']}>
      <LoginTemplate isStudent={isStudent} setIsStudent={setIsStudent}>
        <TeacherForm />
      </LoginTemplate>
    </div>
  );
};

export default LoginDocentePage;

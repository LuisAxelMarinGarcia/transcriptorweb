// src/pages/LoginStudentPage.jsx
import React, { useState } from 'react';
import LoginTemplate from '../../templates/LoginTemplate';
import StudentForm from '../../molecules/Login/LoginFormStudent';  // Asegúrate de que exista este componente
import styles from '../../../assets/style/Login.module.css';  // Importa los estilos

const LoginStudentPage = () => {
  const [isStudent, setIsStudent] = useState(true);

  return (
    <div className={styles['login-page']}>
      <LoginTemplate isStudent={isStudent} setIsStudent={setIsStudent}>
        <StudentForm />
      </LoginTemplate>
    </div>
  );
};

export default LoginStudentPage;

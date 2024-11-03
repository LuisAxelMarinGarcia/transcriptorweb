import studentIcon from '../../../assets/imgs/IconStudentLogin.png'; 
import teacherIcon from '../../../assets/imgs/IconDocente.png'; 
import React, { useState } from 'react';

import iconLock from '../../../assets/imgs/IconLock.png'; 
import iconUser from '../../../assets/imgs/IconUser.png'; 
import styles from '../../../assets/style/LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

const LoginFormEstudiante = ({ onSwitchForm }) => {

    const [activeButton, setActiveButton] = useState('estudiante');
    const navigate = useNavigate(); // Agrega el hook de navegación

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'estudiante') {
            setIsAlumno(true);
            navigate('/login-estudiante'); // Navega a la ruta de estudiante
        } else if (button === 'docente') {
            setIsAlumno(false);
            navigate('/login-docente'); // Navega a la ruta de docente
        }
    };

    return (
        <div className={styles['left-side']}>
          {/* Contenedor del formulario */}
          <div className={styles['form-container']}>
            {/* Selector de tipo de usuario */}
            <div className={styles['user-type-selector']}>
                    <button className={styles.activeButton}>
                        <img src={studentIcon} alt="Ícono Estudiante" className={styles.icon} />
                        Estudiante
                    </button>

                    <button  onClick={onSwitchForm}>
                        <img src={teacherIcon} alt="Ícono Docente" className={styles.icon} />
                        Docente
                    </button>
            </div>

              {/* Campo de usuario con ícono alineado a la izquierda */}
              <div className={styles['form-field']}>
                <img src={iconUser} alt="Ícono de Usuario" className={styles['input-icon']} />
                <input type="text" id="username" name="username" placeholder="Usuario" />
              </div>

              {/* Campo de contraseña con ícono alineado a la izquierda */}
              <div className={styles['form-field']}>
                <img src={iconLock} alt="Ícono de Contraseña" className={styles['input-icon']} />
                <input type="password" id="password" name="password" placeholder="Contraseña" />
              </div>
              
              {/* Enlace de "Olvidaste tu contraseña" */}
              <a href="#" className={styles['msj-olvidaste']} >¿Olvidaste tu contraseña?</a>

          </div>

          {/* Botón de inicio de sesión fuera del contenedor del formulario */}
          <div className={styles['submit-button-container']}>
            <button className={styles['submit-button']}>
                Iniciar sesión
            </button>
          </div>
        </div>
      
    );
  };
  
  export default LoginFormEstudiante;
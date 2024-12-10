// src/components/pages/Estudiante/LoginFormEstudiante.jsx
import React, { useState } from 'react';
import studentIcon from '../../../assets/imgs/IconStudentLogin.png';
import teacherIcon from '../../../assets/imgs/IconDocente.png';
import iconLock from '../../../assets/imgs/IconLock.png';
import iconUser from '../../../assets/imgs/IconUser.png';
import styles from '../../../assets/style/LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

const LoginFormEstudiante = ({ onSwitchForm }) => {
  // Estados para los campos de entrada
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar errores
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Estado para el botón activo
  const [activeButton, setActiveButton] = useState('estudiante');

  // Función para manejar el cambio de tipo de usuario
  const handleButtonClick = (button) => {
    console.log(`[LoginFormEstudiante.jsx] Cambiando a formulario de ${button}`);
    setActiveButton(button);
    if (button === 'docente') {
      onSwitchForm(); // Cambia al formulario de docente
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[LoginFormEstudiante.jsx] Enviando formulario de login con:', { email, password });

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('[LoginFormEstudiante.jsx] Respuesta recibida:', response);

      const data = await response.json();

      console.log('[LoginFormEstudiante.jsx] Datos recibidos del backend:', data);

      if (response.ok && data.success) {
        const { token, role, id, email: userEmail } = data.data;

        console.log('[LoginFormEstudiante.jsx] Datos de usuario:', { token, role, id, userEmail });

        // Verificar si el rol es 'ESTUDIANTE'
        if (role === 'ESTUDIANTE') {
          // Almacenar token y datos del usuario en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
          localStorage.setItem('userEmail', userEmail);

          console.log('[LoginFormEstudiante.jsx] Usuario autenticado como ESTUDIANTE. Redirigiendo a /home-estudiante');

          navigate('/home-estudiante'); // Ruta para estudiantes
        } else {
          setError('No tienes acceso desde este formulario. Por favor, inicia sesión desde el formulario correspondiente.');
          console.warn('[LoginFormEstudiante.jsx] Usuario con rol no autorizado para este formulario.');
        }
      } else {
        setError(data.message || 'Error al iniciar sesión');
        console.error('[LoginFormEstudiante.jsx] Error al iniciar sesión:', data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className={styles['left-side']}>
      {/* Contenedor del formulario */}
      <form className={styles['formContainer']} onSubmit={handleSubmit}>
        <div className={styles['login-form-container']}>
          {/* Selector de tipo de usuario */}
          <div className={styles['user-type-selector']}>
            <button
              type="button"
              onClick={() => handleButtonClick('estudiante')}
              className={activeButton === 'estudiante' ? styles.activeButton : ''}
            >
              <img src={studentIcon} alt="Ícono Estudiante" className={styles.icon} />
              Estudiante
            </button>

            <button
              type="button"
              onClick={() => handleButtonClick('docente')}
              className={activeButton === 'docente' ? styles.activeButton : ''}
            >
              <img src={teacherIcon} alt="Ícono Docente" className={styles.icon} />
              Docente
            </button>
          </div>

          {/* Campo de email con ícono alineado a la izquierda */}
          <div className={styles['form-field']}>
            <img src={iconUser} alt="Ícono de Usuario" className={styles['input-icon']} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              className={styles.inputLogin}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de contraseña con ícono alineado a la izquierda */}
          <div className={styles['form-field']}>
            <img src={iconLock} alt="Ícono de Contraseña" className={styles['input-icon']} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              className={styles.inputLogin}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && <p className={styles['error-message']}>{error}</p>}

          {/* Enlace de "Olvidaste tu contraseña" */}
          <a href="#" className={styles['msj-olvidaste']}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón de inicio de sesión fuera del contenedor del formulario */}
        <div className={styles['submit-button-container']}>
          <button type="submit" className={styles['submit-button']}>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginFormEstudiante;

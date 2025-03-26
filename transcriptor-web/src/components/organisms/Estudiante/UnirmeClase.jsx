// src/components/organisms/Estudiante/UnirmeClase.jsx

import React, { useState } from 'react';
import styles from '../../../assets/style/Estudiante/UnirmeAClase.module.css';
import UserDeco from '../../../assets/imgs/UserDeco.png';
import { useNavigate } from 'react-router-dom';

const UnirmeClase = () => {
  const [codigoClase, setCodigoClase] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manejar el cambio en el input
  const handleInputChange = (e) => {
    setCodigoClase(e.target.value);
  };

  // Manejar el clic en el botón "Unirse"
  const handleUnirse = async () => {
    setLoading(true);
    setMensaje('');
    setError('');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      setLoading(false);
      return;
    }

    // Validar el código ingresado
    const codigoValido = /^[a-zA-Z0-9]{5,8}$/.test(codigoClase);
    if (!codigoValido) {
      setError('El código ingresado no es válido. Debe tener entre 5 y 8 caracteres alfanuméricos sin espacios ni símbolos.');
      setLoading(false);
      return;
    }

    // Log para depurar
    /*console.log('Intentando unirse a la clase con:', {
      userId: userId,
      code: codigoClase,
    });*/

    try {
      const response = await fetch('/user-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          code: codigoClase,
        }),
      });

      const data = await response.json();

      // Log para depurar
      //console.log('Respuesta del servidor:', data);

      if (response.ok) {
        setMensaje('Te has unido a la clase exitosamente.');
        // Redirigir al usuario a la página principal después de unirse
        setTimeout(() => {
          navigate('/home-estudiante');
        }, 2000);
      } else {
        setError(data.message || 'Error al unirse a la clase.');
      }
    } catch (err) {
      console.error('[UnirmeClase.jsx] Error al unirse a la clase:', err);
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.ContainerCodigo}>
        <div className={styles.TitleContainer}>
          <h1>Unirse a clase</h1>
        </div>
        <div className={styles.ContentContainer}>
          <p className={styles.etiquetaP1}>
            Pídele a tu profesor el código de clase e introdúcelo aquí.
          </p>
          <input
            type="text"
            placeholder="Código de clase"
            className={styles.InputCodigo}
            value={codigoClase}
            onChange={handleInputChange}
          />
          <p className={styles.etiquetaP2}>
            Ingresa un código de 5 a 8 caracteres alfanuméricos, sin espacios ni símbolos.
          </p>
          {mensaje && <p className={styles.successMessage}>{mensaje}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button
            className={styles.buttonUnirme}
            onClick={handleUnirse}
            disabled={loading}
          >
            {loading ? 'Uniendo...' : 'Unirse'}
          </button>
        </div>
      </div>

      <div className={styles.ContainerUserDecoration}>
        <img src={UserDeco} alt="Decoración de usuario" />
      </div>
    </>
  );
};

export default UnirmeClase;

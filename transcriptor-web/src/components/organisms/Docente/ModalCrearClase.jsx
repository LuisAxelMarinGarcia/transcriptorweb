// src/components/organisms/Docente/ModalCrearClase.jsx

import React, { useState } from 'react';
import styles from '../../../assets/style/Docente/ModalCrearClase.module.css';
import IconCreate from '../../../assets/imgs/CrearClase.png';

const ModalCrearClase = ({ show, onClose, onClassCreated }) => {
  const [className, setClassName] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para formatear la fecha en dd-mm-yy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-based
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Obtener datos de localStorage
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    /*console.log('[ModalCrearClase.jsx] Datos de localStorage:', {
      userId,
      email,
      token,
    });*/

    if (!userId || !email || !token) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      //console.log('[ModalCrearClase.jsx] Usuario no autenticado.');
      setIsSubmitting(false);
      return;
    }

    // Formatear la fecha
    const formattedDate = formatDate(new Date());
    //console.log('[ModalCrearClase.jsx] Fecha formateada:', formattedDate);

    // Crear la carga útil para la petición
    const payload = {
      name: className,
      teacher: email,
      group: grupo,
      grade: grado,
      date: formattedDate, // Formato dd-mm-yy
      userId: userId,
    };

    //console.log('[ModalCrearClase.jsx] Payload a enviar:', payload);

    try {
      const response = await fetch('/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluir el token en el header
        },
        body: JSON.stringify(payload),
      });

      //console.log('[ModalCrearClase.jsx] Respuesta del fetch:', response);

      const data = await response.json();
      //console.log('[ModalCrearClase.jsx] Datos recibidos del backend:', data);

      if (response.ok) {
        //console.log('[ModalCrearClase.jsx] Clase creada exitosamente:', data.data);

        // Asegurarse de que la clase tenga todas las propiedades necesarias
        const nuevaClase = {
          classId: data.data.classId || data.data.id, // Ajusta según la propiedad correcta
          className: data.data.name || className,
          classNumberOfStudents: data.data.numberOfStudents || 0, // Suponiendo que inicialmente no tiene estudiantes
          teacherName: email || 'Docente', // Usamos el email como identificador del docente
          classStatus: data.data.status || 'NO ARCHIVADO',
        };

        //console.log('[ModalCrearClase.jsx] Nueva clase enriquecida:', nuevaClase);

        // Notificar al componente padre que se creó una nueva clase
        if (onClassCreated) onClassCreated(nuevaClase);

        // Limpiar los campos del formulario
        setClassName('');
        setGrado('');
        setGrupo('');

        // Cerrar el modal
        onClose();
      } else {
        console.error(
          '[ModalCrearClase.jsx] Error en la respuesta del backend:',
          data.message
        );
        setError(data.message || 'Error al crear la clase');
      }
    } catch (err) {
      console.error('[ModalCrearClase.jsx] Error al crear la clase:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modalFondo}>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>
          <i className="fas fa-book"></i> Crear Clase
          <img src={IconCreate} alt="Icon-Home" className={styles.IconCrear} />
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="className"
            placeholder="Nombre de la clase:"
            className={styles.inputText}
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <select
            name="grado"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            required
            className={styles.select}
          >
            <option value="" disabled hidden>
              Cuatrimestre:
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            name="grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            required
            className={styles.select}
          >
            <option value="" disabled hidden>
              Grupo:
            </option>
            {['A', 'B', 'C', 'D'].map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </select>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.modalActions}>
            <button
              type="submit"
              className={styles.createButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearClase;

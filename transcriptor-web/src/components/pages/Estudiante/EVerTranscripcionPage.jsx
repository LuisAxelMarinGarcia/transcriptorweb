// src/components/pages/Estudiante/ETranscripcionesClasePage.jsx
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EVerTranscripcion from '../../templates/Estudiante/EVerTranscripcion';
import styles from '../../../assets/style/Estudiante/VerTranscripcion.module.css';

const EVerTranscripcionPage = () => {
  const { classId } = useParams(); // Obtiene classId de la URL
  const location = useLocation();
  const { state } = location;

  // Verificar si los datos de la clase están disponibles en el estado
  if (!state || !state.classId) {
    console.error('[ETranscripcionesClasePage.jsx] No se proporcionaron datos de la clase en el estado de navegación.');
    // Opcional: Redirigir al usuario a la página principal o mostrar un mensaje de error
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { name, students, teacherName, status } = state;

  /*console.log('[ETranscripcionesClasePage.jsx] Datos recibidos del estado:', {
    name,
    students,
    teacherName,
    status,
  });*/

  return (
    <EVerTranscripcion
      title={`${name}`}
      studentCount={students}
      teacherName={teacherName}
      classId={classId} // Pasar classId (UUID)
    />
  );
};

export default EVerTranscripcionPage;

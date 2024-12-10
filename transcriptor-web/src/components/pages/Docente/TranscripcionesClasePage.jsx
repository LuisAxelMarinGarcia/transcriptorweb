import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TranscripcionesClaseDocente from '../../templates/Maestro/TranscripcionesClaseTemplate';
import styles from '../../../assets/style/Docente/ClaseHome.module.css';

const TranscripcionesClasePage = () => {
  const { classId } = useParams(); // Obtener classId desde la URL
  const location = useLocation();
  const { state } = location; // Obtener el estado de la navegación

  // Verificar si los datos de la clase están disponibles en el estado
  if (!state || !state.classId || !state.status) {
    console.error('[TranscripcionesClasePage.jsx] No se proporcionaron datos de la clase en el estado de navegación.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { name, students, teacherName, classGroup, classCode, status } = state;

  console.log('[TranscripcionesClasePage.jsx] Datos recibidos del estado:', {
    name,
    students,
    teacherName,
    classGroup,
    classCode,
    status,
  });

  return (
    <TranscripcionesClaseDocente
      title={`${name} - Grupo ${classGroup}`} // Usar classGroup en lugar de status
      studentCount={students}
      codeClass={classCode} // Usar classCode en lugar de classId
      classId={classId}     // Asegúrate de pasar el classId (UUID)
      name={name}           // Pasa el nombre de la clase
      teacherName={teacherName} // Pasa el nombre del profesor
      classGroup={classGroup}   // Pasa el grupo de la clase
      status={status}       // Pasa el status para que se use en la llamada a la API
    />
  );
};

export default TranscripcionesClasePage;

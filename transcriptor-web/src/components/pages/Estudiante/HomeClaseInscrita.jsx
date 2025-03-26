import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EHomeMateria from '../../templates/Estudiante/EHomeMateria';
import styles from '../../../assets/style/Estudiante/TemplateHomeClase.module.css';

const EstudianteHomeMateria = () => {
  const { classId } = useParams(); // Obtiene classId de la URL
  const location = useLocation();
  const { state } = location;

  //console.log('[EstudianteHomeMateria.jsx] classId de useParams():', classId);
  //console.log('[EstudianteHomeMateria.jsx] Datos recibidos del estado:', state);

  // Verificar que classId está definido
  if (!classId) {
    console.error('[EstudianteHomeMateria.jsx] classId es undefined.');
    return <p className={styles.errorMessage}>Error: classId no está definido.</p>;
  }

  // Verificar si los datos esenciales están en el estado
  if (!state || !state.name || !state.students || !state.teacherName) {
    console.error('[EstudianteHomeMateria.jsx] Faltan datos esenciales en el estado.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos esenciales de la clase.</p>;
  }

  

  const { name, students, teacherName, status, classStatus } = state;

  // Si no se define status, asume que es "NO ARCHIVADO"
  const effectiveStatus = status ? status : 'NO ARCHIVADO';
  
  // Luego normalizas el estado
  const normalizedStatus = effectiveStatus === "NO ARCHIVADO" ? "DISPONIBLE" : effectiveStatus;
  

  return (
    <EHomeMateria
      title={name}
      studentCount={students}
      teacherName={teacherName}
      classId={classId}
      status={normalizedStatus}
      classStatus={classStatus} // Estado normalizado
    />
  );
};

export default EstudianteHomeMateria;

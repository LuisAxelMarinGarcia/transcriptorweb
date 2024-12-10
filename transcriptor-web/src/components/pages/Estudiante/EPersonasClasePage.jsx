// src/components/pages/Estudiante/EPersonasClasePage.jsx
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EPersonasClase from '../../templates/Estudiante/EPersonasClaseTemplate';
import styles from '../../../assets/style/Estudiante/TemplatePersonasClase.module.css';

const EPersonasClasePage = () => {
  const { classId } = useParams(); // Obtiene classId de la URL
  const location = useLocation();
  const { state } = location;

  console.log('[EPersonasClasePage.jsx] classId de useParams():', classId);
  console.log('[EPersonasClasePage.jsx] Datos recibidos del estado:', state);

  // Verificar que classId está definido
  if (!classId) {
    console.error('[EPersonasClasePage.jsx] classId es undefined.');
    return <p className={styles.errorMessage}>Error: classId no está definido.</p>;
  }

  // Verificar si los datos de la clase están disponibles en el estado
  // Solo requerimos name, students y teacherName
  if (!state || 
      !state.name || 
      !state.students || 
      !state.teacherName) {
    console.error('[EPersonasClasePage.jsx] No se proporcionaron todos los datos de la clase en el estado de navegación.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { name, students, teacherName, classGroup, classCode } = state;

  console.log('[EPersonasClasePage.jsx] Datos desestructurados:', { name, students, teacherName, classGroup, classCode });

  return (
    <EPersonasClase
      title={name}
      studentCount={students}
      teacherName={teacherName}
      classId={classId}            // Pasar classId (UUID)
      classGroup={classGroup}      // Puede ser undefined
      codeClass={classCode}        // Puede ser undefined
    />
  );
};

export default EPersonasClasePage;

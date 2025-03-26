// src/components/pages/Estudiante/EMaterialDidacticoPage.jsx

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EMaterialDidacticoTemplate from '../../templates/Estudiante/EMaterialDidacticoTemplate';
import styles from '../../../assets/style/Estudiante/TemplateHomeClase.module.css';

const EMaterialDidacticoPage = () => {
  const { classId } = useParams(); // Obtiene classId de la URL
  const location = useLocation();
  const { state } = location;

  //console.log('[EMaterialDidacticoPage.jsx] classId de useParams():', classId);
  //console.log('[EMaterialDidacticoPage.jsx] Datos recibidos del estado:', state);

  // Verificar que classId está definido
  if (!classId) {
    console.error('[EMaterialDidacticoPage.jsx] classId es undefined.');
    return <p className={styles.errorMessage}>Error: classId no está definido.</p>;
  }

  // Verificar si los datos esenciales están en el estado
  if (!state || !state.name || !state.students || !state.teacherName) {
    console.error('[EMaterialDidacticoPage.jsx] Faltan datos esenciales en el estado.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos esenciales de la clase.</p>;
  }

  const { name, students, teacherName, status, classGroup, codeClass } = state;

  // Si no se define status, asume que es "NO ARCHIVADO"
  const effectiveStatus = status ? status : 'NO ARCHIVADO';
  
  // Luego normalizas el estado
  const normalizedStatus = effectiveStatus === "NO ARCHIVADO" ? "DISPONIBLE" : effectiveStatus;

  //console.log('[EMaterialDidacticoPage.jsx] Datos desestructurados y normalizados:', { name, students, teacherName, normalizedStatus });

  return (
    <EMaterialDidacticoTemplate
      title={name}
      studentCount={students}
      teacherName={teacherName}
      classId={classId}
      status={normalizedStatus} // Estado normalizado
      classGroup={classGroup}   // Opcional: pasar si está disponible
      codeClass={codeClass}     // Opcional: pasar si está disponible
    />
  );
};

export default EMaterialDidacticoPage;

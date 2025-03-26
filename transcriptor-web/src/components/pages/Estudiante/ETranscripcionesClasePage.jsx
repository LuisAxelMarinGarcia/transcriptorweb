// src/components/pages/Estudiante/ETranscripcionesClasePage.jsx

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EVerTranscripcion from '../../templates/Estudiante/EVerTranscripcion';
import styles from '../../../assets/style/Estudiante/VerTranscripcion.module.css';

const ETranscripcionesClasePage = () => {
  const { classId } = useParams(); // Obtiene classId de la URL
  const location = useLocation();
  const { state } = location;

  //console.log('[ETranscripcionesClasePage.jsx] classId de useParams():', classId);
  //console.log('[ETranscripcionesClasePage.jsx] Datos recibidos del estado:', state);

  // Verificar que classId está definido
  if (!classId) {
    console.error('[ETranscripcionesClasePage.jsx] classId es undefined.');
    return <p className={styles.errorMessage}>Error: classId no está definido.</p>;
  }

  // Verificar si los datos esenciales de la clase están disponibles en el estado
  // Solo requerimos name, students y teacherName. 'status' es opcional.
  if (!state || 
      !state.name || 
      !state.students || 
      !state.teacherName) {
    console.error('[ETranscripcionesClasePage.jsx] No se proporcionaron todos los datos esenciales de la clase en el estado de navegación.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos esenciales de la clase.</p>;
  }

  const { name, students, teacherName, status, classGroup, codeClass } = state;

  //console.log('[ETranscripcionesClasePage.jsx] Datos desestructurados:', { name, students, teacherName, status, classGroup, codeClass });

  return (
    <EVerTranscripcion
      title={name}
      studentCount={students}
      teacherName={teacherName}
      classId={classId}           // Pasar classId (UUID)
      status={status}             // Puede ser undefined
      classGroup={classGroup}     // Opcional: pasar si está disponible
      codeClass={codeClass}       // Opcional: pasar si está disponible
      typeFilter="TRANSCRIPCION"   // Filtrar para mostrar solo transcripciones
    />
  );
};

export default ETranscripcionesClasePage;

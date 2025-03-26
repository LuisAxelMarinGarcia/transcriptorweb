// MaterialDidacticoPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import MaterialDidactico from '../../templates/Maestro/MaterialDidacticoTemplate';
import styles from '../../../assets/style/Docente/ClaseHome.module.css';

const MaterialDidacticoPage = () => {
  const location = useLocation();
  const { state } = location;

  //console.log('[MaterialDidacticoPage] Estado recibido:', state);

  if (!state || !state.classId || !state.materialStatus) { // Añadido check para materialStatus
    console.error('[MaterialDidacticoPage] No se proporcionaron datos de la clase en el estado de navegación.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { classId, name, students, teacherName, classGroup, classCode, materialStatus, classStatus } = state;

  const finalClassStatus = classStatus || 'NO ARCHIVADO';

  /*console.log('[MaterialDidacticoPage] Datos de clase:', {
    classId,
    name,
    students,
    teacherName,
    classGroup,
    classCode,
    materialStatus,
    classStatus
  });*/

  return (
    <MaterialDidactico
      title={`${name} - Grupo ${classGroup}`}
      studentCount={students}
      codeClass={classCode}
      classId={classId}
      name={name}
      teacherName={teacherName}
      classGroup={classGroup}
      materialStatus={materialStatus}
      classStatus={finalClassStatus}
      typeFilter="MATERIAL" // Agregado: Para filtrar materiales
    />
  );
};

export default MaterialDidacticoPage;

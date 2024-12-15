import React from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import CrearMaterial from '../../templates/Maestro/CrearMaterialTemplate';

const MaterialDidacticoPage = () => {
  // Aquí se usa `useLocation` para obtener el estado pasado desde la navegación
  const location = useLocation();
  const { state } = location;

  console.log('[MaterialDidacticoPage] Estado recibido:', state);

  if (!state || !state.classId) {
    console.error('[MaterialDidacticoPage] No se proporcionaron datos de la clase en el estado de navegación.');
    return <p>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { classId, name, students, teacherName, classGroup, classCode } = state;

  console.log('[MaterialDidacticoPage] Datos de clase:', {
    classId,
    name,
    students,
    teacherName,
    classGroup,
    classCode
  });

  return (
    <CrearMaterial
      title={name}         // Usar name de la clase
      studentCount={students}  // Usar cantidad de estudiantes
      codeClass={classCode}    // Usar código de clase
      classId={classId}        // Usar classId
      name={name}              // Usar nombre de la clase
      teacherName={teacherName}  // Usar nombre del profesor
      classGroup={classGroup}    // Usar grupo de clase
    />
  );
};

export default MaterialDidacticoPage;

import React from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import CrearMaterial from '../../templates/Maestro/CrearMaterialTemplate';

const CrearMaterialPage = () => {
  // Aquí se usa `useLocation` para obtener el estado pasado desde la navegación
  const location = useLocation();
  const { state } = location;

  //console.log('[CrearMaterial] Estado recibido:', state);

  if (!state || !state.classId) {
    console.error('[CrearMaterial] No se proporcionaron datos de la clase en el estado de navegación.');
    return <p>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { classId, name, students, teacherName, classGroup, classCode } = state;

  /*console.log('[CrearMaterial] Datos de clase:', {
    classId,
    name,
    students,
    teacherName,
    classGroup,
    classCode
  });*/

  return (
    <CrearMaterial
      // Eliminar el paso de 'title' como el nombre de la clase
      // title={name}
      studentCount={students}  // Usar cantidad de estudiantes
      codeClass={classCode}    // Usar código de clase
      classId={classId}        // Usar classId
      className={name}         // Pasar el nombre de la clase como 'className' si es necesario
      teacherName={teacherName}  // Usar nombre del profesor
      classGroup={classGroup}    // Usar grupo de clase
    />
  );
};

export default CrearMaterialPage;

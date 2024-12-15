// src/components/pages/Docente/DocenteHomeMateria.jsx

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';  
import HomeMateria from '../../templates/Maestro/HomeMateria';

const DocenteHomeMateria = () => {
  const { classId: paramClassId } = useParams();
  const location = useLocation();
  const { state } = location || {};

  // Extraemos los datos del estado, si existen
  const {
    classId = paramClassId,   // Si no viene en el state, usamos el de la URL
    name = 'Clase sin nombre', 
    students = 0, 
    teacherName = 'Docente no especificado', 
    classGroup = 'Grupo no especificado', 
    classCode = 'Código no disponible', 
    classStatus = 'NO ARCHIVADO'     // Valor por defecto si no se provee
  } = state || {};

  // Log opcional, para verificar qué datos llegaron
  console.log('[DocenteHomeMateria.jsx] Datos recibidos del estado o defaults:', {
    name,
    students,
    teacherName,
    classGroup,
    classCode,
    classStatus,
    classId
  });

  return (
    <HomeMateria
      title={`${name} - Grupo ${classGroup}`}
      studentCount={students}
      codeClass={classCode}
      classId={classId}
      name={name}
      teacherName={teacherName}
      classGroup={classGroup}
      classStatus={classStatus} // Pasar classStatus como prop
    />
  );
};

export default DocenteHomeMateria;

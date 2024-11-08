import React from 'react';
import EPersonasClase from '../../templates/Estudiante/EPersonasClaseTemplate';

const EPersonasClasePage = () => {
  return (
    <EPersonasClase
        title="7B - Minería de datos"
        studentCount={30}
        teacherName="Horacio Hiram Sólis Cisneros"
    />
    
  );
};

export default EPersonasClasePage;
import React from 'react';
import CrearMaterial from '../../templates/Maestro/CrearMaterialTemplate';

const CrearMaterialPage = () => {
  const title = "Minería de datos";
  const nameTeacher = "Horacio Solis Cisneros";

  return (
    <CrearMaterial
        title={title}
        nameTeacher={nameTeacher}
      />
  );
};

export default CrearMaterialPage;

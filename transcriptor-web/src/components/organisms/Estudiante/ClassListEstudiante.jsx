// src/components/organisms/Estudiante/ClassListEstudiante.jsx

import React from 'react';
import ECardMateria from './ECardMateria'; // Asegúrate de que la ruta es correcta
import styles from '../../../assets/style/ClassList.module.css';

function ClassListEstudiante({ classes, onStatusChange, onDelete }) {
  console.log('[ClassListEstudiante.jsx] onStatusChange:', onStatusChange);
  console.log('[ClassListEstudiante.jsx] onDelete:', onDelete);
  console.log('[ClassListEstudiante.jsx] Clases recibidas:', classes);

  if (!classes || classes.length === 0) {
    return <p>No hay clases para mostrar.</p>;
  }

  return (
    <div className={styles.classList}>
      {classes.map((classItem) => {
        // Combina el nombre y el apellido del profesor
        const teacherFullName = `${classItem.teacherName} ${classItem.teacherSurname}`.trim();

        return (
          <ECardMateria
            key={classItem.classId}
            classId={classItem.classId}
            name={classItem.className}
            students={classItem.classNumberOfStudents}
            teacherName={teacherFullName} 
            status={classItem.status || 'NO ARCHIVADO'}
            classStatus={classItem.classStatus || 'NO ARCHIVADO'}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default ClassListEstudiante;

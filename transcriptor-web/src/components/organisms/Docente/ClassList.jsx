// src/components/organisms/Docente/ClassList.jsx

import React from 'react';
import CardMateria from './CardMateria'; // Asegúrate de que la ruta sea correcta
import styles from '../../../assets/style/ClassList.module.css';

function ClassList({ classes, onStatusChange, onDelete, userId }) { // Añadir userId como prop
  console.log('[ClassList.jsx] Clases recibidas:', classes);

  if (!classes || classes.length === 0) {
    return <p>No hay clases para mostrar.</p>;
  }

  return (
    <div className={styles.classList}>
      {classes.map((classItem) => (
        <CardMateria
          key={classItem.classId}
          classId={classItem.classId}
          name={classItem.className}
          students={classItem.classNumberOfStudents}
          teacherName={`${classItem.userName || "docente"} ${classItem.userSurname || ""}`}
          status={classItem.classStatus}
          classGroup={classItem.classGroup} // Asegúrate de pasar classGroup
          classCode={classItem.classCode}   // Asegúrate de pasar classCode
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          userId={userId} // Pasar userId como prop
        />
      ))}
    </div>
  );
}

export default ClassList;

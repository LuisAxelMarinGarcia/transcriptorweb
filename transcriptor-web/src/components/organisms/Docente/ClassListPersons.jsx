import React from 'react';
import Card from '../CardPersonas'; // Asegúrate de tener un componente Card reutilizable
import styles from '../../../assets/style/Docente/ClasePersonasLista.module.css'; 
import teacherImage from "../../../assets/imgs/DocenteFoto.png"; // Importa la imagen del docente
import studentImage from "../../../assets/imgs/AlumnoFoto.png"; // Importa la imagen del alumno

function PeopleList({ type, view }) {
  // Datos de ejemplo de un docente y 10 alumnos, con estado de baja para algunos
  const peopleData = [
    {
      name: 'Leonardo Wilhelm DiCaprio',
      role: 'docente',
      image: teacherImage,
    },
    {
      name: 'Arlete Berenice Vázquez Guillen',
      role: 'alumno',
      image: studentImage,
      status: 'activo',
    },
    {
        name: 'Arlete Berenice Vázquez Guillen',
        role: 'alumno',
        image: studentImage,
        status: 'activo',
      },
      {
        name: 'Arlete Berenice Vázquez Guillen',
        role: 'alumno',
        image: studentImage,
        status: 'activo',
      },
      {
        name: 'Arlete Berenice Vázquez Guillen',
        role: 'alumno',
        image: studentImage,
        status: 'activo',
      },
      {
        name: 'Arlete Berenice Vázquez Guillen',
        role: 'alumno',
        image: studentImage,
        status: 'activo',
      },
    {
      name: 'Carlos Alberto Moreno López',
      role: 'alumno',
      image: studentImage,
      status: 'baja',
    },
    {
        name: 'Carlos Alberto Moreno López',
        role: 'alumno',
        image: studentImage,
        status: 'baja',
      },
      {
        name: 'Carlos Alberto Moreno López',
        role: 'alumno',
        image: studentImage,
        status: 'baja',
      },
      {
        name: 'Carlos Alberto Moreno López',
        role: 'alumno',
        image: studentImage,
        status: 'baja',
      },
    // Añadir el resto de estudiantes con su estado respectivo
  ];

  // Filtrar los datos en función de la vista seleccionada
  let filteredData;
  if (view === "docenteYAlumnos") {
    filteredData = peopleData;
  } else if (view === "baja") {
    filteredData = peopleData.filter(person => person.role === 'alumno' && person.status === 'baja');
  }

  return (
    <div className={styles.peopleList}>
      {/* Mostrar sección de Docente y Alumnos */}
      {view === "docenteYAlumnos" && (
        <>
          <div className={styles.sectionTitle}>Docente</div>
          {filteredData
            .filter(person => person.role === 'docente')
            .map((person, index) => (
              <Card
                key={index}
                title={person.name}
                image={person.image}
                type="profile"
              />
            ))}

          <div className={styles.sectionTitle}>Alumnos</div>
          {filteredData
            .filter(person => person.role === 'alumno' && person.status === 'activo')
            .map((person, index) => (
              <Card
                key={index}
                title={person.name}
                image={person.image}
                type="profile"
              />
            ))}
        </>
      )}

      {/* Mostrar solo alumnos dados de baja */}
      {view === "baja" && (
        <>
          <div className={styles.sectionTitle}>Alumnos Dados de Baja</div>
          {filteredData.map((person, index) => (
            <Card
              key={index}
              title={person.name}
              image={person.image}
              type="profile"
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PeopleList;

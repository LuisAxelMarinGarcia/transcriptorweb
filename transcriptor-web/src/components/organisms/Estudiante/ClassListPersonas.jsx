import React from 'react';
import Card from '../CardPersonas'; // Asegúrate de tener un componente Card reutilizable
import styles from '../../../assets/style/Estudiante/PersonasLista.module.css'; 
import teacherImage from "../../../assets/imgs/DocenteFoto.png"; // Importa la imagen del docente
import studentImage from "../../../assets/imgs/AlumnoFoto.png"; // Importa la imagen del alumno

function PeopleList({ type }) {
  // Datos de ejemplo de un docente y 10 alumnos
  const peopleData = [
    {
      name: 'Leonardo Wilhelm DiCaprio',
      role: 'docente',
      image: teacherImage,
    },
    {
      name: 'Arlet Berenice Vázquez Guillen',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Carlos Alberto Moreno López',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Daniela Sofía Fernández Ruiz',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Juan Sebastián García Torres',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'María José Martínez Castillo',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Pedro Nicolás Sánchez Gómez',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Laura Camila Ortiz Ríos',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Roberto Antonio Pérez Díaz',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Sofía Valentina Hernández Vega',
      role: 'alumno',
      image: studentImage,
    },
    {
      name: 'Andrés Felipe Jiménez Mendoza',
      role: 'alumno',
      image: studentImage,
    },
  ];

  // Filtrar los datos en función de la prop `type`
  const filteredData = peopleData.filter(person => person.role === type);

  return (
    <div className={styles.peopleList}>
      {type === 'docente' && <div className={styles.sectionTitle}></div>}
      {type === 'alumno' && <div className={styles.sectionTitle}></div>}

      {filteredData.map((person, index) => (
        <Card
          key={index}
          title={person.name}
          image={person.image}
          type="profile"
        />
      ))}
    </div>
  );
}

export default PeopleList;

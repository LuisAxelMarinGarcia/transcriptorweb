import React from "react";
import Card from "../CardMateria"; // Importa el componente Card
import teacherImage from "../../../assets/imgs/Avatar Teacher.png"; // Simulando imagen de profesor
import styles from '../../../assets/style/ClassList.module.css'; 
 

function ClassList({ statusFilter }) {
    // Datos simulados para clases activas y archivadas
    const classData = [
      {
        title: "7B - Minería de datos y análisis",
        students: 22,
        teacherName: "Horacio Irán Solís Cisneros",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },{
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María Alejandra García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "6A - Inteligencia Artificial y análisis",
        students: 25,
        teacherName: "María García Hernández",
        teacherImage: teacherImage,
        status: "active",
      },
      {
        title: "8C - Programación Avanzada",
        students: 18,
        teacherName: "Luis Martínez Pérez",
        teacherImage: teacherImage,
        status: "archived",
      },
      {
        title: "8C - Programación Avanzada",
        students: 18,
        teacherName: "Luis Martínez Pérez",
        teacherImage: teacherImage,
        status: "archived",
      },
      {
        title: "8C - Programación Avanzada",
        students: 18,
        teacherName: "Luis Martínez Pérez",
        teacherImage: teacherImage,
        status: "archived",
      },
    ];
  
    return (
        <div className={styles.classList}>
          {classData
            .filter(classItem => classItem.status === statusFilter) // Filtra las clases activas
            .map((classItem, index) => (
              <Card
                key={index}
                title={classItem.title}
                students={classItem.students}
                teacherName={classItem.teacherName}
                teacherImage={classItem.teacherImage}
                status={classItem.status}
              />
          ))}
        </div>
      );
  }
  
  export default ClassList;
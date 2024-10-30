import React from "react";
import styles from '../../assets/style/CardMateria.module.css'; // Asegúrate de tener los estilos en este archivo
import EliminarIcon from '../../assets/imgs/EliminarClase.png'; //
import ArchivarIcon from '../../assets/imgs/ArchivarClase.png'; //


function CardMateria({ title, students, teacherName, teacherImage, status }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardStudents}>
            <i className="fas fa-users"></i> {students}
          </div>
        </div>
        <div className={styles.cardTeacher}>
          <img src={teacherImage} alt="Teacher" className={styles.teacherImage} />
        </div>
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.teacherName}>{teacherName}</p>
        <div className={styles.cardActions}>
        <img src={EliminarIcon} alt="Eliminar" className={styles.icon} /> |
        <img src={ArchivarIcon} alt="Archivar" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default CardMateria;

import React from 'react';
import styles from '../../assets/style/StudentView.module.css';
import Users from '../../assets/imgs/Users.png';
import teacherAvatar from '../../assets/imgs/Avatar Teacher.png'
import IconMicrofono from '../../assets/imgs/EscuchandoEnVivo.png';

const StudentView = ({ title, teacherName, studentCount, transcriptionText }) => (
    <div className={styles.container}>
      {/* Sección del título, nombre del maestro y fondo */}
      <div className={styles.headerContainer}>
        <div className={styles.titleInfo}>
          <h1>{title}</h1> {/* Nombre de la clase */}
          <div className={styles.studentCount}>
            <img src={Users} alt="Icono Alumnos" className={styles.studentIcon} />
            <p>{studentCount}</p> {/* Número de alumnos */}
          </div>
        </div>
      </div>
  
      {/* Sección del maestro, forma de onda y estado */}
      <div className={styles.teacherSection}>
  <div className={styles.teacherInfo}>
    <img src={teacherAvatar} alt="Avatar del maestro" className={styles.teacherAvatar} />
    <h2>{teacherName}</h2>
    <div className={styles.waveform}></div> {/* Aquí va la forma de onda */}
  </div>
  <div className={styles.liveStatusContainer}>
    <p className={styles.liveStatus}>Escuchando en vivo...</p>
    <img src={IconMicrofono} alt="Micrófono" className={styles.liveIcon} /> {/* Ícono junto al estado */}
  </div>
  
</div>
  
      {/* Texto de transcripción */}
      <div className={styles.mainContent}>
        <div className={styles.transcriptionContainer}>
          <div className={styles.transcriptionText}>
            {transcriptionText}
          </div>
        </div>
  
        <button className={styles.exitButton}>Salir de la transmisión</button>
      </div>
    </div>
  );
  
  export default StudentView;
// src/components/organisms/StudentView.jsx

import React from 'react';
import styles from '../../assets/style/StudentView.module.css';
import Users from '../../assets/imgs/Users.png';
import teacherAvatar from '../../assets/imgs/Avatar Teacher.png';
import IconMicrofono from '../../assets/imgs/EscuchandoEnVivo.png';
import { jsPDF } from 'jspdf'; // Importamos jsPDF

const StudentView = ({
  title,
  teacherName,
  studentCount,
  transcriptionText,
}) => {
  // Función para manejar la descarga del PDF
  const handleDownloadPDF = () => {
    // Verificar si la transcripción está vacía
    if (!transcriptionText || transcriptionText.trim() === '') {
      alert('No hay transcripción disponible para descargar.');
      return;
    }

    const doc = new jsPDF();

    // Añadir contenido al PDF
    doc.setFont('Helvetica');
    doc.setFontSize(16);
    doc.text(`Transcripción de la clase: ${title}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Profesor: ${teacherName}`, 10, 30);
    doc.text('Transcripción:', 10, 40);

    // Dividir el texto para ajustarlo al ancho del PDF
    const textLines = doc.splitTextToSize(transcriptionText, 180);
    doc.text(textLines, 10, 50);

    // Guardar el PDF
    doc.save(`Transcripcion_${title}.pdf`);
  };

  return (
    <div className={styles.container}>
      {/* Sección del título, nombre del maestro y fondo */}
      <div className={styles.headerContainer}>
        <div className={styles.titleInfo}>
          <h1>{title}</h1>
          <div className={styles.studentCount}>
            <img src={Users} alt="Icono Alumnos" className={styles.studentIcon} />
            <p>{studentCount}</p>
          </div>
        </div>
      </div>

      {/* Sección del maestro y estado */}
      <div className={styles.teacherSection}>
        <div className={styles.teacherInfo}>
          <img
            src={teacherAvatar}
            alt="Avatar del maestro"
            className={styles.teacherAvatar}
          />
          <h2>{teacherName}</h2>

          {/* Botón para guardar la transcripción */}
          <button className={styles.GuardarButton} onClick={handleDownloadPDF}>
            Guardar transcripción
          </button>
        </div>
        <div className={styles.liveStatusContainer}>
          <p className={styles.liveStatus}>Escuchando en vivo...</p>
          <img src={IconMicrofono} alt="Micrófono" className={styles.liveIcon} />
        </div>
      </div>

      {/* Texto de transcripción con scroll */}
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
};

export default StudentView;

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../assets/style/StudentView.module.css';
import Users from '../../assets/imgs/Users.png';
import teacherAvatar from '../../assets/imgs/Avatar Teacher.png';
import IconMicrofono from '../../assets/imgs/EscuchandoEnVivo.png';
import { jsPDF } from 'jspdf'; // Importamos jsPDF
import ModalEnVivoFinalizado from './Estudiante/ModalEnVivoFinalizado'; // Importar el modal
import { useNavigate } from 'react-router-dom';

const StudentView = ({
  title,
  teacherName,
  studentCount,
  transcriptionText,
}) => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar la descarga del PDF
  const handleDownloadPDF = () => {
    if (!transcriptionText || transcriptionText.trim() === '') {
      alert('No hay transcripción disponible para descargar.');
      return;
    }

    const doc = new jsPDF();

    doc.setFont('Helvetica');
    doc.setFontSize(16);
    doc.text(`Transcripción de la clase: ${title}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Profesor: ${teacherName}`, 10, 30);
    doc.text('Transcripción:', 10, 40);

    const textLines = doc.splitTextToSize(transcriptionText, 180);
    doc.text(textLines, 10, 50);

    doc.save(`Transcripcion_${title}.pdf`);
  };

  // Función para abrir el modal
  const handleExitClick = () => {
    //console.log('[StudentView.jsx] Botón "Salir de la transmisión" clicado. Mostrando modal.');
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    //console.log('[StudentView.jsx] Modal cerrado.');
    setShowModal(false);
  };

  // Función para confirmar la salida y redirigir
  const handleConfirmExit = () => {
    //console.log('[StudentView.jsx] Confirmación de salida. Redirigiendo a /home-estudiante.');
    navigate('/home-estudiante', { replace: true }); // Reemplaza la entrada actual en el historial
  };
  
  const transcriptionContainerRef = useRef(null);
 // Efecto para mantener el scroll abajo cuando se actualiza la transcripción
 useEffect(() => {
  if (transcriptionContainerRef.current) {
    transcriptionContainerRef.current.scrollTop = transcriptionContainerRef.current.scrollHeight;
  }
}, [transcriptionText]); // Se ejecuta cada vez que cambia transcriptionText


  /*console.log('[StudentView.jsx] Renderizando componente con props:', {
    title,
    teacherName,
    studentCount,
    transcriptionText,
  });*/

  return (
    <div className={styles.container}>
      {/* Modal para confirmar salida */}
      <ModalEnVivoFinalizado
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmExit} // Nueva prop para manejar la confirmación
      />

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
        <div ref={transcriptionContainerRef} className={styles.transcriptionContainer}>
          <div className={styles.transcriptionText}>{transcriptionText}</div>
        </div>

        {/* Botón para salir de la transmisión */}
        <button className={styles.exitButton} onClick={handleExitClick}>
          Salir de la transmisión
        </button>
      </div>
    </div>
  );
};

export default StudentView;

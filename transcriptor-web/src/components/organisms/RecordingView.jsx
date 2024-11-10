// RecordingView.jsx

import React, { useState } from 'react'; // Asegúrate de importar useState
import RecordingControls from '../molecules/RecordingControls';
import styles from '../../assets/style/RecordingView.module.css';
import teacherIcon from '../../assets/imgs/IconDocente.png';
import IconMicrofono from '../../assets/imgs/IconMicrofono.png';

import ModalGuardar from '../organisms/Docente/ModalGuardar'; // Importa el modal

const RecordingView = ({
  title,
  teacherName,
  studentCount,
  time,
  onPause,
  onRecord,
  onStop,
  isListening,
  isPaused,
  canvasRef,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const handleOpenModal = () => {
    console.log('Modal de Guardar abierto');
    setIsModalOpen(true); // Abrir modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar modal
  };

  // Determinar el texto a mostrar según el estado
  let displayText = 'Iniciando';
  if (isListening) {
    displayText = 'Escuchando...';
  } else if (isPaused) {
    displayText = 'Pausado';
  }

  return (
    <div className={styles.container}>
      {/* Sección del título, nombre del maestro y fondo */}
      <div className={styles.headerContainer}>
        <div className={styles.titleInfo}>
          <h1>{title}</h1>
          <div className={styles.teacherInfo}>
            <img
              src={teacherIcon}
              alt="Icon Docente"
              className={styles.teacherIcon}
            />
            <p>{teacherName}</p>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.micContainer}>
          <img src={IconMicrofono} alt="Micrófono" className={styles.mic} />
          <p className={styles.timer}>{time}</p>
        </div>

        <div className={styles.controlsWrapper}>
          <canvas ref={canvasRef} className={styles.canvas}></canvas>
          <div className={styles.waveform}>
            {/* Mostrar el texto según el estado */}
            <p className={styles.statusText}>{displayText}</p>
          </div>
          <RecordingControls
            onPause={onPause}
            onRecord={onRecord}
            onStop={onStop}
            isListening={isListening}
            isPaused={isPaused}
            onGuardar={handleOpenModal} // Pasa la función para abrir el modal
          />
          
        </div>
      </div>

      {/* Modal para guardar */}
      {isModalOpen && <ModalGuardar show={isModalOpen} onClose={handleCloseModal} />}

    </div>
  );
};

export default RecordingView;

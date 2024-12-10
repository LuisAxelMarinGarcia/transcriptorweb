// RecordingView.jsx

import React, { useState } from 'react';
import RecordingControls from '../molecules/RecordingControls';
import styles from '../../assets/style/RecordingView.module.css';
import teacherIcon from '../../assets/imgs/IconDocente.png';
import IconMicrofono from '../../assets/imgs/IconMicrofono.png';
import ModalGuardarTranscripcion from '../organisms/Docente/ModalGuardar'; // Asegúrate de la ruta correcta

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
  transcript, // Transcripción como prop
  classId, // Añadido para pasar al modal
  userId, // Añadido para pasar al modal
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Modal de Guardar abierto');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            onGuardar={handleOpenModal} // Pasar la función para abrir el modal
            isListening={isListening}
            isPaused={isPaused}
            transcript={transcript} // Asegúrate de pasar 'transcript' si es necesario
          />
        </div>
      </div>

      {/* Sección para mostrar la transcripción */}
      <div className={styles.transcript}>
        <h3>Transcripción:</h3>
        <p>{transcript}</p> {/* Mostramos la transcripción pasada como prop */}
      </div>

      {/* Modal para guardar */}
      {isModalOpen && (
        <ModalGuardarTranscripcion
          show={isModalOpen}
          onClose={handleCloseModal}
          transcript={transcript}
          classId={classId} // Pasar classId al modal
          userId={userId}   // Pasar userId al modal
        />
      )}
    </div>
  );
};

export default RecordingView;

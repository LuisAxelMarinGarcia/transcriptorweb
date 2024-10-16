// RecordingView.jsx

import React from 'react';
import RecordingControls from '../molecules/RecordingControls';
import styles from '../../assets/style/RecordingView.module.css';
import teacherIcon from '../../assets/imgs/IconDocente.png';
import IconMicrofono from '../../assets/imgs/IconMicrofono.png';

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
}) => {
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
          <div className={styles.waveformEffect}></div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default RecordingView;

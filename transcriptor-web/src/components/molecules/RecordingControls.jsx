// RecordingControls.jsx

import React from 'react';
import pauseIcon from '../../assets/imgs/btn-stop.png';
import recordIcon from '../../assets/imgs/btn-grabar.png';
import stopIcon from '../../assets/imgs/btn-finalizar.png';
import styles from '../../assets/style/RecordingControls.module.css';

const RecordingControls = ({
  onPause,
  onRecord,
  onStop,
  isListening,
  isPaused,
}) => (
  <div className={styles.controls}>
    {/* Botón de Iniciar/Reanudar */}
    <button
      onClick={onRecord}
      className={styles.button}
      disabled={isListening}
    >
      <img
        src={recordIcon}
        alt={isPaused ? 'Reanudar' : 'Grabar'}
        className={styles.icon}
      />
    </button>

    {/* Botón de Pausar */}
    <button
      onClick={onPause}
      className={styles.button}
      disabled={!isListening}
    >
      <img
        src={pauseIcon}
        alt="Pausar"
        className={styles.icon}
      />
    </button>

    {/* Botón de Detener */}
    <button
      onClick={onStop}
      className={styles.button}
      disabled={!isListening && !isPaused}
    >
      <img
        src={stopIcon}
        alt="Detener"
        className={styles.icon}
      />
    </button>
  </div>
);

export default RecordingControls;

// RecordingControls.jsx

import React from 'react';
import pauseIcon from '../../assets/imgs/btn-stop.png'; // Ícono de pausar
import recordIcon from '../../assets/imgs/btn-grabar.png'; // Ícono de grabar
import stopIcon from '../../assets/imgs/btn-finalizar.png'; // Ícono de detener
import IconReanudar from '../../assets/imgs/btn-reanudar.png'; // Ícono de reanudar
import guardarIcon from '../../assets/imgs/btn-guardar.png'; // Ícono de guardar
import styles from '../../assets/style/RecordingControls.module.css';

const RecordingControls = ({
  onPause,
  onRecord,
  onStop,
  onGuardar, // Nuevo prop para guardar
  isListening,
  isPaused,
}) => (
  <div className={styles.controls}>
    {/* Botón de Grabar */}
    <button
      onClick={onRecord}
      className={styles.button}
      disabled={isListening || isPaused} // Deshabilitado si ya está grabando o pausado
    >
      <img src={recordIcon} alt="Grabar" className={styles.icon} />
    </button>

    {/* Botón de Pausar/Reanudar */}
    <button
      onClick={onPause}
      className={styles.button}
      disabled={!isListening && !isPaused} // Habilitado si está grabando o pausado
    >
      <img
        src={isPaused ? IconReanudar : pauseIcon} // Alterna entre pausa y reanudar
        alt={isPaused ? 'Reanudar' : 'Pausar'}
        className={styles.icon}
      />
    </button>

    {/* Botón de Detener */}
    <button
      onClick={onStop}
      className={styles.button}
      disabled={!isListening && !isPaused} // Habilitado si está grabando o pausado
    >
      <img src={stopIcon} alt="Detener" className={styles.icon} />
    </button>

    {/* Botón de Guardar Transcripción */}
    <button
      onClick={onGuardar}
      className={styles.buttonGuardar}
      disabled={!isListening && !isPaused} // Ajusta la lógica según tus necesidades
    >
      
      Guardar
    </button>
  </div>
);

export default RecordingControls;

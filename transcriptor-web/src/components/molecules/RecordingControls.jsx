// RecordingControls.jsx

import React, { useState } from 'react';
import pauseIcon from '../../assets/imgs/btn-stop.png';  // Ícono de pausar
import recordIcon from '../../assets/imgs/btn-grabar.png';  // Ícono de grabar
import stopIcon from '../../assets/imgs/btn-finalizar.png';  // Ícono de detener
import IconReanudar from '../../assets/imgs/btn-reanudar.png';  // Ícono de reanudar
import styles from '../../assets/style/RecordingControls.module.css';

const RecordingControls = ({
  onPause,
  onRecord,
  onStop,
  isListening,
}) => {
  // Estado interno para manejar la pausa y la grabación
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Función para manejar la grabación inicial
  const handleRecord = () => {
    setIsRecording(true);  // Cambia el estado a "grabando"
    setIsPaused(false);  // Reinicia el estado de pausa al grabar
    onRecord();  // Llama a la función de grabación
  };

  // Función para pausar o reanudar según el estado actual
  const handlePauseResume = () => {
    if (isPaused) {
      // Si está pausado, reanuda
      setIsPaused(false);
      onRecord();  // Reanuda la grabación
    } else {
      // Si no está pausado, pausa
      setIsPaused(true);
      onPause();  // Pausa la grabación
    }
  };

  // Función para manejar la detención de la grabación
  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);  // Reinicia el estado de pausa
    onStop();  // Llama a la función de detener
  };

  return (
    <div className={styles.controls}>
      {/* Botón de Grabar */}
      <button
        onClick={handleRecord}
        className={styles.button}
        disabled={isRecording}  // Solo habilitado si no está grabando
      >
        <img
          src={recordIcon}
          alt="Grabar"
          className={styles.icon}
        />
      </button>

      {/* Botón de Pausar/Reanudar */}
      <button
        onClick={handlePauseResume}
        className={styles.button}
        disabled={!isRecording}  // Solo habilitado si está grabando
      >
        <img
          src={isPaused ? IconReanudar : pauseIcon}  // Alterna entre pausa y reanudar
          alt={isPaused ? 'Reanudar' : 'Pausar'}
          className={styles.icon}
        />
      </button>

      {/* Botón de Detener */}
      <button
        onClick={handleStop}
        className={styles.button}
        disabled={!isRecording}  // Solo habilitado si está grabando
      >
        <img
          src={stopIcon}
          alt="Detener"
          className={styles.icon}
        />
      </button>
    </div>
  );
};

export default RecordingControls;

import React from 'react';
import pauseIcon from '../../assets/imgs/btn-stop.png';
import recordIcon from '../../assets/imgs/btn-grabar.png';
import stopIcon from '../../assets/imgs/btn-finalizar.png';
import styles from '../../assets/style/RecordingControls.module.css';

const RecordingControls = ({ onPause, onRecord, onStop }) => (
    <div className={styles.controls}>
    <button onClick={onPause} className={styles.button}>
      <img src={pauseIcon} alt="Pausar" className={styles.icon} />
    </button>
    <button onClick={onRecord} className={styles.button}>
      <img src={recordIcon} alt="Grabar" className={styles.icon} />
    </button>
    <button onClick={onStop} className={styles.button}>
      <img src={stopIcon} alt="Detener" className={styles.icon} />
    </button>
  </div>
);

export default RecordingControls;
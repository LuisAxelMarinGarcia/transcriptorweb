import React from 'react';
import styles from '../../../assets/style/Estudiante/ModalEnVivoFinalizado.module.css';

const ModalEnVivoFinalizado = ({ show, onClose, onConfirm }) => {
  //console.log("Prop show:", show); 
  if (!show) return null;

  return (
    <div className={styles.modalFondo}>
      <div className={styles.modalContent}>
        <h1 className={styles.titleArchivar}>
          <i className="fas fa-book"></i>¿Seguro que quieres salir de la transcripción en vivo?
        </h1>
        <form className={styles.form}>
          <div className={styles.infoActions}>
            <h2 className={styles.textDescription}>Descripción</h2>
            <p className={styles.textInfo}>
              Estás a punto de salir de la transcripción en vivo. Si sales, ya no recibirás actualizaciones en tiempo real, pero podrás acceder a la transcripción guardada en el historial de la clase.
            </p>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onConfirm} className={styles.createButton}>
              Salir
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEnVivoFinalizado;

// ModalEliminarTranscripcion.jsx
import React from 'react';
import styles from '../../../assets/style/Docente/ModalEliminarTranscripcion.module.css'
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalEliminarTranscripcion = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm();
    }
  };

  return(
    <div className={styles.modalFondo} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.titleBaja}>
          <i className="fas fa-book"></i>Confirmar eliminación de transcripción
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.infoActions}>
            <h2 className={styles.textDescription}>Descripción</h2>
            <p className={styles.textInfo}>Estás a punto de eliminar esta transcripción de forma permanente.</p>
            <h2 className={styles.textAviso}>
              Aviso
              <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
            </h2>
            <p className={styles.textInfo}>Esta acción es irreversible.</p>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.createButton}>Eliminar</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEliminarTranscripcion;

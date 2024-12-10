// src/components/organisms/Docente/ModalEliminarClase.jsx

import React from 'react';
import styles from '../../../assets/style/Docente/ModalEliminarClase.module.css';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalEliminarClase = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={styles.modalFondo} onClick={onClose}>
      {/* Evitar que los clics dentro de modalContent se propaguen al modalFondo */}
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className={styles.titleBaja}>
          <i className="fas fa-book"></i> Confirmar eliminación de clase
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.infoActions}>
            <h2 className={styles.textDescription}>Descripción</h2>
            <p className={styles.textInfo}>
              Estás a punto de eliminar esta clase y todos sus datos asociados de forma permanente. Una vez eliminada, no podrás recuperarla.
            </p>
            <h2 className={styles.textAviso}>
              Aviso
              <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
            </h2>
            <p className={styles.textInfo}>
              Esta acción es irreversible y eliminará todos los materiales, archivos y transcripciones vinculados.
            </p>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.createButton}>
              Eliminar clase
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

export default ModalEliminarClase;

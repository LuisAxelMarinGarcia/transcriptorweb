// src/components/organisms/Estudiante/ModalEDesarchivarClase.jsx

import React from 'react';
import styles from '../../../assets/style/Estudiante/ModalEDesarchivarClase.module.css';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalEDesarchivarClase = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  // Maneja la confirmación de desarchivar y detiene la propagación del evento
  const handleConfirm = (e) => {
    e.stopPropagation();
    onConfirm();
  };

  // Maneja el cierre del modal y detiene la propagación del evento
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={styles.modalFondo} onClick={handleClose}>
      {/* Evita que los clics dentro de modalContent se propaguen al modalFondo */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.titleBaja}>
          <i className="fas fa-book"></i> Confirmar desarchivar clase
        </h1>
        <div className={styles.infoActions}>
          <h2 className={styles.textDescription}>Descripción</h2>
          <p className={styles.textInfo}>
            Estás a punto de desarchivar esta clase. Una vez desarchivada, podrás realizar modificaciones nuevamente.
          </p>
          <h2 className={styles.textAviso}>
            Aviso
            <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
          </h2>
          <p className={styles.textInfo}>
            Los cambios realizados después de desarchivar se guardarán de manera regular.
          </p>
        </div>
        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={handleConfirm}
            className={styles.createButton}
          >
            Desarchivar
          </button>
          <button
            type="button"
            onClick={handleClose}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEDesarchivarClase;

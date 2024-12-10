// src/components/organisms/Estudiante/ModalEArchivarClase.jsx

import React from 'react';
import styles from '../../../assets/style/Estudiante/ModalEArchivarClase.module.css';

const ModalEArchivarClase = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  // Maneja la confirmación de archivar y detiene la propagación del evento
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
        <h1 className={styles.titleArchivar}>
          <i className="fas fa-book"></i> Confirmación para archivar clase
        </h1>
        <div className={styles.infoActions}>
          <h2 className={styles.textDescription}>Descripción</h2>
          <p className={styles.textInfo}>
            Estás a punto de archivar esta clase. Esto significa que ya no estará disponible en tu
            ventana principal. Podrás acceder a la clase en modo lectura desde la sección de
            archivadas.
          </p>
        </div>
        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={handleConfirm}
            className={styles.createButton}
          >
            Archivar clase
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

export default ModalEArchivarClase;

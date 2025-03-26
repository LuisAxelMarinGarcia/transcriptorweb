// src/components/organisms/Estudiante/EModalEliminarClase.jsx

import React from 'react';
import styles from '../../../assets/style/Estudiante/EModalEliminarClase.module.css';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const EModalEliminarClase = ({ show, onClose, onDelete }) => {
  //console.log("Prop show:", show); 
  if (!show) return null;

  // Maneja el envío del formulario y detiene la propagación del evento
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Detiene la propagación del evento
    if (onDelete) {
      onDelete();
    }
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
          <i className="fas fa-book"></i> Confirmar darse de baja de la clase
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.infoActions}>
            <h2 className={styles.textDescription}>Descripción</h2>
            <p className={styles.textInfo}>
              Estás a punto de darte de baja en esta clase en la que te encuentras inscrito. Una vez dado de baja, no podrás consultar su contenido.
            </p>
            <h2 className={styles.textAviso}>
              Aviso
              <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
            </h2>
            <p className={styles.textInfo}>
              Para volver a inscribirte a la clase deberás volver a unirte mediante su código.
            </p>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.createButton}>
              Darse de baja
            </button>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EModalEliminarClase;

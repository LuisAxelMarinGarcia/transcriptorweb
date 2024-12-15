// src/components/organisms/Docente/ModalIniciarEnVivo.jsx

import styles from '../../../assets/style/Docente/ModaliniciarEnVivo.module.css';
import React from 'react';

const ModalIniciarEnVivo = ({ show, onClose, onConfirm }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      onConfirm(); // Llamar a la función de confirmación
    };

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.title}>
                    <i className="fas fa-book"></i> Confirmación de transcripción en vivo
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>
                          Estás a punto de iniciar una transcripción en vivo. 
                          Esto permitirá capturar y generar un texto en tiempo real.
                        </p>
                        <p className={styles.textCuestion}>
                          ¿Estás seguro de que deseas continuar?
                        </p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>
                          Iniciar transcripción
                        </button>
                        <button 
                          type="button" 
                          onClick={onClose} 
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

export default ModalIniciarEnVivo;

import styles from '../../../assets/style/Docente/ModalEliminarClase.module.css'
import React from 'react';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalEliminarClase = ({ show, onClose }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.titleBaja}>
                    <i className="fas fa-book"></i>Confirmar eliminación de clase
                </h1>
                <form action="" className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>Estás a punto de eliminar esta clase y todos sus datos asociados de forma permanente. Una vez eliminada, no podrás recuperarla.</p>
                        <h2 className={styles.textAviso}>
                        
                            Aviso
                            <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
                        </h2>
                        <p className={styles.textInfo}>Esta acción es irreversible y eliminará todos los materiales, archivos y transcripciones vinculados.</p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Eliminar clase</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalEliminarClase;
import styles from '../../../assets/style/Estudiante/ModalEArchivarClase.module.css'
import React from 'react';


const ModalEArchivarClase = ({ show, onClose }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.titleArchivar}>
                    <i className="fas fa-book"></i>Confirmación para archivar clase
                </h1>
                <form action="" className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>Estás a punto de archivar esta clase. Esto significa que ya no estará disponible en tu ventana principal. Podrás acceder a la clase en modo lectura desde la sección de archivadas. </p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Archivar clase</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalEArchivarClase;
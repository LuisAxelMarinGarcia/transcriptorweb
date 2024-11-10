import styles from '../../../assets/style/Docente/ModalEnVivoNOdisponible.module.css'
import React from 'react';


const ModalEnVivoNOdisponible = ({ show, onClose }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.titleArchivar}>
                    <i className="fas fa-book"></i>Transcripción en vivo no disponible
                </h1>
                <form action="" className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>No puedes iniciar una transcripción en vivo mientras el estado de la clase sea "Archivado". Por favor, cambia el estado de la clase para habilitar esta función. </p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Aceptar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalEnVivoNOdisponible;
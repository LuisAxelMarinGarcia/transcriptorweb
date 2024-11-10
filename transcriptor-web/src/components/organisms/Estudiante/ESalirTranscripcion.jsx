import React from 'react';
import styles from '../../../assets/style/Estudiante/ModalESalirTranscripcion.module.css'
import ChekList from '../../../assets/imgs/cheque.png'

const ModalESalirTranscripcion = ({ show, onClose }) => {
    if (!show) return null;
    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.title}>
                    <i className="fas fa-book"></i> Transcripción Finalizada
                </h1>
                <form action="" className={styles.form}>
                    
                    <img src={ChekList} alt="CodeQR" className={styles.ChekList} />
                    <p className={styles.InfoBold}>¡La transcripción ha finalziado y ha sido guardada con éxito! </p>

                    <p className={styles.InfoQR}>Puedes consultarla en el menú de la clase en cualquier momento.</p>
                    
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Aceptar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalESalirTranscripcion;
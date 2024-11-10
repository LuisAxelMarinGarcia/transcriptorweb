import React from 'react';
import styles from '../../assets/style/ModalCompartirQR.module.css'
import QR from '../../assets/imgs/CodeQR.png'

const ModalCompartirQR = ({ show, onClose }) => {
    if (!show) return null;
    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.title}>
                    <i className="fas fa-book"></i> Compartir QR de la transcripción
                </h1>
                <form action="" className={styles.form}>
                    
                    <img src={QR} alt="CodeQR" className={styles.CodeQR} />
                    <p className={styles.InfoQR}>Escanea este código QR para acceder a la transcripción completa.</p>
                    
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Hecho</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalCompartirQR;
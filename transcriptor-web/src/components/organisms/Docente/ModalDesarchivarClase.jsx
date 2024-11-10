import styles from '../../../assets/style/Docente/ModalDesarchivarClase.module.css'
import React from 'react';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalDesarchivarClase = ({ show, onClose }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.titleBaja}>
                    <i className="fas fa-book"></i>Confirmar desarchivar clase
                </h1>
                <form action="" className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>Estás a punto de desarchivar esta clase. Una vez desarchivada, podrás realizar modificaciones nuevamente.</p>
                        <h2 className={styles.textAviso}>
                        
                            Aviso
                            <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
                        </h2>
                        <p className={styles.textInfo}>Los cambios realizados después de desarchivar se guardarán de manera regular.</p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Desarchivar</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
};

export default ModalDesarchivarClase;
import styles from '../../../assets/style/Docente/ModalGuardarTranscripcion.module.css'
import React from 'react';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalGuardarTranscripcion = ({ show, onClose }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.titleBaja}>
                    <i className="fas fa-book"></i>¿Estás seguro de que deseas finalizar y guardar la transcripción?
                </h1>
                <form action="" className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>Estás a punto de finalizar y guardar esta transcripción del en vivo. </p>

                        <div className={styles.CamposGuardar}>
                            <input type="text" name="className" placeholder="Título de la transcripción" className={styles.inputText}/>
                            <input type="text" name="className" placeholder="Descripción (Opcional)" className={styles.inputText}/>
                        </div>

                        <h2 className={styles.textAviso}>
                        
                            Aviso
                            <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
                        </h2>
                        <p className={styles.textInfo}>Una vez guardada, podrás acceder a ella más tarde.</p>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Guardar</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalGuardarTranscripcion;
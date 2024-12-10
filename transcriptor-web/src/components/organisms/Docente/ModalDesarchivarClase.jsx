// src/components/organisms/Docente/ModalDesarchivarClase.jsx

import React, { useState } from 'react';
import styles from '../../../assets/style/Docente/ModalDesarchivarClase.module.css';
import AvisoIcon from '../../../assets/imgs/atencion.png';

const ModalDesarchivarClase = ({ show, onClose, onConfirm }) => {
    console.log("Prop show:", show); 
    if (!show) return null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDesarchivar = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setLoading(true);
        setError('');

        try {
            if (typeof onConfirm === 'function') {
                await onConfirm(); // Llama a la función pasada desde CardMateria
                console.log("[ModalDesarchivarClase.jsx] onConfirm ejecutado correctamente");
                // Opcional: Mostrar una notificación de éxito
            } else {
                throw new Error('onConfirm no es una función');
            }
        } catch (err) {
            console.error('[ModalDesarchivarClase.jsx] Error al desarchivar la clase:', err);
            setError('Error al desarchivar la clase. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalFondo} onClick={onClose}>
            {/* Evitar que los clics dentro de modalContent se propaguen al modalFondo */}
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className={styles.titleBaja}>
                    <i className="fas fa-book"></i> Confirmar desarchivar clase
                </h1>
                <form onSubmit={handleDesarchivar} className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>
                            Estás a punto de desarchivar esta clase. Una vez desarchivada, podrás realizar modificaciones nuevamente.
                        </p>
                        <h2 className={styles.textAviso}>
                            Aviso
                            <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
                        </h2>
                        <p className={styles.textInfo}>
                            Los cambios realizados después de desarchivar se guardarán de manera regular.
                        </p>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton} disabled={loading}>
                            {loading ? 'Desarchivando...' : 'Desarchivar'}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className={styles.cancelButton} 
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalDesarchivarClase;

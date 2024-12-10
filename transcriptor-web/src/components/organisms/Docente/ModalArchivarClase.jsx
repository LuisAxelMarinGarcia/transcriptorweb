// src/components/organisms/Docente/ModalArchivarClase.jsx

import React, { useState } from 'react';
import styles from '../../../assets/style/Docente/ModalArchivarClase.module.css';

const ModalArchivarClase = ({ show, onClose, onConfirm }) => {
    console.log("Prop show:", show); 
    console.log("Prop onConfirm:", onConfirm);
    if (!show) return null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleArchivar = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        console.log("[ModalArchivarClase.jsx] handleArchivar llamado");
        setLoading(true);
        setError('');

        try {
            if (typeof onConfirm === 'function') {
                await onConfirm(); // Llama a la función pasada desde CardMateria
                console.log("[ModalArchivarClase.jsx] onConfirm ejecutado correctamente");
                // Opcional: Mostrar una notificación de éxito
            } else {
                throw new Error('onConfirm no es una función');
            }
        } catch (err) {
            console.error('[ModalArchivarClase.jsx] Error al archivar la clase:', err);
            setError('Error al archivar la clase. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.modalFondo} onClick={onClose}>
            {/* Evitar que los clics dentro de modalContent se propaguen al modalFondo */}
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className={styles.titleArchivar}>
                    <i className="fas fa-book"></i> Confirmación para archivar clase
                </h1>
                <form onSubmit={handleArchivar} className={styles.form}>
                    <div className={styles.infoActions}>
                        <h2 className={styles.textDescription}>Descripción</h2>
                        <p className={styles.textInfo}>
                            Estás a punto de archivar esta clase. Esto significa que ya no estará disponible para ediciones ni modificaciones. Podrás acceder a la clase en modo lectura desde la sección de archivadas.
                        </p>
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton} disabled={loading}>
                            {loading ? 'Archivando...' : 'Archivar clase'}
                        </button>
                        <button type="button" onClick={onClose} className={styles.cancelButton} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalArchivarClase;

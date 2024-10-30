import React from 'react';
import styles from '../../../assets/style/Estudiante/UnirmeAClase.module.css';

const UnirmeAClase = () => {
  return (
    <>
        <div className={styles.ContainerCodigo}>
            <div className={styles.TitleContainer}>
                <h1>
                    Unirse a clase
                </h1>
            </div>
            <div className={styles.ContentContainer}>
                <p>Pídele a tu profesor el código de clase e introdúcelo aquí.</p>
                <input type="text" placeholder='Código de clase' />
                <p>Ingresa un código de 5 a 7 caracteres alfanuméricos, sin espacios ni símbolos.</p>
                <button>Unirme</button>
            </div>
        </div>

        <div className="Container-UserDecoration">

        </div>
    </>

  );
};

export default UnirmeAClase;
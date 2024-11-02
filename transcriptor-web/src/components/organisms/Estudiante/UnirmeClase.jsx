import React from 'react';
import styles from '../../../assets/style/Estudiante/UnirmeAClase.module.css';

import UserDeco from '../../../assets/imgs/UserDeco.png';

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
                <p className={styles.etiquetaP1}>Pídele a tu profesor el código de clase e introdúcelo aquí.</p>
                <input type="text" placeholder='Código de clase' className={styles.InputCodigo}/>
                <p className={styles.etiquetaP2}>Ingresa un código de 5 a 7 caracteres alfanuméricos, sin espacios ni símbolos.</p>
                <button  className={styles.buttonUnirme}>Unirse</button>
            </div>
        </div>

        <div className={styles.ContainerUserDecoration}>
            <img src={UserDeco} alt="UserDeco"/>
        </div>
    </>

  );
};

export default UnirmeAClase;
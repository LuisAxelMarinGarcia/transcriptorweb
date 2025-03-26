// ModalCompartirQR.jsx
import React from 'react';
import styles from '../../assets/style/ModalCompartirQR.module.css';
import { QRCodeCanvas } from 'qrcode.react';

const ModalCompartirQR = ({ show, onClose, link }) => {
  if (!show) return null;

  return (
    <div className={styles.modalFondo} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.title}>
            <i className="fas fa-book"></i> Compartir transcripción
        </h1>

        <form action="" className={styles.form}>
          <div className={styles.infoActions}>
            <p className={styles.textInfo}>Escanea este código QR o sigue el enlace:</p>
            <div style={{ textAlign: 'center', margin: '0 0' }}>
              <QRCodeCanvas value={link} size={150} className={styles.ImgQR} />
            </div>
            
              <a className={styles.textLink} href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            
          </div>

          <div className={styles.modalActions}>
            <button onClick={onClose}className={styles.cancelButton} >Hecho</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCompartirQR;

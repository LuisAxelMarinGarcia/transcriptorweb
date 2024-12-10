// ModalCompartirQR.jsx
import React from 'react';
import styles from '../../assets/style/ModalCompartirQR.module.css';
import { QRCodeCanvas } from 'qrcode.react';

const ModalCompartirQR = ({ show, onClose, link }) => {
  if (!show) return null;

  return (
    <div className={styles.modalFondo} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Compartir Transcripción</h2>
        <p>Escanea este código QR o sigue el enlace:</p>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <QRCodeCanvas value={link} size={200} />
        </div>
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalCompartirQR;

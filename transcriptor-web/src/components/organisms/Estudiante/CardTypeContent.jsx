import React, { useState } from 'react';

import iconShare from '../../../assets/imgs/IconCompartir.png';
import iconDownload from '../../../assets/imgs/IconDescargar.png';
import iconDelete from '../../../assets/imgs/IconEliminar.png';
import iconFecha from '../../../assets/imgs/IconFecha.png';

import ModalCompartirQR from '../../organisms/ModalCompartirQR'; 
import styles from '../../../assets/style/Docente/CardTypeContent.module.css';

function Card({ title, description, date, type, link, fileType, author }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Icono de compartir clickeado");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      {/* Header de la card */}
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div className={styles.cardActions}>
          <span className={styles.cardDate}>{date}</span>
          <img src={iconFecha} alt="Compartir" className={styles.cardIcon} />
          {type === 'transcription' && (
            <>
              <img src={iconShare} alt="Compartir" className={styles.cardIcon}  onClick={openModal} />
              <img src={iconDownload} alt="Descargar" className={styles.cardIcon} />
              
            </>
          )}
        </div>
      </div>

      {/* Cuerpo de la card */}
      <div className={styles.cardBody}>
        {description && <p>{description}</p>}
        {type === 'file' && fileType === 'pdf' && (
          <div className={styles.thumbnail}>
            <img src="/path/to/pdf-thumbnail.png" alt="Vista previa del archivo PDF" />
          </div>
        )}
        {type === 'link' && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        )}
      </div>

      {/* Footer de la card */}
      <div className={styles.cardFooter}>
        <img src={author.image} alt={author.name} />
        <span>{author.name}</span>
      </div>

      {/* Modal */}
      {isModalOpen && <ModalCompartirQR show={isModalOpen} onClose={closeModal} />}

    </div>
  );
}

export default Card;
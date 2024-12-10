import React, { useState } from 'react';

import iconShare from '../../../assets/imgs/IconCompartir.png';
import iconDownload from '../../../assets/imgs/IconDescargar.png';
import iconDelete from '../../../assets/imgs/IconEliminar.png';
import iconFecha from '../../../assets/imgs/IconFecha.png';

import ModalCompartirQR from '../../organisms/ModalCompartirQR'; 
import styles from '../../../assets/style/Docente/CardTypeContent.module.css';


function Card({ title, description, date, type, link, fileType, author }) {

  return (
    <div className={styles.card}>
      {/* Header de la card */}
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardDate}><img src="/path/to/iconFecha.png" alt="Fecha" className={styles.icon} /> {date}</span>
      </div>

      {/* Cuerpo de la card */}
      <div className={styles.cardBody}>
        {description && <p>{description}</p>}
        {type === 'FILE' && fileType === 'pdf' && (
          <div className={styles.thumbnail}>
            <img src="/path/to/pdf-thumbnail.png" alt="Vista previa del archivo PDF" />
          </div>
        )}
        {type === 'LINK' && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        )}
        {type === 'MATERIAL' && link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Ver Transcripción
          </a>
        )}
      </div>

      {/* Footer de la card */}
      <div className={styles.cardFooter}>
        <img src={author.image} alt={author.name} className={styles.authorImage} />
        <span>{author.name}</span>
      </div>
    </div>
  );
}

export default Card;

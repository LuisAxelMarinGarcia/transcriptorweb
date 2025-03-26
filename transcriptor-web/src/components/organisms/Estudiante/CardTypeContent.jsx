// CardTypeContent.jsx
import React, { useState } from 'react';

import iconShare from '../../../assets/imgs/IconCompartir.png';
import iconDownload from '../../../assets/imgs/IconDescargar.png';
import iconFecha from '../../../assets/imgs/IconFecha.png';

import ModalCompartirQR from '../../organisms/ModalCompartirQR'; 

import styles from '../../../assets/style/Docente/CardTypeContent.module.css';

function Card({ transcriptionId, title, description, date, type, link, fileType, author }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const openModalShare = () => {
    setActiveModal('share');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal(null);
  };

  const handleDownload = async () => {
    if (!link) return;
    try {
      const response = await fetch(link);
      if (!response.ok) {
        alert('No se pudo obtener el archivo para descargar.');
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title || 'archivo.pdf'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('Error al descargar el archivo.');
    }
  };

  return (
    <div className={styles.card}>
      {/* Header de la card */}
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div className={styles.cardActions}>
          <span className={styles.cardDate}>
          {date}
          </span>
          <img src={iconFecha} alt="Fecha" className={styles.cardIconEscrit} />
          {type === 'TRANSCRIPCION' && link && (
            <>
              {/* Icono de Compartir QR */}
              <img 
                src={iconShare} 
                alt="Compartir QR" 
                className={styles.cardIcon} 
                onClick={openModalShare} 
                title="Compartir QR"
              />
              {/* Icono de Descargar */}
              <img 
                src={iconDownload} 
                alt="Descargar" 
                className={styles.cardIcon} 
                onClick={handleDownload} 
                title="Descargar"
              />
            </>
          )}
        </div>
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
        {type === 'TRANSCRIPCION' && link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={styles.verTranscripcion}>
            Ver Transcripción
          </a>
        )}
        {type === 'MATERIAL' && link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={styles.verMaterial}>
            Ver Material
          </a>
        )}
      </div>

      {/* Footer de la card */}
      <div className={styles.cardFooter}>
        <img src={author.image} alt={author.name} className={styles.PerfilDocente} />
        <span>{author.name}</span>

        <div className={styles.FechaResponsive}>
                  <span className={styles.cardDateRes}>{date}</span>
                  <img src={iconFecha} alt="Fecha" className={styles.cardIconRes} /> 
                </div>
      </div>

      {/* Modal para Compartir QR */}
      {isModalOpen && activeModal === 'share' && (
        <ModalCompartirQR 
          show={isModalOpen} 
          onClose={closeModal} 
          link={link}
        />
      )}
    </div>
  );
}

export default Card;

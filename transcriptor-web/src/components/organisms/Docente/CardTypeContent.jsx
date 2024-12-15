// CardTypeContent.jsx
import React, { useState } from 'react';

import iconShare from '../../../assets/imgs/IconCompartir.png';
import iconDownload from '../../../assets/imgs/IconDescargar.png';
import iconDelete from '../../../assets/imgs/IconEliminar.png';
import iconFecha from '../../../assets/imgs/IconFecha.png';

import ModalCompartirQR from '../../organisms/ModalCompartirQR'; 
import ModalEliminarTranscription from '../../organisms/Docente/ModalEliminarTranscripcion'; 
import ModalEliminarOther from '../../organisms/Docente/ModalEliminarMaterialD'; 

import styles from '../../../assets/style/Docente/CardTypeContent.module.css';

function Card({ transcriptionId, title, description, date, type, link, fileType, author, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const openModalShare = () => {
    setActiveModal('share');
    setIsModalOpen(true);
  };

  const openModalDelete = (e) => {
    e.stopPropagation();
    if (type === 'MATERIAL') {
      setActiveModal('transcription');
    } else if (type === 'LINK' || type === 'FILE' || type === 'TRANSCRIPCION') { // Añadido 'TRANSCRIPCION'
      setActiveModal('other');
    }
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

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    closeModal();
  };

  return (
    <div className={styles.card}>
      {/* Header de la card */}
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div className={styles.cardActions}>
          <span className={styles.cardDate}>
            <img src={iconFecha} alt="Fecha" className={styles.icon} /> {date}
          </span>
          {type === 'TRANSCRIPCION' && link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.verTranscripcion}>
              Ver Transcripción
            </a>
          )}
          {type === 'MATERIAL' && (
            <>
              <img src={iconShare} alt="Compartir" className={styles.cardIcon} onClick={openModalShare} />
              <img src={iconDownload} alt="Descargar" className={styles.cardIcon} onClick={handleDownload} />
            </>
          )}
          {(type === 'MATERIAL' || type === 'LINK' || type === 'FILE' || type === 'TRANSCRIPCION') && (
            <img src={iconDelete} alt="Eliminar" className={styles.cardIcon} onClick={openModalDelete} />
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
        <img src={author.image} alt={author.name} />
        <span>{author.name}</span>
      </div>

      {/* Modal para Compartir */}
      {isModalOpen && activeModal === 'share' && (
        <ModalCompartirQR 
          show={isModalOpen} 
          onClose={closeModal} 
          link={link}
        />
      )}

      {/* Modal para Eliminar Transcription */}
      {isModalOpen && activeModal === 'transcription' && (
        <ModalEliminarTranscription 
          show={isModalOpen} 
          onClose={closeModal} 
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Modal para Eliminar Otro (Link, File o Transcripción) */}
      {isModalOpen && activeModal === 'other' && (
        <ModalEliminarOther 
          show={isModalOpen} 
          onClose={closeModal} 
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Card;

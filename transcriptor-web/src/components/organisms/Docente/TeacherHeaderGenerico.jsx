// src/components/organisms/Docente/TeacherHeaderGenerico.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/style/Docente/TeacherHeaderGenerico.module.css';
import Logo from '../../atoms/LogoTranscribeme'; 
import Avatar from '../../atoms/AvatarPerfil';
import IconHome from '../../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../../assets/imgs/clasesArchivadas.png';
import iconLive from '../../../assets/imgs/iconEnVivo.png';
import iconCrearClass from '../../../assets/imgs/crearClass.png';
import ModalIniciarEnVivo from './ModalIniciarEnVivo'; // Asegúrate de que la ruta es correcta

const TeacherHeader = ({ view, classId, transcriptionStatus, classData, onOpenModal, classStatus }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const handleTranscriptionClick = () => {
    if (classId && classData && classStatus !== 'ARCHIVADO') {
      setShowModal(true); // Abrir el modal
    } else {
      console.error('No se proporcionó classId o classData para la transcripción, o la clase está archivada.');
    }
  };

  const handleConfirmTranscription = () => {
    navigate(`/docente/${classId}`, { state: { ...classData } }); // Navegar después de confirmar
    setShowModal(false); // Cerrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal sin hacer nada
  };

  const renderHeaderContent = () => {
    switch(view) {
      case 'materias':
        return (
          <div className={styles.ContainerMaterias}>
            <div className={styles.ContainerTitleMaterias}>
              <h1 className={styles.titleMateria}>
                <i className="fas fa-book"></i> Materias
                <img src={IconHome} alt="Icon-Home" className={styles.IconoHome} />
              </h1>
            </div>

            <button className={styles.createClassButton} onClick={onOpenModal}>
            <span className={styles.hiddenText}>Crear clase</span> <img src={iconCrearClass} alt="Icono de transmisión en vivo" className={styles.iconCrear} />
            </button>
          </div>
        );

      case 'clases-archivadas':
        return (
          <div className={styles.ContainerTitleArchivados}>
            <h1 className={styles.titleMateriaArchivado}>
              <i className="fas fa-book"></i> Clases archivadas
              <img src={clasesArchivadas} alt="Icon-Archivado" className={styles.IconoArchivado} />
            </h1>
          </div>
        );

      case 'transcripcion':
        return (
          <div className={styles.transcriptionContent}>
            <button 
              className={`${styles.transcriptionButton} ${classStatus === 'ARCHIVADO' ? styles.archivedButton : ''}`}  
              onClick={classStatus !== 'ARCHIVADO' ? handleTranscriptionClick : undefined} // Condicional para onClick
              disabled={classStatus === 'ARCHIVADO'} // Deshabilitar el botón si está archivado
              title={classStatus === 'ARCHIVADO' ? "La clase está archivada y no se puede iniciar la transcripción." : "Iniciar transcripción en vivo"}
            >
              <span className={styles.hiddenText}>Iniciar transcripción en vivo </span> <img src={iconLive} alt="Icono de transmisión en vivo" className={styles.icon} />
            </button>
          </div>
        );

      case 'CrearMaterial':
        return null; // No renderiza ningún contenido

      default:
        return null;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.content}>
        {renderHeaderContent()}
      </div>
      
      <div className={styles.containerAvatar}>
          <Avatar size="medium" />
      </div>
      

      {/* Incluir el ModalIniciarEnVivo */}
      <ModalIniciarEnVivo 
        show={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmTranscription} 
      />
    </header>
  );
};

export default TeacherHeader;

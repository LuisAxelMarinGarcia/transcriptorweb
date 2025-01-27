// src/components/organisms/Estudiante/HeaderGenericoEstudiante.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import styles from '../../../assets/style/Estudiante/HeaderGenericoEstudiante.module.css'; 
import Logo from '../../atoms/LogoTranscribeme'; 
import Avatar from '../../atoms/AvatarPerfil';
import IconHome from '../../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../../assets/imgs/clasesArchivadas.png';
import iconLive from '../../../assets/imgs/iconEnVivo.png'; 

const EstudianteHeader = ({ view, classId, name, students, teacherName, status }) => {
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Función que maneja el clic del botón "Unirme en vivo"
  const handleJoinLive = () => {
    // Navegar a /student/:classId con state
    navigate(`/student/${classId}`, { 
      state: {
        name,
        students,
        teacherName,
        status,
      }
    });
  };

  const renderHeaderContent = () => {
    switch(view) {
      case 'clases-inscritas':
        return (
            <div className={styles.ContainerTitleArchivados}>
              <h1 className={styles.titleMateriaArchivado}>
                <i className="fas fa-book"></i> Clases Inscritas
                <img src={IconHome} alt="Icon-Home" className={styles.IconoHome} />
              </h1>
            </div>
        );
        
      case 'clases-archivadas':
        return (
              <div className={styles.ContainerTitleArchivados}>
                <h1 className={styles.titleMateriaArchivado}>
                    <i className="fas fa-book"></i> Clases archivadas
                    <img src={clasesArchivadas} alt="Icon-Home" className={styles.IconoArchivado} />
                </h1>
              </div>
            );
            
      case 'Clase-unirme-a-transcripcion':
        return (
          <div className={styles.transcriptionContent}>
            <button className={styles.transcriptionButton} onClick={handleJoinLive}>
              <span className={styles.hiddenText}>Unirme en vivo </span><img src={iconLive} alt="Icono de transmisión en vivo" className={styles.icon} />
            </button>
          </div>
        );

      case 'Unirme-a-una-clase': 
        return null; // No renderiza ningún contenido

      default:
        return null;
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.content}>
        {renderHeaderContent()}
      </div>
      <div className={styles.containerAvatar}>
        <Avatar size="medium" />
      </div>
      
    </div>
  );
};

export default EstudianteHeader;

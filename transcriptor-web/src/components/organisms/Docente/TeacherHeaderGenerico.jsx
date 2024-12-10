// TeacherHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/style/Docente/TeacherHeaderGenerico.module.css';
import Logo from '../../atoms/LogoTranscribeme'; 
import Avatar from '../../atoms/AvatarPerfil';
import IconHome from '../../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../../assets/imgs/clasesArchivadas.png';
import iconLive from '../../../assets/imgs/iconEnVivo.png';

const TeacherHeader = ({ view, classId, transcriptionStatus, classData }) => { // Añadir classData como prop
  const navigate = useNavigate();

  const handleTranscriptionClick = () => {
    if (classId && classData) { // Asegurarse de que classData está disponible
      navigate(`/docente/${classId}`, { state: { ...classData } }); // Pasar el state
    } else {
      console.error('No se proporcionó classId o classData para la transcripción.');
    }
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

            <button className={styles.createClassButton} onClick={handleTranscriptionClick}>
              Crear clase <i className="fas fa-plus-circle"></i>
            </button>
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

      case 'transcripcion':
        return (
          <div className={styles.transcriptionContent}>
            <button 
              className={`${styles.transcriptionButton} ${ transcriptionStatus === 'ARCHIVADO' ? styles.archivedButton : ''}`}  
              onClick={handleTranscriptionClick}
            >
              Iniciar transcripción en vivo <img src={iconLive} alt="Icono de transmisión en vivo" className={styles.icon} />
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
      
      <Avatar size="medium" />
    </header>
  );
};

export default TeacherHeader;

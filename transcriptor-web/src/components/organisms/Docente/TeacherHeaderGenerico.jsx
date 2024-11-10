import React from 'react';
import styles from '../../../assets/style/Docente/TeacherHeaderGenerico.module.css'; // Asegúrate de tener los estilos correspondientes
import Logo from '../../atoms/LogoTranscribeme'; 
import Avatar from '../../atoms/AvatarPerfil';
import IconHome from '../../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../../assets/imgs/clasesArchivadas.png';
import iconLive from '../../../assets/imgs/iconEnVivo.png'; // Ajusta la ruta según la ubicación de tu archivo

const TeacherHeader = ({ view , onOpenModal, transcriptionStatus}) => {
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
            <button className={`${styles.transcriptionButton} ${ transcriptionStatus === 'ARCHIVADO' ? styles.archivedButton : ''}`}  onClick={onOpenModal}>
              
              Iniciar transcripción en vivo <img src={iconLive} alt="Icono de transmisión en vivo" className={styles.icon} />
            </button>
          </div>
          
        );
      case 'CrearMaterial': // Nueva vista vacía
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

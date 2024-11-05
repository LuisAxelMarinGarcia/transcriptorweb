import React from 'react';
import styles from '../../../assets/style/Estudiante/HeaderGenericoEstudiante.module.css'; // Asegúrate de tener los estilos correspondientes
import Logo from '../../atoms/LogoTranscribeme'; 
import Avatar from '../../atoms/AvatarPerfil';
import IconHome from '../../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../../assets/imgs/clasesArchivadas.png';
import iconLive from '../../../assets/imgs/iconEnVivo.png'; // Ajusta la ruta según la ubicación de tu archivo

const EstudianteHeader = ({ view }) => {
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
            <button className={styles.transcriptionButton}>
              Unirme en vivo <img src={iconLive} alt="Icono de transmisión en vivo" className={styles.icon} />
            </button>
          </div>
        );

      case 'Unirme-a-una-clase': // Nueva vista vacía
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
      
      <Avatar size="medium" />
      
    </div>
  );
};

export default EstudianteHeader;

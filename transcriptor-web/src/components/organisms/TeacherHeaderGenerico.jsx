import React from 'react';
import styles from '../../assets/style/TeacherHeaderGenerico.module.css'; // Asegúrate de tener los estilos correspondientes
import Logo from '../atoms/LogoTranscribeme'; 
import Avatar from '../atoms/AvatarPerfil';
import IconHome from '../../assets/imgs/IconHome.png';
import clasesArchivadas from '../../assets/imgs/clasesArchivadas.png';

const TeacherHeader = ({ view , onOpenModal}) => {
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
                </h1>;
              </div>
            );
      case 'transcripcion':
        return (
          <button className={styles.transcriptionButton}>
            Iniciar transcripción en vivo <i className="fas fa-broadcast-tower"></i>
          </button>
        );
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

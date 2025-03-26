// HomeMateria.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import Footer from "../../organisms/Footer";
import HeaderClase from '../../organisms/Docente/HeaderHomeClase';
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';
import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';
import ModalArchivedTranscription from '../../organisms/Docente/ModalEnVivoNODisponible'; // Modal para transcripción archivada
import styles from '../../../assets/style/Docente/ClaseHome.module.css';

const HomeMateria = ({
  title,
  studentCount,
  codeClass,
  name,
  teacherName,
  classGroup,
  status,
  classStatus
}) => {
  const { classId } = useParams();
  //console.log('[HomeMateria] classId:', classId);

  const [transcriptionStatus, setTranscriptionStatus] = useState('DISPONIBLE');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classData = { name, students: studentCount, teacherName, classGroup, classCode: codeClass, status };

  const handleOpenModal = () => {
    //console.log(`Abriendo modal de transcripción con estado: ${transcriptionStatus}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    //console.log('Modal cerrado');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.SpaceSiderbar}>
          <SidebarGenerico />
        </div>

        <div className={styles.container}>
          <div className={styles.HeaderContainer}>
            <Header 
              view="transcripcion" 
              classId={classId} // Pasamos classId como prop
              transcriptionStatus={transcriptionStatus} // Opcional
              classData={classData} // Pasar classData
              classStatus={classStatus}
            />
          </div>

          <div className={styles.OtherContainer}>
            <div className={styles.HeaderClass}>
              <HeaderClase
                title={title}
                studentCount={studentCount}
                codeClass={codeClass}
                classId={classId}
                name={name}
                teacherName={teacherName}
                classGroup={classGroup}
                classStatus={classStatus}
              />
            </div>

            
            <div className={styles.ContainerCards}>
              <ClassListTypeContent 
                classId={classId}
                status={transcriptionStatus} 
                typeFilter="all"
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {transcriptionStatus === 'ACTIVO' ? (
        <ModalTranscription show={isModalOpen} onClose={handleCloseModal} />
      ) : transcriptionStatus === 'ARCHIVADO' ? (
        <ModalArchivedTranscription show={isModalOpen} onClose={handleCloseModal} />
      ) : null}
    </>
  );
};

export default HomeMateria;

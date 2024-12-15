// TranscripcionesClaseDocente.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/ClaseHome.module.css';
import Footer from "../../organisms/Footer";
import HeaderClase from '../../organisms/Docente/HeaderHomeClase';
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';

import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const TranscripcionesClaseDocente = ({ 
  title, 
  studentCount, 
  codeClass, 
  classId, 
  name, 
  teacherName, 
  classGroup, 
  status,
  typeFilter,
  classStatus // Nueva prop para el filtro
}) => {
  // const { classId: urlClassId } = useParams(); // Eliminado para evitar redundancia
  console.log('[TranscripcionesClaseDocente] classId:', classId);

  const [transcriptionStatus, setTranscriptionStatus] = useState('DISPONIBLE');

  const classData = { name, students: studentCount, teacherName, classGroup, classCode: codeClass, status };

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
                typeFilter={typeFilter} // Pasamos el filtro
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Modal para transcripción en vivo (Opcional, si lo mantienes) */}
      {/* <ModalTranscription show={isModalOpen} onClose={handleCloseModal} /> */}
    </>
  );
};

export default TranscripcionesClaseDocente;

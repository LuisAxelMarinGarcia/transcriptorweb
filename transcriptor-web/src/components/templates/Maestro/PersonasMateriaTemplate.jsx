// src/components/templates/Maestro/PersonasMateriaTemplate.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/ClasePersons.module.css';
import Footer from "../../organisms/Footer";
import HeaderClase from '../../organisms/Docente/HeaderHomeClase';
import PeopleList from '../../organisms/Docente/ClassListPersons';
import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';
import teacherImage from "../../../assets/imgs/DocenteFoto.png"; // Importa la imagen por defecto del maestro

const PersonasMateriaTemplate = ({ title, studentCount, codeClass, classId, name, teacherName, classGroup, classStatus }) => {
  console.log('PersonasMateriaTemplate Props:', { title, studentCount, codeClass, classId, name, teacherName, classGroup, classStatus });
  const [transcriptionStatus, setTranscriptionStatus] = useState('DISPONIBLE');
  // Estado que guarda qué pestaña está activa (Todos o Baja)
  const [activeTab, setActiveTab] = useState("Todos");

  // Función para cambiar la pestaña activa cuando se hace clic en una de ellas
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Modal abierto');
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    console.log('Modal cerrado');
    setIsModalOpen(false);
  };

  // Determinar el valor de view basado en la pestaña activa
  const getView = () => {
    if (activeTab === "Todos") return "docenteYAlumnos";
    if (activeTab === "Baja") return "baja";
    return "docenteYAlumnos"; // Valor por defecto
  };

  const classData = { name, students: studentCount, teacherName, classGroup, classCode: codeClass, status };

  return(
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
                classId={classId}           // Pasar classId como prop
                name={name}                 // Pasar el nombre de la clase
                teacherName={teacherName}   // Pasar el nombre del profesor
                classGroup={classGroup}     // Pasar el grupo de la clase
                classStatus={classStatus}
              />
            </div>

            <div className={styles.OptionsPersons}>
              <div className={`${styles.PersonsAll} ${activeTab === "Todos" ? styles.active : ""}`} onClick={() => handleTabClick("Todos")}>
                <h1>Todos</h1>
              </div>

              <div className={`${styles.PersonsBaja} ${activeTab === "Baja" ? styles.active : ""}`} onClick={() => handleTabClick("Baja")}>
                <h1>Baja</h1>
              </div>
            </div>

            <div className={styles.TypePersons}>
              <PeopleList
                type="alumno"
                view={getView()} // Determinar la vista basada en la pestaña activa
                classId={classId} // Pasar classId si es necesario en PeopleList
                teacherName={teacherName} // Pasar el nombre del maestro
                teacherImage={teacherImage} // Pasar la imagen por defecto del maestro
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Modal para transcripción en vivo */}
      <ModalTranscription show={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

PersonasMateriaTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  studentCount: PropTypes.number.isRequired,
  codeClass: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  classGroup: PropTypes.string.isRequired,
};

export default PersonasMateriaTemplate;

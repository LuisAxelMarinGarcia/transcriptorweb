// MaterialDidactico.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/MaterialDidacticoClase.module.css';
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase';
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';
import iconoMaterial from '../../../assets/imgs/iconAgregar.png';

import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';
import ModalSubirMaterialNOdisponible from '../../organisms/Docente/ModalSubirMaterialNOdisponible';

const MaterialDidactico = ({ title, studentCount, codeClass, classId, name, students, teacherName, classGroup, materialStatus, typeFilter, classStatus }) => {

    console.log('[MaterialDidactico] Props recibidas:', {
        title,
        studentCount,
        codeClass,
        classId,
        name,
        students,
        teacherName,
        classGroup,
        materialStatus,
        classStatus
    });
  const [transcriptionStatus, setTranscriptionStatus] = useState('DISPONIBLE');

  const classData = { name, students: studentCount, teacherName, classGroup, classCode: codeClass, status };

  
    const [isTranscriptionModalOpen, setIsTranscriptionModalOpen] = useState(false);
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

    const navigate = useNavigate();

    // Controla el modal de transcripción en vivo al hacer clic en el botón del Header
    const handleOpenTranscriptionModal = () => {
        setIsTranscriptionModalOpen(true);
    };

    const handleCloseTranscriptionModal = () => {
        setIsTranscriptionModalOpen(false);
    };

    // Controla el modal de "Subir Material No Disponible" al hacer clic en el botón Subir Material, solo si está archivado
    const handleOpenMaterialModal = () => {
        if (materialStatus === 'ARCHIVADO') {
            setIsMaterialModalOpen(true);
        } else {
            // Si no está archivado, lleva a la vista para subir material
            navigate('/docente-crear-material', {
              state: {
                classId,
                name,
                students,
                teacherName,
                classGroup,
                classCode: codeClass,
                status: 'DISPONIBLE'
              }
            });
        }
    };

    const handleCloseMaterialModal = () => {
        setIsMaterialModalOpen(false);
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
                        {/* SUBIR MATERIAL */}
                        <div className={styles.SubirMaterial}>
                            <button
                                className={`${styles.botonSubirMaterial} ${materialStatus === 'ARCHIVADO' ? styles.SubirMaterialArchived : ''}`}
                                onClick={handleOpenMaterialModal}
                            >
                                <img src={iconoMaterial} alt="Ícono de subir material" className={styles.iconoMaterial} />
                                Subir Material
                            </button>
                        </div>

                        {/* CARDS */}
                        <div className={styles.ContainerCards}>
                            <ClassListTypeContent 
                              classId={classId} 
                              status="DISPONIBLE" 
                              typeFilter={typeFilter} // Pasamos el filtro
                            />
                        </div>

                    </div>
                    {/* FOOTER */}
                    <div className={styles.FooterContainer}>
                        <Footer />
                    </div>
                </div>
            </div>

            {/* Modal para transcripción en vivo (solo se abre desde el botón del Header) */}
            <ModalTranscription
                show={isTranscriptionModalOpen}
                onClose={handleCloseTranscriptionModal}
            />

            {/* Modal para "Subir Material No Disponible" (solo se abre si el material está archivado y se hace clic en el botón Subir Material) */}
            <ModalSubirMaterialNOdisponible
                show={isMaterialModalOpen}
                onClose={handleCloseMaterialModal}
            />
        </>
    );
};

export default MaterialDidactico;

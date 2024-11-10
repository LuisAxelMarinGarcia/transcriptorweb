import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/ClaseHome.module.css'
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase'
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';


import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';
import ModalArchivedTranscription from '../../organisms/Docente/ModalEnVivoNODisponible'; // Importa el modal para transcripción archivada

const HomeMateria = ({ title, studentCount,codeClass }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transcriptionStatus] = useState('ARCHIVADO'); 
    

    const handleOpenModal = () => {
        if (transcriptionStatus === 'ACTIVO') {
            console.log('Modal de transcripción en vivo abierto');
            setIsModalOpen(true);
        } else if (transcriptionStatus === 'ARCHIVADO') {
            console.log('Modal de transcripción archivada abierto');
            setIsModalOpen(true); // Usamos el mismo estado para ambos, pero mostramos el modal adecuado en el render
        }
    };
    
    const handleCloseModal = () => {
        console.log('Modal cerrado');
        setIsModalOpen(false);
    };

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>

                <div className={styles.container}>
                    
                    <div className={styles.HeaderContainer}>
                        <Header view="transcripcion" onOpenModal={handleOpenModal} transcriptionStatus={transcriptionStatus}/>
                    </div>

                    <div className={styles.OtherContainer}>

                        
                        <div className={styles.HeaderClass}>
                            <HeaderClase
                                    title={title}
                                    studentCount={studentCount}
                                    codeClass={codeClass}
                            />
                        </div>

                        <div className={styles.ContainerCards}>
                            <ClassListTypeContent typeFilter="all"/>
                        </div>
                        
                    </div>
                    <Footer />

                </div>
            </div>

            {transcriptionStatus === 'ACTIVO' ? (
                <ModalTranscription show={isModalOpen} onClose={handleCloseModal} />
            ) : (
                <ModalArchivedTranscription show={isModalOpen} onClose={handleCloseModal} />
            )}
            
        </>
    );
};

export default HomeMateria;
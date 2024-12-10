import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/VerTranscripciones.module.css'
import Footer from "../../organisms/Footer";


import HeaderClase from '../../organisms/Docente/HeaderHomeClase'
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';

import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const VerTranscripcion = ({ title, studentCount,codeClass }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        console.log('Modal abierto');
        setIsModalOpen(true);
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
                        <Header view="transcripcion" onOpenModal={handleOpenModal} />
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
                            <ClassListTypeContent typeFilter="transcription" titleFilter="Transcripción de clase 1" />
                        </div>
                        
                        <div  className={styles.Pdf}>
                            <iframe
                                src="../EjemploTranscripcion.pdf" // Asegúrate de que el archivo PDF esté en la carpeta public
                                width="100%"
                                height="100%"
                                title="PDF Viewer"
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

export default VerTranscripcion;
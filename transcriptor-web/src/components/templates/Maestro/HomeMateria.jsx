import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/ClaseHome.module.css'
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase'
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';


import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const HomeMateria = ({ title, studentCount,codeClass }) => {

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
                    
                    <Header view="transcripcion" onOpenModal={handleOpenModal} />
                    
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

            {/* Modal para transcripción en vivo */}
            <ModalTranscription show={isModalOpen} onClose={handleCloseModal} />
            
        </>
    );
};

export default HomeMateria;
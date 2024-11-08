import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/MaterialDidacticoClase.module.css'
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase'
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';
import iconoMaterial from '../../../assets/imgs/iconAgregar.png'


import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const MaterialDidactico = ({ title, studentCount,codeClass }) => {

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

                        <div className={styles.SubirMaterial}>
                            <button className={styles.botonSubirMaterial}>
                                <img src={iconoMaterial} alt="Ícono de subir material" className={styles.iconoMaterial} />
                                Subir Material
                            </button>
                        </div>

                        <div className={styles.ContainerCards}>
                            <ClassListTypeContent typeFilter="file"/>
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

export default MaterialDidactico;
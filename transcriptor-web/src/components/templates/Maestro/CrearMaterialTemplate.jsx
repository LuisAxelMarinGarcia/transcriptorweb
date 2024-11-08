import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/CrearMaterialClase.module.css'
import Footer from "../../organisms/Footer";

import iconCancelar from '../../../assets/imgs/cancelar.png';
import iconMaterial from '../../../assets/imgs/material.png';

import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const CrearMaterial = ({ title, studentCount,codeClass }) => {

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

                        <div className={styles.SectionTitle}>
                            
                            <div className={styles.sectionOne}>
                                <img src={iconCancelar} alt="Primer icono" className={styles.iconImage} />
                                <img src={iconMaterial} alt="Segundo icono" className={styles.clickableIcon} />
                                Crear Material Didactico
                            </div>

                            <div className={styles.sectionTwo}>
                                <button className={styles.BotonCrear}>Publicar</button>
                            </div>

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

export default CrearMaterial;
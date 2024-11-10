import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/MaterialDidacticoClase.module.css'
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase'
import ClassListTypeContent from '../../organisms/Docente/ClassListTypeContent';
import iconoMaterial from '../../../assets/imgs/iconAgregar.png'


import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';
import ModalSubirMaterialNOdisponible from '../../organisms/Docente/ModalSubirMaterialNOdisponible';

const MaterialDidactico = ({ title, studentCount,codeClass }) => {

    const [isTranscriptionModalOpen, setIsTranscriptionModalOpen] = useState(false);
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
    const [materialStatus, setMaterialStatus] = useState('ACTIVE'); // Estado para el botón de subir material

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
        }
    };

    const handleCloseMaterialModal = () => {
        setIsMaterialModalOpen(false);
    };


    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>

                <div className={styles.container}>
                    
                    <div className={styles.HeaderContainer}>
                        <Header view="transcripcion" onOpenModal={handleOpenTranscriptionModal} />
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
                            <button    className={`${styles.botonSubirMaterial} ${materialStatus === 'ARCHIVADO' ? styles.SubirMaterialArchived : ''}`}
                                onClick={handleOpenMaterialModal}  >
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

            {/* Modal para transcripción en vivo (solo se abre desde el botón del Header) */}
            <ModalTranscription show={isTranscriptionModalOpen} onClose={handleCloseTranscriptionModal} />

            {/* Modal para "Subir Material No Disponible" (solo se abre si el material está archivado y se hace clic en el botón Subir Material) */}
            <ModalSubirMaterialNOdisponible show={isMaterialModalOpen} onClose={handleCloseMaterialModal} />
            
        </>
    );
};

export default MaterialDidactico;
import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/ClasePersons.module.css'
import Footer from "../../organisms/Footer";

import HeaderClase from '../../organisms/Docente/HeaderHomeClase';
import PeopleList from '../../organisms/Docente/ClassListPersons';


import ModalTranscription from '../../organisms/Docente/ModaliniciarEnVivo';

const PersonasMateriaTemplate = ({ title, studentCount,codeClass }) => {

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

                        <div className={styles.OptionsPersons}>
                            <div className={`${styles.PersonsAll} ${activeTab === "Todos" ? styles.active : ""}`} onClick={() => handleTabClick("Todos")}>
                                <h1>
                                    Todos
                                </h1>
                            </div>

                            <div className={`${styles.PersonsBaja} ${activeTab === "Baja" ? styles.active : ""}`} onClick={() => handleTabClick("Baja")}>
                                <h1>
                                    Baja
                                </h1>
                            </div>

                        </div>

                        <div className={styles.TypePersons}>
                            <PeopleList
                                    type="alumno"
                                    view={activeTab === "Todos" ? "docenteYAlumnos" : "baja"}
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

export default PersonasMateriaTemplate;
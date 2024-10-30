import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/HomeDocente.module.css'
import ClassList from "../../organisms/Docente/ClassList";
import Footer from "../../organisms/Footer";

import ModalCrearClase from '../../organisms/Docente/ModalCrearClase';

const HomeTemplate = () => {

    // Añade el estado y las funciones para el modal
    const [showModalCrearClase, setShowModalCrearClase] = useState(false);

    const handleOpenModalCrearClase = () => setShowModalCrearClase(true);
    const handleCloseModalCrearClase = () => setShowModalCrearClase(false);

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>
                
                <div className={styles.container}>
                    <Header view="materias" onOpenModal={handleOpenModalCrearClase} />
                    
                    <div className={styles.OtherContainer}>

                        <ClassList statusFilter="active" />
                    </div>
                    <Footer />

                </div>
            </div>
            <ModalCrearClase show={showModalCrearClase} onClose={handleCloseModalCrearClase} />
        </>
    );
};

export default HomeTemplate;
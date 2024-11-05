import React, { useState } from 'react';

import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Docente/HomeDocente.module.css'
import ClassList from "../../organisms/Estudiante/ClassListEstudiante";
import Footer from "../../organisms/Footer";


const HomeTemplate = () => {

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>

                
                
                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header view="clases-inscritas"/>
                    </div>
                    
                    <div className={styles.OtherContainer}>

                        <ClassList statusFilter="active" />
                    </div>
                    <Footer />

                </div>
            </div>
        </>
    );
};

export default HomeTemplate;
import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/HomeDocente.module.css'
import ClassList from "../../organisms/Docente/ClassList";
import Footer from "../../organisms/Footer";

const ClasesArchivadas = () => {



    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>

                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header view="clases-archivadas"/>
                    </div>
                    
                    <div className={styles.OtherContainer}>

                        <ClassList statusFilter="archived"/>
                    </div>
                    <Footer />

                </div>
            </div>
            
        </>
    );
};

export default ClasesArchivadas;
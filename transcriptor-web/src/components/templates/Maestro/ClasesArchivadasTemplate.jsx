import React, { useState } from 'react';
import Header from '../../organisms/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/SidebarGenerico'
import styles from '../../../assets/style/HomeDocente.module.css'
import ClassList from "../../organisms/ClassList";
import Footer from "../../organisms/Footer";

const ClasesArchivadas = () => {



    return(
        <>
            <div className={styles.flex}>
                <SidebarGenerico />
                <div className={styles.container}>
                    <Header view="clases-archivadas"/>
                    
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
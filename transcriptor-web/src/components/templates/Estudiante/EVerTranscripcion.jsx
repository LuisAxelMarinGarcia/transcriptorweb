// src/components/templates/Estudiante/EVerTranscripcion.jsx

import React from 'react';
import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante ';
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante';
import styles from '../../../assets/style/Estudiante/VerTranscripcion.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ClassListTypeContentE from '../../organisms/Estudiante/ClassListContentType';

const EVerTranscripcion = ({ title, studentCount, teacherName, classId }) => {
    console.log('[EVerTranscripcion.jsx] Props recibidos:', { classId, title, studentCount, teacherName });

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                    <SidebarGenerico />
                </div>
                
                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header
                            view="Clase-unirme-a-transcripcion"
                            classId={classId}
                            name={title}
                            students={studentCount}
                            teacherName={teacherName}
                            status="NO ARCHIVADO" // Pasar status si es necesario
                        />
                    </div>
                    
                    <div className={styles.OtherContainer}>

                        <div className={styles.HeaderClass}>
                            <HeaderDeClase
                                title={title}
                                studentCount={studentCount}
                                teacherName={teacherName}
                            />
                        </div>
                        
                        <div className={styles.ContainerCards}>
                            <ClassListTypeContentE 
                                classId={classId}         
                                status="DISPONIBLE"       
                                typeFilter="TRANSCRIPCION" // Aquí aplicamos el filtro TRANSCRIPCION
                            />
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default EVerTranscripcion;

import React, { useState } from 'react';
import styles from '../../../assets/style/Estudiante/ClaseHeaderEstudiante.module.css'; // Verifica la ruta correcta
import UsersIcon from '../../../assets/imgs/Users.png';

//Íconos

import iconPersonas from '../../../assets/imgs/IconPersonas.png';
import iconPanel from '../../../assets/imgs/IconPanel.png';
import iconMaterialDidactico from '../../../assets/imgs/iconMaterial.png';
import iconTranscripcion from '../../../assets/imgs/iconTranscripcion.png';
import iconTeacher from '../../../assets/imgs/IconDocente.png';

const HeaderHomeMateria = ({title, studentCount, teacherName}) => {

    return (

        <div className={styles.headerContent}>
            <div className={styles.titleInfo}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.teacherInfo}>
                    <img src={UsersIcon} alt="Icon Docente" className={styles.teacherIcon}/>
                    <p className={styles.studentCount}> {studentCount} </p>
                </div>
            </div>

            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <img src={iconPersonas} alt="Icono de Personas" className={styles.icon} />
                        <a href="#home">Personas</a>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconPanel} alt="Icono de Panel" className={styles.icon} />
                        <a href="#about">Panel</a>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconMaterialDidactico} alt="Icono de Material Didáctico" className={styles.icon} />
                        <a href="#services">Material didáctico</a>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconTranscripcion} alt="Icono de Transcripciones" className={styles.icon} />
                        <a href="#contact">Transcripciones</a>
                    </li>
                </ul>
                <div className={styles.CodeClass}>
                    <p className={styles.teacherInfoContainer}>

                    <img src={iconTeacher} alt="Icono del Teacher" className={styles.iconTeacher} />
                    <span className={styles.labelText}>{teacherName}</span>
                        
                    </p>
                </div>
                
            </div>
            
        </div>

    )
}

export default HeaderHomeMateria;
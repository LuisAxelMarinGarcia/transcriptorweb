// src/components/organisms/Estudiante/HeaderHomeMateria.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importar useNavigate y useParams
import styles from '../../../assets/style/Estudiante/ClaseHeaderEstudiante.module.css'; // Verifica la ruta correcta
import UsersIcon from '../../../assets/imgs/Users.png';

// Íconos
import iconPersonas from '../../../assets/imgs/IconPersonas.png';
import iconPanel from '../../../assets/imgs/IconPanel.png';
import iconMaterialDidactico from '../../../assets/imgs/iconMaterial.png';
import iconTranscripcion from '../../../assets/imgs/iconTranscripcion.png';
import iconTeacher from '../../../assets/imgs/IconDocente.png';

const HeaderHomeMateria = ({ title, studentCount, teacherName, classGroup, codeClass, classStatus }) => {
    const navigate = useNavigate(); // Inicializar el hook
    const { classId } = useParams(); // Obtener classId desde la URL

    console.log('[HeaderHomeMateria.jsx] Props recibidas:', { title, studentCount, teacherName, classGroup, codeClass, classId, classStatus });

    // Función para manejar el click en "Personas"
    const handlePersonasClick = () => {
        if (!classId) {
            console.error('[HeaderHomeMateria] classId es undefined. No se puede navegar.');
            alert('No se pudo navegar a Personas de la Clase: ID de clase no definido.');
            return;
        }

        console.log(`[HeaderHomeMateria] Navegando a Personas con classId: ${classId}`);
        console.log('[HeaderHomeMateria] Datos enviados:', {
            classId,
            name: title,
            students: studentCount,
            teacherName,
            classGroup,
            classCode: codeClass,
        });

        navigate(`/estudiante-personas-clase/${classId}`, {
            state: {
                classId,
                name: title,
                students: studentCount,
                teacherName,
                classGroup,
                classCode: codeClass,
            }
        });
    };

    // Funciones para otros botones (Panel, Material Didáctico, Transcripciones)
    const handlePanelClick = () => {
        if (!classId) {
            console.error('[HeaderHomeMateria] classId es undefined. No se puede navegar.');
            alert('No se pudo navegar a Personas de la Clase: ID de clase no definido.');
            return;
        }

        console.log(`[HeaderHomeMateria] Navegando a Personas con classId: ${classId}`);
        console.log('[HeaderHomeMateria] Datos enviados:', {
            classId,
            name: title,
            students: studentCount,
            teacherName,
            classGroup,
            classCode: codeClass,
            classStatus
        });

        navigate(`/estudiante-home-clase/${classId}`, {
            state: {
                classId,
                name: title,
                students: studentCount,
                teacherName,
                classGroup,
                classCode: codeClass,
                classStatus
            }
        });
    };

    const handleMaterialDidacticoClick = () => {
        if (!classId) {
            console.error('[HeaderHomeMateria] classId es undefined. No se puede navegar.');
            alert('No se pudo navegar a Personas de la Clase: ID de clase no definido.');
            return;
        }

        console.log(`[HeaderHomeMateria] Navegando a Personas con classId: ${classId}`);
        console.log('[HeaderHomeMateria] Datos enviados:', {
            classId,
            name: title,
            students: studentCount,
            teacherName,
            classGroup,
            classCode: codeClass,
        });

        navigate(`/estudiante-material-didactico-clase/${classId}`, {
            state: {
                classId,
                name: title,
                students: studentCount,
                teacherName,
                classGroup,
                classCode: codeClass,
            }
        });
    };

    const handleTranscripcionesClick = () => {
        if (!classId) {
            console.error('[HeaderHomeMateria] classId es undefined. No se puede navegar.');
            alert('No se pudo navegar a Personas de la Clase: ID de clase no definido.');
            return;
        }

        console.log(`[HeaderHomeMateria] Navegando a Personas con classId: ${classId}`);
        console.log('[HeaderHomeMateria] Datos enviados:', {
            classId,
            name: title,
            students: studentCount,
            teacherName,
            classGroup,
            classCode: codeClass,
        });

        navigate(`/estudiante-transcripciones-clase/${classId}`, {
            state: {
                classId,
                name: title,
                students: studentCount,
                teacherName,
                classGroup,
                classCode: codeClass,
            }
        });
    };

    return (
        <div className={styles.headerContent}>
            <div className={styles.titleInfo}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.teacherInfo}>
                    <img src={UsersIcon} alt="Icon Docente" className={styles.teacherIcon} />
                    <p className={styles.studentCount}>{studentCount}</p>
                </div>
            </div>

            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <img src={iconPersonas} alt="Icono de Personas" className={styles.icon} />
                        <button onClick={handlePersonasClick} className={styles.navButton}>
                            Personas
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconPanel} alt="Icono de Panel" className={styles.icon} />
                        <button onClick={handlePanelClick} className={styles.navButton}>
                            Panel
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconMaterialDidactico} alt="Icono de Material Didáctico" className={styles.icon} />
                        <button onClick={handleMaterialDidacticoClick} className={styles.navButton}>
                            Material didáctico
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <img src={iconTranscripcion} alt="Icono de Transcripciones" className={styles.icon} />
                        <button onClick={handleTranscripcionesClick} className={styles.navButton}>
                            Transcripciones
                        </button>
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
    );
}

export default HeaderHomeMateria;

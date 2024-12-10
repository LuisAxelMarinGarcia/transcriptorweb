// src/components/organisms/Docente/HeaderClase.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importar Link y useNavigate
import styles from '../../../assets/style/Docente/ClaseHeader.module.css'; 
import UsersIcon from '../../../assets/imgs/Users.png';

// Íconos
import iconPersonas from '../../../assets/imgs/IconPersonas.png';
import iconPanel from '../../../assets/imgs/IconPanel.png';
import iconMaterialDidactico from '../../../assets/imgs/iconMaterial.png';
import iconTranscripcion from '../../../assets/imgs/iconTranscripcion.png';

const HeaderClase = ({ title, studentCount, codeClass, classId, name, teacherName, classGroup }) => {
  const navigate = useNavigate();  // Inicializar el hook

  // Función para manejar el click en "Material Didáctico"
  const handleMaterialDidacticoClick = () => {
    console.log(`[HeaderClase] Navegando a Material Didáctico con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount, // Asegúrate de usar 'studentCount' aquí
      teacherName,
      classGroup,
      classCode: codeClass,
    });
    navigate(`/docente-material-didactico/${classId}`, {
      state: {
        classId,         // Pasar el classId (UUID)
        name,            // Nombre de la clase
        students: studentCount, // Cantidad de estudiantes
        teacherName,     // Nombre del profesor
        classGroup,      // Grupo de clase
        classCode: codeClass, // Código de clase
      }
    });
  };

  // Función para manejar el click en "Transcripciones"
  const handleTranscripcionesClick = () => {
    console.log(`[HeaderClase] Navegando a Transcripciones con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount, // Asegúrate de usar 'studentCount' aquí
      teacherName,
      classGroup,
      classCode: codeClass,
      status: 'DISPONIBLE'
    });
    navigate(`/transcripciones-docente/${classId}`, {  // Navega a /transcripciones-docente/:classId
      state: {
        classId,         // Pasar el classId (UUID)
        name,            // Nombre de la clase
        students: studentCount, // Cantidad de estudiantes
        teacherName,     // Nombre del profesor
        classGroup,      // Grupo de clase
        classCode: codeClass, // Código de clase
        status: 'DISPONIBLE'   // Puedes cambiar esto según lo que necesites
      }
    });
  };

  return (
    <div className={styles.headerContent}>
      <div className={styles.titleInfo}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.teacherInfo}>
          <img src={UsersIcon} alt="Icon Docente" className={styles.teacherIcon} />
          <p className={styles.studentCount}> {studentCount} </p>
        </div>
      </div>

      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          {/* Opción 1: Usar <Link> para "Personas" */}
          <li className={styles.navItem}>
            <img src={iconPersonas} alt="Icono de Personas" className={styles.icon} />
            <Link 
              to={`/docente-personas-materia/${classId}`} 
              state={{ 
                classId, 
                name, 
                students: studentCount, 
                teacherName, 
                classGroup, 
                classCode: codeClass 
              }}
              className={styles.navLink}  // Asegúrate de definir estilos para navLink
            >
              Personas
            </Link>
          </li>

          {/* Opción 2: Usar <Link> para "Panel" */}
          <li className={styles.navItem}>
            <img src={iconPanel} alt="Icono de Panel" className={styles.icon} />
            <Link 
              to={`/panel-clase/${classId}`} 
              state={{ 
                classId, 
                name, 
                students: studentCount, 
                teacherName, 
                classGroup, 
                classCode: codeClass 
              }}
              className={styles.navLink}
            >
              Panel
            </Link>
          </li>

          {/* "Material Didáctico" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconMaterialDidactico} alt="Icono de Material Didáctico" className={styles.icon} />
            <button onClick={handleMaterialDidacticoClick} className={styles.navButton}>
              Material didáctico
            </button>
          </li>

          {/* "Transcripciones" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconTranscripcion} alt="Icono de Transcripciones" className={styles.icon} />
            <button onClick={handleTranscripcionesClick} className={styles.navButton}>
              Transcripciones
            </button>
          </li>
        </ul>
        <div className={styles.CodeClass}>
          <p>
            <span className={styles.labelText}>Código de Clase: </span>
            <span className={styles.codeText}>{codeClass}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderClase;

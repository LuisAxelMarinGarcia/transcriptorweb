// src/components/organisms/Docente/HeaderClase.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../../assets/style/Docente/ClaseHeader.module.css'; 
import UsersIcon from '../../../assets/imgs/Users.png';

// Íconos
import iconPersonas from '../../../assets/imgs/IconPersonas.png';
import iconPanel from '../../../assets/imgs/IconPanel.png';
import iconMaterialDidactico from '../../../assets/imgs/iconMaterial.png';
import iconTranscripcion from '../../../assets/imgs/iconTranscripcion.png';

const HeaderClase = ({ title, studentCount, codeClass, classId, name, teacherName, classGroup, classStatus }) => {
  const navigate = useNavigate();  // Inicializar el hook

  // Función para manejar el click en "Material Didáctico"
  const handleMaterialDidacticoClick = () => {
    console.log(`[HeaderClase] Navegando a Material Didáctico con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount,
      teacherName,
      classGroup,
      classCode: codeClass,
      materialStatus: 'DISPONIBLE', // Cambiado de 'status' a 'materialStatus'
      classStatus // Añadido
    });
    navigate(`/docente-material-didactico/${classId}`, {
      state: {
        classId,
        name,
        students: studentCount,
        teacherName,
        classGroup,
        classCode: codeClass,
        materialStatus: 'DISPONIBLE', // Cambiado de 'status' a 'materialStatus'
        classStatus // Añadido
      }
    });
  };

  // Función para manejar el click en "Transcripciones"
  const handleTranscripcionesClick = () => {
    console.log(`[HeaderClase] Navegando a Transcripciones con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount,
      teacherName,
      classGroup,
      classCode: codeClass,
      status: 'DISPONIBLE', // Mantenemos 'status' para Transcripciones
      classStatus // Añadido
    });
    navigate(`/transcripciones-docente/${classId}`, {  
      state: {
        classId,
        name,
        students: studentCount,
        teacherName,
        classGroup,
        classCode: codeClass,
        status: 'DISPONIBLE', // Mantenemos 'status' para Transcripciones
        classStatus // Añadido
      }
    });
  };

  // Función para manejar el click en "Panel" con navegación programática
  const handlePanelClick = () => {
    console.log(`[HeaderClase] Navegando a Panel con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount,
      teacherName,
      classGroup,
      classCode: codeClass,
      status: 'DISPONIBLE', // Mantenemos 'status' para Transcripciones
      classStatus // Añadido
    });
    navigate(`/docente-home-materia/${classId}`, {
      state: {
        classId,
        name,
        students: studentCount,
        teacherName,
        classGroup,
        classCode: codeClass,
        status: 'DISPONIBLE', // Mantenemos 'status' para Transcripciones
        classStatus // Añadido
      }
    });
  };

  // Función para manejar el click en "Personas"
  const handlePersonasClick = () => {
    console.log(`[HeaderClase] Navegando a Personas con classId: ${classId}`);
    console.log('[HeaderClase] Datos enviados:', {
      classId,
      name,
      students: studentCount,
      teacherName,
      classGroup,
      classCode: codeClass,
      status: 'DISPONIBLE', // Añadimos 'status'
      classStatus // Añadido
    });
    navigate(`/docente-personas-materia/${classId}`, {
      state: {
        classId,
        name,
        students: studentCount,
        teacherName,
        classGroup,
        classCode: codeClass,
        status: 'DISPONIBLE', // Añadimos 'status'
        classStatus // Añadido
      }
    });
  };

  return (
    <div className={styles.headerContent}>
      {/* Condicionalmente renderiza la superposición si la clase está archivada */}
      {classStatus === 'ARCHIVADO' && (
        <div className={styles.archivedOverlay}>
          <p>Esta clase se encuentra archivada</p>
        </div>
      )}

      <div className={styles.titleInfo}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.teacherInfo}>
          <img src={UsersIcon} alt="Icon Docente" className={styles.teacherIcon} />
          <p className={styles.studentCount}>{studentCount}</p>
        </div>
      </div>

      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          {/* "Personas" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconPersonas} alt="Icono de Personas" className={styles.icon} onClick={handlePersonasClick}/>
            <button onClick={handlePersonasClick} className={styles.navButton}>
              Personas
            </button>
          </li>

          {/* "Panel" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconPanel} alt="Icono de Panel" className={styles.icon} onClick={handlePanelClick} />
            <button onClick={handlePanelClick} className={styles.navButton}>
              Panel
            </button>
          </li>

          {/* "Material Didáctico" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconMaterialDidactico} alt="Icono de Material Didáctico" className={styles.icon} onClick={handleMaterialDidacticoClick} />
            <button onClick={handleMaterialDidacticoClick} className={styles.navButton}>
              Material didáctico
            </button>
          </li>

          {/* "Transcripciones" con navegación programática */}
          <li className={styles.navItem}>
            <img src={iconTranscripcion} alt="Icono de Transcripciones" className={styles.icon} onClick={handleTranscripcionesClick}/>
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

HeaderClase.propTypes = {
  title: PropTypes.string.isRequired,
  studentCount: PropTypes.number.isRequired,
  codeClass: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  classGroup: PropTypes.string,
  classStatus: PropTypes.string.isRequired, // Añadido
};

export default HeaderClase;

// src/components/organisms/Estudiante/ECardMateria.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../../assets/style/CardMateria.module.css'; 
import EliminarIcon from '../../../assets/imgs/IconEliminar.png'; 
import ArchivarIcon from '../../../assets/imgs/ArchivarClase.png';

import ModalEArchivarClase from '../../organisms/Estudiante/ModalArchivarClase'; 
import ModalEliminarClase from '../../organisms/Estudiante/EModalEliminarClase';
import ModalDesarchivarClase from '../../organisms/Estudiante/EModalDesarchivarClase'; 

function ECardMateria({ classId, name, students, teacherName, status, classStatus, onStatusChange, onDelete }) {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleStatusChange = (newStatus) => {
    if (typeof onStatusChange === 'function') {
      onStatusChange(classId, newStatus);
    } else {
      console.error('[ECardMateria.jsx] onStatusChange no es una función');
    }
    closeModal();
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      onDelete(classId, classStatus);
    } else {
      console.error('[ECardMateria.jsx] onDelete no es una función');
    }
    closeModal();
  };

  const handleCardClick = () => {
    // Navegar a la página de transcripciones del estudiante, pasando classId
    navigate(`/estudiante-home-clase/${classId}`, { 
      state: { 
        classId, 
        name, 
        students, 
        teacherName, // Ya incluye nombre y apellido
        status,
        classStatus
      } 
    });
  };

  // Determinar el estado actual de la clase de manera segura
  const currentStatus = status ? status.toUpperCase() : 'NO ARCHIVADO';

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <div className={styles.cardStudents}>
            <i className="fas fa-users"></i> {students}
          </div>
        </div>
        {/* Otros elementos del encabezado si es necesario */}
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.teacherName}>{teacherName}</p> {/* Ahora contiene nombre y apellido */}
        <div className={styles.cardActions}>
          {currentStatus === 'NO ARCHIVADO' ? (
            <>
              <button
                className={styles.iconButton}
                onClick={(e) => { e.stopPropagation(); openModal('eliminar'); }}
                title="Eliminar Clase"
                aria-label="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { e.stopPropagation(); openModal('archivar'); }}
                title="Archivar Clase"
                aria-label="Archivar Clase"
              >
                <img src={ArchivarIcon} alt="Archivar" className={styles.icon} />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.iconButton}
                onClick={(e) => { e.stopPropagation(); openModal('eliminar'); }}
                title="Eliminar Clase"
                aria-label="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { e.stopPropagation(); openModal('desarchivar'); }}
                title="Desarchivar Clase"
                aria-label="Desarchivar Clase"
              >
                <img src={ArchivarIcon} alt="Desarchivar" className={styles.icon} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modales */}
      {activeModal === 'archivar' && (
        <ModalEArchivarClase
          show={true}
          onClose={closeModal}
          onConfirm={() => handleStatusChange('ARCHIVADO')}
        />
      )}
      {activeModal === 'eliminar' && (
        <ModalEliminarClase
          show={true}
          onClose={closeModal}
          classId={classId}
          onDelete={handleDelete}
        />
      )}
      {activeModal === 'desarchivar' && (
        <ModalDesarchivarClase
          show={true}
          onClose={closeModal}
          onConfirm={() => handleStatusChange('NO ARCHIVADO')} // Cambio realizado
        />
      )}
    </div>
  );
}

export default ECardMateria;

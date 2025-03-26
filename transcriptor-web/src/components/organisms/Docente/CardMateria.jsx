// src/components/organisms/Docente/CardMateria.jsx

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/style/CardMateria.module.css';
import EliminarIcon from '../../../assets/imgs/IconEliminar.png';
import ArchivarIcon from '../../../assets/imgs/ArchivarClase.png';

import ModalArchivarClase from './ModalArchivarClase';
import ModalEliminarClase from './ModalEliminarClase';
import ModalDesarchivarClase from './ModalDesarchivarClase';
import teacherImage from '../../../assets/imgs/Avatar Teacher.png'
import cantUsers from '../../../assets/imgs/cantUsers.png'

function CardMateria({
  classId,
  name,
  students,
  teacherName,
  status, // Este es classStatus: 'ARCHIVADO' o 'NO ARCHIVADO'
  classGroup,
  classCode,
  onStatusChange,
  onDelete,
  userId,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  /*console.log(`[CardMateria.jsx] Renderizando clase: ${name}`, {
    classId,
    name,
    students,
    teacherName,
    status,
    classGroup,
    classCode,
  });*/

  const openModal = useCallback((modalType) => {
    //console.log(`[CardMateria.jsx] Abriendo modal: ${modalType} para claseId: ${classId}`);
    setActiveModal(modalType);
  }, [classId]);

  const closeModal = useCallback(() => {
    //console.log(`[CardMateria.jsx] Cerrando modal: ${activeModal} para claseId: ${classId}`);
    setActiveModal(null);
  }, [activeModal, classId]);

  const handleStatusChange = useCallback((newStatus) => {
    //console.log(`[CardMateria.jsx] handleStatusChange called with: ${newStatus}`);
    if (typeof onStatusChange === 'function') {
      onStatusChange(classId, newStatus);
    } else {
      console.error('[CardMateria.jsx] onStatusChange no es una función');
    }
    closeModal();
  }, [onStatusChange, classId, closeModal]);

  const handleDelete = useCallback(() => {
    //console.log(`[CardMateria.jsx] handleDelete called`);
    if (typeof onDelete === 'function') {
      onDelete(classId, status);
    } else {
      console.error('[CardMateria.jsx] onDelete no es una función');
    }
    closeModal();
  }, [onDelete, classId, status, closeModal]);

  const handleCardClick = useCallback(() => {
    //console.log(`[CardMateria.jsx] Tarjeta clickeada: ${classId}`);
    navigate(`/docente-home-materia/${classId}`, { 
      state: { 
        classId, 
        name, 
        students, 
        teacherName, 
        classGroup, 
        classCode, 
        classStatus: status, // Pasar classStatus en lugar de status
        userId // Incluir userId en el estado
      } 
    });
  }, [navigate, classId, name, students, teacherName, classGroup, classCode, status, userId]);

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <div className={styles.cardStudents}>
            <img src={cantUsers} alt="cantUsers"  className={styles.cantUsers}/>
            <i className="fas fa-users"></i> {students}

          </div>
        </div>
        <div className={styles.cardTeacher}>
          <img src={teacherImage} alt="Teacher" className={styles.teacherImage} />
        </div>
        {/* Otros elementos del encabezado si es necesario */}
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.teacherName}>{teacherName}</p>
        <div className={styles.cardActions}>
          {status.toLowerCase() === 'no archivado' ? (
            <>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openModal('eliminar'); 
                }}
                title="Eliminar Clase"
                aria-label="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openModal('archivar'); 
                }}
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
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openModal('eliminar'); 
                }}
                title="Eliminar Clase"
                aria-label="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openModal('desarchivar'); 
                }}
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
        <ModalArchivarClase
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
          onConfirm={() => handleStatusChange('NO ARCHIVADO')}
        />
      )}
    </div>
  );
}

CardMateria.propTypes = {
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  students: PropTypes.number.isRequired,
  teacherName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired, // Este es classStatus
  classGroup: PropTypes.string,
  classCode: PropTypes.string,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default CardMateria;

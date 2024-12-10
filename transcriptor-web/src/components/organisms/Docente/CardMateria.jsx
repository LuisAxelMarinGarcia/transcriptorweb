// src/components/organisms/Docente/CardMateria.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/style/CardMateria.module.css';
import EliminarIcon from '../../../assets/imgs/IconEliminar.png';
import ArchivarIcon from '../../../assets/imgs/ArchivarClase.png';

import ModalArchivarClase from './ModalArchivarClase';
import ModalEliminarClase from './ModalEliminarClase';
import ModalDesarchivarClase from './ModalDesarchivarClase';

function CardMateria({
  classId = '',
  name = 'Sin Nombre',
  students = 0,
  teacherName = 'Docente',
  status = 'NO ARCHIVADO',
  classGroup = '',    // Acepta classGroup
  classCode = '',     // Acepta classCode
  onStatusChange,
  onDelete,
  userId,             // Añadir userId como prop
}) {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  console.log(`[CardMateria.jsx] Renderizando clase: ${name}`, {
    classId,
    name,
    students,
    teacherName,
    status,
    classGroup,
    classCode,
  });

  const openModal = (modalType) => {
    console.log(`[CardMateria.jsx] Abriendo modal: ${modalType} para claseId: ${classId}`);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    console.log(`[CardMateria.jsx] Cerrando modal: ${activeModal} para claseId: ${classId}`);
    setActiveModal(null);
  };

  const handleStatusChange = (newStatus) => {
    console.log(`[CardMateria.jsx] handleStatusChange called with: ${newStatus}`);
    if (typeof onStatusChange === 'function') {
      onStatusChange(classId, newStatus);
    } else {
      console.error('[CardMateria.jsx] onStatusChange no es una función');
    }
    closeModal();
  };

  const handleDelete = () => {
    console.log(`[CardMateria.jsx] handleDelete called`);
    if (typeof onDelete === 'function') {
      onDelete(classId, status);
    } else {
      console.error('[CardMateria.jsx] onDelete no es una función');
    }
    closeModal();
  };

  const handleCardClick = () => {
    console.log(`[CardMateria.jsx] Tarjeta clickeada: ${classId}`);
    // Pasar los datos de la clase y userId como estado en la navegación
    navigate(`/transcripciones-docente/${classId}`, { 
      state: { 
        classId, 
        name, 
        students, 
        teacherName, 
        classGroup, 
        classCode, 
        status,
        userId // Incluir userId en el estado
      } 
    });
  };

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
        <p className={styles.teacherName}>{teacherName}</p>
        <div className={styles.cardActions}>
          {status && status.toLowerCase() === 'no archivado' ? (
            <>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); // Evita que el clic se propague al contenedor principal
                  openModal('eliminar'); 
                }}
                title="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); // Evita que el clic se propague al contenedor principal
                  openModal('archivar'); 
                }}
                title="Archivar Clase"
              >
                <img src={ArchivarIcon} alt="Archivar" className={styles.icon} />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); // Evita que el clic se propague al contenedor principal
                  openModal('eliminar'); 
                }}
                title="Eliminar Clase"
              >
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} />
              </button>
              <span className={styles.separator}>|</span>
              <button
                className={styles.iconButton}
                onClick={(e) => { 
                  e.stopPropagation(); // Evita que el clic se propague al contenedor principal
                  openModal('desarchivar'); 
                }}
                title="Desarchivar Clase"
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

export default CardMateria;

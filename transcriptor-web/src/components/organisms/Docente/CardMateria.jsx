import styles from '../../../assets/style/CardMateria.module.css'; 
import EliminarIcon from '../../../assets/imgs/IconEliminar.png'; 
import ArchivarIcon from '../../../assets/imgs/ArchivarClase.png';

import React, { useState } from 'react';

import ModalEArchivarClase from '../../organisms/Docente/ModalArchivarClase'; 
import ModalEliminarClase from '../../organisms/Docente/ModalEliminarClase';
import ModalDesarchivarClase from '../../organisms/Docente/ModalDesarchivarClase'; 

function CardMateria({ title, students, teacherName, teacherImage, status }) {

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };


  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardStudents}>
            <i className="fas fa-users"></i> {students}
          </div>
        </div>
        <div className={styles.cardTeacher}>
          <img src={teacherImage} alt="Teacher" className={styles.teacherImage} />
        </div>
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.teacherName}>{teacherName}</p>
        <div className={styles.cardActions}>
          {status === 'active' ? (
                <>
                  <img src={EliminarIcon} alt="Eliminar" className={styles.icon} onClick={() => openModal('eliminar')} /> |
                  <img src={ArchivarIcon} alt="Archivar" className={styles.icon} onClick={() => openModal('archivar')} />
                </>

            ) : (
              <>
                <img src={EliminarIcon} alt="Eliminar" className={styles.icon} onClick={() => openModal('eliminar')} /> |
              <img src={ArchivarIcon} alt="Desarchivar" className={styles.icon} onClick={() => openModal('desarchivar')} />
              </>
          
            )}
        </div>
      </div>

       {/* Modales */}
       {activeModal === 'archivar' && <ModalEArchivarClase show={true} onClose={closeModal} />} 
      {activeModal === 'eliminar' && <ModalEliminarClase show={true} onClose={closeModal} />} 
      {activeModal === 'desarchivar' && <ModalDesarchivarClase show={true} onClose={closeModal} />} 

    </div>
  );
}

export default CardMateria;

// src/components/pages/Docente/HomeTemplate.jsx

import React, { useState, useEffect } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/HomeDocente.module.css';
import ClassList from '../../organisms/Docente/ClassList';
import Footer from '../../organisms/Footer';
import ModalCrearClase from '../../organisms/Docente/ModalCrearClase';

const HomeTemplate = () => {
  const [showModalCrearClase, setShowModalCrearClase] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModalCrearClase = () => setShowModalCrearClase(true);
  const handleCloseModalCrearClase = () => setShowModalCrearClase(false);

  const handleClassCreated = (newClass) => {
    console.log('[HomeTemplate.jsx] Nueva clase creada:', newClass);

    // Agregar la nueva clase al inicio de la lista
    setClasses([newClass, ...classes]);
  };

  const getUserId = () => localStorage.getItem('userId');
  const getToken = () => localStorage.getItem('token');

  const fetchClasses = async () => {
    const userId = getUserId();
    const token = getToken();

    if (!userId || !token) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      console.log('[HomeTemplate.jsx] Usuario no autenticado.');
      return;
    }

    const encodedStatus = encodeURIComponent('NO ARCHIVADO');
    const url = `/class/teacher/classes/${encodedStatus}/${userId}`;

    console.log(`[HomeTemplate.jsx] Fetching classes with status: NO ARCHIVADO for userId: ${userId}`);

    setLoading(true);
    setError('');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('[HomeTemplate.jsx] Respuesta del fetch:', response);

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('[HomeTemplate.jsx] Datos recibidos del backend:', data);
        if (data.success) {
          setClasses(data.data);
        } else {
          console.error('[HomeTemplate.jsx] Error en la respuesta del backend:', data.message);
          setError(data.message || 'Error al obtener las clases.');
          setClasses([]);
        }
      } else {
        const text = await response.text();
        console.error('[HomeTemplate.jsx] Respuesta inesperada:', text);
        setError('Respuesta del servidor no válida.');
        setClasses([]);
      }
    } catch (err) {
      console.error('[HomeTemplate.jsx] Error al obtener clases:', err);
      setError('Error de conexión con el servidor.');
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (classId, newStatus) => {
    console.log(`[HomeTemplate.jsx] Cambiando estatus de la clase ${classId} a ${newStatus}`);
    const token = getToken();

    if (!token) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch('/class/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          classId: classId,
          status: newStatus,
        }),
      });

      console.log('[HomeTemplate.jsx] Respuesta del PUT:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[HomeTemplate.jsx] Error al cambiar estatus:', errorData.message);
        setError(errorData.message || 'Error al cambiar el estatus de la clase.');
      } else {
        const data = await response.json();
        console.log('[HomeTemplate.jsx] Éxito al cambiar estatus:', data.message);
        // Refrescar la lista de clases
        fetchClasses();
      }
    } catch (err) {
      console.error('[HomeTemplate.jsx] Error al cambiar estatus:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  const handleDeleteClass = async (classId, status) => {
    console.log(`[HomeTemplate.jsx] Eliminando clase ${classId} con estatus ${status}`);
    const token = getToken();

    if (!token) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch('/class/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          classId: classId,
          status: 'ELIMINADO',
        }),
      });

      console.log('[HomeTemplate.jsx] Respuesta del PUT para eliminar:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[HomeTemplate.jsx] Error al eliminar clase:', errorData.message);
        setError(errorData.message || 'Error al eliminar la clase.');
      } else {
        const data = await response.json();
        console.log('[HomeTemplate.jsx] Éxito al eliminar clase:', data.message);
        // Refrescar la lista de clases
        fetchClasses();
      }
    } catch (err) {
      console.error('[HomeTemplate.jsx] Error al eliminar clase:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userId = getUserId(); // Obtener userId para pasar a ClassList

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.SpaceSiderbar}>
          <SidebarGenerico />
        </div>

        <div className={styles.container}>
          <div className={styles.HeaderContainer}>
            <Header view="materias" onOpenModal={handleOpenModalCrearClase} />
          </div>

          <div className={styles.OtherContainer}>
            {/* Mostrar mensajes de carga o error */}
            {loading && <p>Cargando clases...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* Renderizar la lista de clases */}
            {!loading && !error && (
              <ClassList
                classes={classes}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteClass}
                userId={userId} // Pasar userId como prop
              />
            )}
          </div>
          <Footer />
        </div>
      </div>
      <ModalCrearClase
        show={showModalCrearClase}
        onClose={handleCloseModalCrearClase}
        onClassCreated={handleClassCreated}
      />
    </>
  );
};

export default HomeTemplate;

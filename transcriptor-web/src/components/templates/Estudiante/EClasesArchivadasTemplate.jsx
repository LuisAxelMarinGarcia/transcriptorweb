// src/components/templates/Estudiante/HomeTemplateArchivado.jsx

import React, { useState, useEffect } from 'react';
import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '; // Eliminado espacio al final
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante';
import styles from '../../../assets/style/Docente/HomeDocente.module.css';
import ClassListEstudiante from "../../organisms/Estudiante/ClassListEstudiante";
import Footer from "../../organisms/Footer";
import clasesArchivadas from '../../../assets/imgs/iconHome.png'; 

const HomeTemplateArchivado = () => {
  const [classes, setClasses] = useState([]); // Estado para almacenar las clases archivadas
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para obtener el userId desde localStorage
  const getUserId = () => localStorage.getItem('userId');

  // Función para obtener el token JWT desde localStorage
  const getToken = () => localStorage.getItem('token');

  // Función para obtener las clases archivadas del backend
  const fetchArchivedClasses = async () => {
    const userId = getUserId();
    const token = getToken();

    if (!userId || !token) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      console.log('[HomeTemplateArchivado.jsx] Usuario no autenticado.');
      return;
    }

    const encodedStatus = encodeURIComponent('ARCHIVADO');
    const url = `/user-class/student/classes/${userId}/${encodedStatus}`; // URL relativa para el estudiante

    console.log(`[HomeTemplateArchivado.jsx] Fetching clases archivadas para userId: ${userId}`);

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

      console.log('[HomeTemplateArchivado.jsx] Respuesta del fetch:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('[HomeTemplateArchivado.jsx] Datos recibidos del backend:', data);
        if (data.success) {
          // Establecer 'status' como 'DISPONIBLE' y 'classStatus' como 'ARCHIVADO'
          const archivedClasses = data.data.map(cls => ({
            ...cls,
            status: 'DISPONIBLE', // Para operaciones internas
            classStatus: 'ARCHIVADO' // Indicador de archivado
          }));
          setClasses(archivedClasses);
          console.log('[HomeTemplateArchivado.jsx] Clases archivadas obtenidas:', archivedClasses);
        } else {
          console.error('[HomeTemplateArchivado.jsx] Error en la respuesta del backend:', data.message);
          setError(data.message || 'Error al obtener las clases.');
          setClasses([]);
        }
      } else {
        const errorData = await response.json();
        console.error('[HomeTemplateArchivado.jsx] Error al obtener clases:', errorData.message);
        setError(errorData.message || 'Error al obtener las clases.');
        setClasses([]);
      }
    } catch (err) {
      console.error('[HomeTemplateArchivado.jsx] Error al obtener clases:', err);
      setError('Error de conexión con el servidor.');
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio de estatus de una clase
  const handleStatusChange = async (classId, newStatus) => {
    console.log(`[HomeTemplateArchivado.jsx] Cambiando estatus de la clase ${classId} a ${newStatus}`);
    const token = getToken();
    const userId = getUserId();

    if (!token || !userId) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch('/user-class/status-classes', { // Asegurar la barra inicial
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId, // Incluye el userId en el body
          classId: classId,
          status: newStatus, // Debe ser 'ARCHIVADO' o 'NO ARCHIVADO'
        }),
      });

      console.log('[HomeTemplateArchivado.jsx] Respuesta del PUT:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[HomeTemplateArchivado.jsx] Error al cambiar estatus:', errorData.message);
        setError(errorData.message || 'Error al cambiar el estatus de la clase.');
      } else {
        const data = await response.json();
        console.log('[HomeTemplateArchivado.jsx] Éxito al cambiar estatus:', data.message);
        // Refrescar la lista de clases archivadas
        fetchArchivedClasses();
      }
    } catch (err) {
      console.error('[HomeTemplateArchivado.jsx] Error al cambiar estatus:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  // Función para manejar la eliminación de una clase
  const handleDeleteClass = async (classId) => {
    console.log(`[HomeTemplateArchivado.jsx] Eliminando clase ${classId}`);
    const token = getToken();
    const userId = getUserId();

    if (!token || !userId) {
      setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch('/user-class/status-classes', { // Asegurar la barra inicial
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId, // Incluye el userId en el body
          classId: classId,
          status: 'ELIMINADO',
        }),
      });

      console.log('[HomeTemplateArchivado.jsx] Respuesta del PUT para eliminar:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[HomeTemplateArchivado.jsx] Error al eliminar clase:', errorData.message);
        setError(errorData.message || 'Error al eliminar la clase.');
      } else {
        const data = await response.json();
        console.log('[HomeTemplateArchivado.jsx] Éxito al eliminar clase:', data.message);
        // Refrescar la lista de clases archivadas
        fetchArchivedClasses();
      }
    } catch (err) {
      console.error('[HomeTemplateArchivado.jsx] Error al eliminar clase:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  // useEffect para obtener las clases archivadas al montar el componente
  useEffect(() => {
    fetchArchivedClasses();
  }, []);

  return (
    <div className={styles.flex}>
      <div className={styles.SpaceSiderbar}>
        <SidebarGenerico />
      </div>
      <div className={styles.container}>
        <div className={styles.HeaderContainer}>
          <Header view="clases-archivadas" />
        </div>
        
        <div className={styles.AvisoArchivado}>
              <h1 className={styles.titleMateriaArchivado}>
                  <i className="fas fa-book"></i> Clases archivadas
                  <img src={clasesArchivadas} alt="Icon-Archivado" className={styles.IconoArchivado} />
              </h1>
        </div>        

        <div className={styles.OtherContainer}>
          {loading && <p>Cargando clases archivadas...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {!loading && !error && (
            <ClassListEstudiante 
              classes={classes} 
              onStatusChange={handleStatusChange} 
              onDelete={handleDeleteClass} 
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeTemplateArchivado;

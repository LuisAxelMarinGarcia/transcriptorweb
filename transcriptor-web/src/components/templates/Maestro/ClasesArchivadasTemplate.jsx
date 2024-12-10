// src/components/templates/Maestro/ClasesArchivadasTemplate.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/HomeDocente.module.css';
import ClassList from "../../organisms/Docente/ClassList";
import Footer from "../../organisms/Footer";
import ModalCrearClase from '../../organisms/Docente/ModalCrearClase';

const ClasesArchivadas = () => {
    const [showModalCrearClase, setShowModalCrearClase] = useState(false);
    const [classes, setClasses] = useState([]); // Estado para almacenar las clases archivadas
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleOpenModalCrearClase = () => setShowModalCrearClase(true);
    const handleCloseModalCrearClase = () => setShowModalCrearClase(false);

    // Función para agregar la nueva clase al estado
    const handleClassCreated = (newClass) => {
        console.log('[ClasesArchivadasTemplate.jsx] Nueva clase creada:', newClass);
        setClasses([...classes, newClass]);
    };

    // Función para obtener el userId desde localStorage
    const getUserId = () => {
        return localStorage.getItem('userId');
    };

    // Función para obtener el token JWT desde localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    // Función para obtener clases archivadas desde el backend
    const fetchArchivedClasses = async () => {
        const userId = getUserId();
        const token = getToken();

        if (!userId || !token) {
            setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
            console.log('[ClasesArchivadasTemplate.jsx] Usuario no autenticado.');
            return;
        }

        const encodedStatus = encodeURIComponent('ARCHIVADO'); // Codifica el estatus para la URL
        const url = `/class/teacher/classes/${encodedStatus}/${userId}`; // Usando el proxy configurado en Vite

        console.log(`[ClasesArchivadasTemplate.jsx] Fetching classes with status: ARCHIVADO for userId: ${userId}`);

        setLoading(true);
        setError('');

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Incluye el token en el header
                },
            });

            console.log('[ClasesArchivadasTemplate.jsx] Respuesta del fetch:', response);

            // Verificar el tipo de contenido
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('[ClasesArchivadasTemplate.jsx] Datos recibidos del backend:', data);
                if (data.success) {
                    setClasses(data.data); // Asumiendo que la respuesta contiene un array en data.data
                } else {
                    console.error('[ClasesArchivadasTemplate.jsx] Error en la respuesta del backend:', data.message);
                    setError(data.message || 'Error al obtener las clases.');
                    setClasses([]);
                }
            } else {
                // Si no es JSON, algo salió mal
                const text = await response.text();
                console.error('[ClasesArchivadasTemplate.jsx] Respuesta inesperada:', text);
                setError('Respuesta del servidor no válida.');
                setClasses([]);
            }
        } catch (err) {
            console.error('[ClasesArchivadasTemplate.jsx] Error al obtener clases:', err);
            setError('Error de conexión con el servidor.');
            setClasses([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar el cambio de estatus de una clase
    const handleStatusChange = async (classId, newStatus) => {
        console.log(`[ClasesArchivadasTemplate.jsx] Cambiando estatus de la clase ${classId} a ${newStatus}`);
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
                    status: newStatus
                }),
            });

            console.log('[ClasesArchivadasTemplate.jsx] Respuesta del PUT:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('[ClasesArchivadasTemplate.jsx] Error al cambiar estatus:', errorData.message);
                setError(errorData.message || 'Error al cambiar el estatus de la clase.');
            } else {
                const data = await response.json();
                console.log('[ClasesArchivadasTemplate.jsx] Éxito al cambiar estatus:', data.message);
                // Refrescar la lista de clases
                fetchArchivedClasses();
            }
        } catch (err) {
            console.error('[ClasesArchivadasTemplate.jsx] Error al cambiar estatus:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    // Función para manejar la eliminación de una clase
    const handleDeleteClass = async (classId, status) => {
        console.log(`[ClasesArchivadasTemplate.jsx] Eliminando clase ${classId} con estatus ${status}`);
        const token = getToken();

        if (!token) {
            setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
            return;
        }

        try {
            const response = await fetch('/class/status', { // Asumiendo que eliminar también usa este endpoint
                method: 'PUT', // Cambiar a 'DELETE' si el backend lo maneja así
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    classId: classId,
                    status: 'ELIMINADO' // O el estatus que maneje la eliminación
                }),
            });

            console.log('[ClasesArchivadasTemplate.jsx] Respuesta del PUT para eliminar:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('[ClasesArchivadasTemplate.jsx] Error al eliminar clase:', errorData.message);
                setError(errorData.message || 'Error al eliminar la clase.');
            } else {
                const data = await response.json();
                console.log('[ClasesArchivadasTemplate.jsx] Éxito al eliminar clase:', data.message);
                // Refrescar la lista de clases
                fetchArchivedClasses();
            }
        } catch (err) {
            console.error('[ClasesArchivadasTemplate.jsx] Error al eliminar clase:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    // useEffect para obtener las clases archivadas cuando el componente se monta
    useEffect(() => {
        fetchArchivedClasses();
    }, []);

    return (
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                    <SidebarGenerico />
                </div>
                
                <div className={styles.container}>
                    <div className={styles.HeaderContainer}>
                        <Header view="clases-archivadas" onOpenModal={handleOpenModalCrearClase} />
                    </div>

                    <div className={styles.OtherContainer}>
                        {/* Mostrar mensajes de carga o error */}
                        {loading && <p>Cargando clases archivadas...</p>}
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        {/* Renderizar la lista de clases archivadas */}
                        {!loading && !error && (
                            <ClassList 
                                classes={classes} 
                                isArchived 
                                onStatusChange={handleStatusChange} 
                                onDelete={handleDeleteClass} 
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

export default ClasesArchivadas;

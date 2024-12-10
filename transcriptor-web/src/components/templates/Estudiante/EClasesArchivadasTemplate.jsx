import React, { useState, useEffect } from 'react';
import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante';
import styles from '../../../assets/style/Docente/HomeDocente.module.css';
import ClassListEstudiante from "../../organisms/Estudiante/ClassListEstudiante";
import Footer from "../../organisms/Footer";

const HomeTemplate = () => {
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
            console.log('[HomeTemplate.jsx] Usuario no autenticado.');
            return;
        }

        const encodedStatus = encodeURIComponent('ARCHIVADO');
        const url = `/user-class/student/classes/${userId}/${encodedStatus}`; // URL relativa para el estudiante

        console.log(`[HomeTemplate.jsx] Fetching clases archivadas para userId: ${userId}`);

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

            if (response.ok) {
                const data = await response.json();
                console.log('[HomeTemplate.jsx] Datos recibidos del backend:', data);
                if (data.success) {
                    setClasses(data.data); // Suponiendo que los datos están en data.data
                } else {
                    console.error('[HomeTemplate.jsx] Error en la respuesta del backend:', data.message);
                    setError(data.message || 'Error al obtener las clases.');
                    setClasses([]);
                }
            } else {
                const errorData = await response.json();
                console.error('[HomeTemplate.jsx] Error al obtener clases:', errorData.message);
                setError(errorData.message || 'Error al obtener las clases.');
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

    // Función para manejar el cambio de estatus de una clase
    const handleStatusChange = async (classId, newStatus) => {
        console.log(`[HomeTemplate.jsx] Cambiando estatus de la clase ${classId} a ${newStatus}`);
        const token = getToken();
        const userId = getUserId();

        if (!token || !userId) {
            setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
            return;
        }

        try {
            const response = await fetch('user-class/status-classes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId, // Incluye el userId en el body
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
                fetchArchivedClasses();
            }
        } catch (err) {
            console.error('[HomeTemplate.jsx] Error al cambiar estatus:', err);
            setError('Error de conexión con el servidor.');
        }
    };

    // Función para manejar la eliminación de una clase
    const handleDeleteClass = async (classId) => {
        console.log(`[HomeTemplate.jsx] Eliminando clase ${classId}`);
        const token = getToken();
        const userId = getUserId();

        if (!token || !userId) {
            setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
            return;
        }

        try {
            const response = await fetch('user-class/status-classes', {
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

            console.log('[HomeTemplate.jsx] Respuesta del PUT para eliminar:', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('[HomeTemplate.jsx] Error al eliminar clase:', errorData.message);
                setError(errorData.message || 'Error al eliminar la clase.');
            } else {
                const data = await response.json();
                console.log('[HomeTemplate.jsx] Éxito al eliminar clase:', data.message);
                // Refrescar la lista de clases
                fetchArchivedClasses();
            }
        } catch (err) {
            console.error('[HomeTemplate.jsx] Error al eliminar clase:', err);
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

export default HomeTemplate;

    // src/components/templates/Estudiante/HomeTemplate.jsx
    import React, { useState, useEffect } from 'react';


    import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
    import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
    import styles from '../../../assets/style/Docente/HomeDocente.module.css'
    import ClassListEstudiante from "../../organisms/Estudiante/ClassListEstudiante";
    import Footer from "../../organisms/Footer";

    const HomeTemplate = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Funciones para manejar cambios de estatus y eliminación de clases
    const handleStatusChange = async (classId, newStatus) => {
        console.log(`[HomeTemplate.jsx] Cambiando estatus de la clase ${classId} a ${newStatus}`);
        const token = localStorage.getItem('token');
        if (!token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        return;
        }

        try {
        const response = await fetch(`/user-class/status-classes`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            classId: classId,
            status: newStatus,
            userId: localStorage.getItem('userId'),
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
        const token = localStorage.getItem('token');
        if (!token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        return;
        }

        try {
        const response = await fetch(`/user-class/status-classes`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            classId: classId,
            status: 'ELIMINADO',
            userId: localStorage.getItem('userId'),
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

    // Función para fetch de clases no archivadas
    const fetchClasses = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        console.log('[HomeTemplate.jsx] Usuario no autenticado.');
        return;
        }

        const encodedStatus = encodeURIComponent('NO ARCHIVADO');
        const url = `/user-class/student/classes/${userId}/${encodedStatus}`;

        console.log(`[HomeTemplate.jsx] Fetching clases con estatus: NO ARCHIVADO para userId: ${userId}`);

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
            setClasses(data.data);
            console.log('[HomeTemplate.jsx] Clases obtenidas:', data.data);
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

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <>
        <div className={styles.flex}>
            <div className={styles.SpaceSiderbar}>
            <SidebarGenerico />
            </div>

            <div className={styles.container}>
            <div className={styles.HeaderContainer}>
                <Header view="clases-inscritas" />
            </div>

            <div className={styles.OtherContainer}>
                {/* Mostrar mensajes de carga o error */}
                {loading && <p>Cargando clases...</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}

                {/* Renderizar la lista de clases */}
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
        </>
    );
    };

    export default HomeTemplate;

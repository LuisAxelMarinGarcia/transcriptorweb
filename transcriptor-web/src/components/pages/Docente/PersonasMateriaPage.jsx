// src/components/pages/Maestro/PersonasMateriaPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PersonasMateria from '../../templates/Maestro/PersonasMateriaTemplate';
import styles from '../../../assets/style/Docente/ClaseHome.module.css';
import axios from 'axios';

const PersonasMateriaPage = () => {
  const { classId } = useParams(); // Obtener classId desde la URL
  const location = useLocation();
  const { state } = location; // Obtener el estado de la navegación

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funciones para obtener el userId y token del localStorage
  const getUserId = () => localStorage.getItem('userId');
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchClassData = async () => {
      const userId = getUserId();
      const token = getToken();

      if (!userId || !token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        console.error('[PersonasMateriaPage.jsx] Usuario no autenticado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let fetchedData = {};

        if (state && state.classId && state.status) {
          // Si el estado está disponible, usarlo directamente
          fetchedData = {
            name: state.name,
            students: state.students,
            teacherName: state.teacherName,
            classGroup: state.classGroup,
            classCode: state.classCode,
            status: state.status,
          };
        } else {
          // Si el estado no está disponible, realizar una solicitud para obtener los datos
          const encodedStatus = encodeURIComponent('NO ARCHIVADO');
          const response = await axios.get(`/class/teacher/classes/${encodedStatus}/${userId}`, { // Usando proxy configurado
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const classes = response.data.data; // Asumiendo que la respuesta tiene 'data' como array de clases

          // Buscar la clase con classId
          const foundClass = classes.find(cls => cls.classId === classId);

          if (!foundClass) {
            throw new Error('Clase no encontrada.');
          }

          fetchedData = {
            name: foundClass.className,
            students: foundClass.classNumberOfStudents,
            teacherName: `${foundClass.userName} ${foundClass.userSurname}`,
            classGroup: foundClass.classGroup,
            classCode: foundClass.classCode,
            status: foundClass.classStatus,
          };
        }

        setClassData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error('[PersonasMateriaPage.jsx] Error al obtener los datos de la clase:', err);
        setError(err.response?.data?.message || err.message || 'No se pudieron obtener los datos de la clase.');
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId, state]);

  if (loading) {
    return <p className={styles.loadingMessage}>Cargando...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  const { name, students, teacherName, classGroup, classCode, status } = classData;

  console.log('[PersonasMateriaPage.jsx] Datos recibidos:', classData);

  return (
    <PersonasMateria
      title={`${name} - Grupo ${classGroup}`}
      studentCount={students}
      codeClass={classCode}
      classId={classId}           // Pasar classId como prop
      name={name}                 // Pasar el nombre de la clase
      teacherName={teacherName}   // Pasar el nombre del profesor
      classGroup={classGroup}     // Pasar el grupo de la clase
      status={status}             // Pasar el status si es necesario
    />
  );
};

export default PersonasMateriaPage;

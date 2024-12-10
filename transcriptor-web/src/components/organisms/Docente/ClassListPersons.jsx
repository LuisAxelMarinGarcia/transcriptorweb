// src/components/organisms/Docente/ClassListPersons.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../CardPersonas'; // Asegúrate de tener un componente Card reutilizable
import styles from '../../../assets/style/Docente/ClasePersonasLista.module.css'; 
import teacherImageDefault from "../../../assets/imgs/DocenteFoto.png"; // Imagen por defecto del maestro
import studentImageDefault from "../../../assets/imgs/AlumnoFoto.png"; // Imagen por defecto del alumno

function PeopleList({ type, view, classId, teacherName, teacherImage }) {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funciones para obtener el userId y token del localStorage
  const getUserId = () => localStorage.getItem('userId');
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchPeopleData = async () => {
      const userId = getUserId();
      const token = getToken();

      if (!userId || !token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        console.error('[PeopleList.jsx] Usuario no autenticado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let fetchedData = [];

        if (view === "docenteYAlumnos") {
          // Fetch INSCRITO students
          const inscritosResponse = await fetch(`/user-class/students/${classId}/INSCRITO`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!inscritosResponse.ok) {
            throw new Error('Error al obtener alumnos inscritos.');
          }

          const inscritosJson = await inscritosResponse.json();
          const inscritosData = inscritosJson.data; // Extraer el array 'data'

          // Fetch BAJA students
          const bajaResponse = await fetch(`/user-class/students/${classId}/BAJA`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!bajaResponse.ok) {
            throw new Error('Error al obtener alumnos dados de baja.');
          }

          const bajaJson = await bajaResponse.json();
          const bajaData = bajaJson.data; // Extraer el array 'data'

          // Combinar los datos
          fetchedData = [...inscritosData, ...bajaData];
        } else if (view === "baja") {
          // Fetch BAJA students
          const bajaResponse = await fetch(`/user-class/students/${classId}/BAJA`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!bajaResponse.ok) {
            throw new Error('Error al obtener alumnos dados de baja.');
          }

          const bajaJson = await bajaResponse.json();
          const bajaData = bajaJson.data; // Extraer el array 'data'
          fetchedData = bajaData;
        } else {
          // Si hay otros views, manejar según sea necesario
          throw new Error('Vista no soportada.');
        }

        setPeopleData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error('[PeopleList.jsx] Error al obtener los datos de personas:', err);
        setError(err.message || 'No se pudieron obtener los datos de las personas.');
        setLoading(false);
      }
    };

    fetchPeopleData();
  }, [classId, view]);

  if (loading) {
    return <p className={styles.loadingMessage}>Cargando alumnos...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  return (
    <div className={styles.peopleList}>
      {view === "docenteYAlumnos" && (
        <>
          {/* Sección del Docente */}
          <div className={styles.sectionTitle}>Docente</div>
          <Card
            key="docente"
            title={teacherName}
            image={teacherImage || teacherImageDefault} // Usa la imagen pasada o la por defecto
            type="profile"
          />

          {/* Sección de Alumnos Inscritos */}
          <div className={styles.sectionTitle}>Alumnos Inscritos</div>
          {peopleData
            .filter(person => person.role.toLowerCase() === 'estudiante' && person.userStatus === 'INSCRITO')
            .map((person, index) => (
              <Card
                key={index}
                title={`${person.userName} ${person.userSurname}`}
                image={person.image || studentImageDefault} // Usa la imagen pasada o la por defecto
                type="profile"
              />
            ))}
        </>
      )}

      {view === "baja" && (
        <>
          {/* Sección de Alumnos Dados de Baja */}
          <div className={styles.sectionTitle}>Alumnos Dados de Baja</div>
          {peopleData.map((person, index) => (
            <Card
              key={index}
              title={`${person.userName} ${person.userSurname}`}
              image={person.image || studentImageDefault}
              type="profile"
            />
          ))}
        </>
      )}
    </div>
  );
}

PeopleList.propTypes = {
  type: PropTypes.string,
  view: PropTypes.string.isRequired, // 'docenteYAlumnos' o 'baja'
  classId: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired, // Nuevo prop para el nombre del maestro
  teacherImage: PropTypes.string, // Nuevo prop opcional para la imagen del maestro
};

PeopleList.defaultProps = {
  teacherImage: teacherImageDefault, // Imagen por defecto si no se pasa ninguna
};

export default PeopleList;

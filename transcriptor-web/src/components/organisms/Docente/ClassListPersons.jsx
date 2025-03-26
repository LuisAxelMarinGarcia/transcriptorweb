import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardPerson from '../CardPersonas'; // Asegúrate de que este es el componente correcto
import styles from '../../../assets/style/Docente/ClasePersonasLista.module.css'; 
import teacherImageDefault from "../../../assets/imgs/DocenteFoto.png";
import studentImageDefault from "../../../assets/imgs/AlumnoFoto.png";

function PeopleList({ view, classId, teacherName, teacherImage = teacherImageDefault }) {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchPeopleData = async () => {
      const token = getToken();

      if (!token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        console.error('[PeopleList.jsx] Usuario no autenticado.');
        setLoading(false);
        return;
      }

      if (!classId) {
        setError('ID de clase no proporcionado.');
        console.error('[PeopleList.jsx] classId no proporcionado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let fetchedData = [];

        // Definir el endpoint según la vista
        let endpoint = '';
        if (view === "docenteYAlumnos") {
          endpoint = `/user-class/students/${classId}/INSCRITO`;
        } else if (view === "baja") {
          endpoint = `/user-class/students/${classId}/BAJA`;
        } else {
          throw new Error('Vista no soportada.');
        }

        // Realizar la petición
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`);
        }

        const jsonData = await response.json();

        if (jsonData.success && Array.isArray(jsonData.data)) {
          fetchedData = jsonData.data.map(person => ({
            id: person.studentId || person.userId, // Asegúrate de que el ID es consistente
            fullName: `${person.studentName || person.userName} ${person.studentSurname || person.userSurname}`,
            role: 'estudiante',
            status: view === "docenteYAlumnos" ? 'INSCRITO' : 'BAJA',
            image: person.image || studentImageDefault,
          }));
        } else {
          throw new Error(jsonData.message || 'No se pudieron obtener los datos de las personas.');
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
    return <p className={styles.loadingMessage}>Cargando personas...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  return (
    <div className={styles.peopleList}>
      {/* Mostrar al docente solo en la vista de inscritos */}
      {view === "docenteYAlumnos" && (
        <>
          <div className={styles.sectionTitle}>Docente</div>
          <CardPerson
            key="docente"
            title={teacherName}
            image={teacherImage || teacherImageDefault}
            type="profile"
          />
        </>
      )}

      {/* Renderizar según la vista */}
      {view === "docenteYAlumnos" && (
        <>
          {/* Sección de Alumnos Inscritos */}
          <div className={styles.sectionTitle}>Alumnos Inscritos</div>
          {peopleData.filter(person => person.role === 'estudiante' && person.status === 'INSCRITO').length > 0 ? (
            peopleData
              .filter(person => person.role === 'estudiante' && person.status === 'INSCRITO')
              .map(person => (
                <CardPerson
                  key={person.id}
                  title={person.fullName}
                  image={person.image}
                  type="profile"
                />
              ))
          ) : (
            <p className={styles.InfoVacio}>No hay alumnos inscritos para mostrar.</p>
          )}
        </>
      )}

      {view === "baja" && (
        <>
          {/* Sección de Alumnos Dados de Baja */}
          <div className={styles.sectionTitle}>Alumnos Dados de Baja</div>
          {peopleData.filter(person => person.role === 'estudiante' && person.status === 'BAJA').length > 0 ? (
            peopleData
              .filter(person => person.role === 'estudiante' && person.status === 'BAJA')
              .map(person => (
                <CardPerson
                  key={person.id}
                  title={person.fullName}
                  image={person.image}
                  type="profile"
                />
              ))
          ) : (
            <p className={styles.InfoVacio}>No hay alumnos dados de baja para mostrar.</p>
          )}
        </>
      )}
    </div>
  );
}

PeopleList.propTypes = {
  view: PropTypes.string.isRequired, // 'docenteYAlumnos' o 'baja'
  classId: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  teacherImage: PropTypes.string,
};

export default PeopleList;

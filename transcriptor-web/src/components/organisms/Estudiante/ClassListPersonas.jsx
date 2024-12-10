import React, { useEffect, useState } from 'react';
import Card from '../CardPersonas'; // tu componente Card
import styles from '../../../assets/style/Estudiante/PersonasLista.module.css'; 
import teacherImage from "../../../assets/imgs/DocenteFoto.png"; 
import studentImage from "../../../assets/imgs/AlumnoFoto.png";

function PeopleList({ type, classId, teacherName }) {
  const [peopleData, setPeopleData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    // Si es docente, no hacemos fetch, ya que tenemos el nombre del docente por props.
    if (type === 'docente') {
      // Suponemos un único docente. Creamos un array con un solo objeto.
      const docenteData = [{
        userName: teacherName,
        role: 'docente',
        image: teacherImage,
      }];
      setPeopleData(docenteData);
      return;
    }

    // Si es alumno, hacemos la petición
    if (type === 'alumno') {
      const token = getToken();
      if (!token) {
        console.error('[ClassListPersonas.jsx] Usuario no autenticado. Falta token.');
        setError('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      if (!classId) {
        console.error('[ClassListPersonas.jsx] classId es undefined. No se puede obtener alumnos.');
        setError('No se pudo obtener la lista de alumnos: ID de clase no definido.');
        return;
      }

      const endpoint = `/user-class/students/${classId}/INSCRITO`;

      const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            console.error('[ClassListPersonas.jsx] Error en la respuesta del servidor:', response.status);
            throw new Error('Error en la respuesta del servidor');
          }

          const data = await response.json();
          console.log('[ClassListPersonas.jsx] Datos recibidos del backend:', data);

          if (data.success && Array.isArray(data.data)) {
            const formattedData = data.data.map(person => ({
              ...person,
              image: studentImage
            }));
            setPeopleData(formattedData);
          } else {
            console.error('[ClassListPersonas.jsx] Error en datos recibidos:', data.message);
            setError(data.message || 'No se pudo obtener la lista.');
            setPeopleData([]);
          }
        } catch (err) {
          console.error('[ClassListPersonas.jsx] Error al obtener datos:', err);
          setError('Error de conexión con el servidor.');
          setPeopleData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [type, classId, teacherName]);

  return (
    <div className={styles.peopleList}>
      {type === 'docente' && <div className={styles.sectionTitle}>Docentes</div>}
      {type === 'alumno' && <div className={styles.sectionTitle}>Alumnos</div>}

      {loading && <p>Cargando {type === 'alumno' ? 'alumnos' : 'docentes'}...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && peopleData.map((person, index) => (
        <Card
          key={index}
          title={person.userName}
          image={person.image}
          type="profile"
        />
      ))}
    </div>
  );
}

export default PeopleList;

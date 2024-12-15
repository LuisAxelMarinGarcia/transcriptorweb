import React, { useEffect, useState } from 'react';
import CardPerson from '../CardPersonas'; // Asegúrate de que este es el componente correcto
import styles from '../../../assets/style/Estudiante/PersonasLista.module.css'; 
import teacherImage from "../../../assets/imgs/DocenteFoto.png"; 
import studentImage from "../../../assets/imgs/AlumnoFoto.png";

function PeopleList({ type, classId, teacherName }) {
  const [peopleData, setPeopleData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener el token del almacenamiento local
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    // Si es docente, no hacemos fetch, ya que tenemos el nombre del docente por props.
    if (type === 'docente') {
      const docenteData = [{
        userName: teacherName,
        role: 'docente',
        image: teacherImage,
      }];
      console.log('[PeopleList.jsx] Docente Data:', docenteData); // Depuración
      setPeopleData(docenteData);
      return;
    }

    // Si es alumno, hacemos la petición para obtener solo los inscritos
    if (type === 'alumno') {
      const token = getToken();
      if (!token) {
        console.error('[PeopleList.jsx] Usuario no autenticado. Falta token.');
        setError('Usuario no autenticado. Por favor inicia sesión.');
        return;
      }

      if (!classId) {
        console.error('[PeopleList.jsx] classId es undefined. No se puede obtener alumnos.');
        setError('No se pudo obtener la lista de alumnos: ID de clase no definido.');
        return;
      }

      const endpoint = `/user-class/students/${classId}/INSCRITO`; // Asegúrate de que la URL es correcta
      console.log('[PeopleList.jsx] Endpoint:', endpoint); // Depuración

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

          console.log('[PeopleList.jsx] Response Status:', response.status); // Depuración

          if (!response.ok) {
            console.error('[PeopleList.jsx] Error en la respuesta del servidor:', response.status);
            throw new Error('Error en la respuesta del servidor');
          }

          const data = await response.json();
          console.log('[PeopleList.jsx] Datos recibidos del backend:', data); // Depuración

          if (data.success && Array.isArray(data.data)) {
            const formattedData = data.data.map(person => ({
              ...person,
              fullName: `${person.studentName} ${person.studentSurname}`, // Crear un nombre completo
              image: studentImage
            }));
            console.log('[PeopleList.jsx] Formatted Data:', formattedData); // Depuración
            setPeopleData(formattedData);
          } else {
            console.error('[PeopleList.jsx] Error en datos recibidos:', data.message);
            setError(data.message || 'No se pudo obtener la lista.');
            setPeopleData([]);
          }
        } catch (err) {
          console.error('[PeopleList.jsx] Error al obtener datos:', err);
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
      {type === 'alumno' && <div className={styles.sectionTitle}>Alumnos Inscritos</div>}

      {loading && <p>Cargando {type === 'alumno' ? 'alumnos inscritos' : 'docentes'}...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && peopleData.length === 0 && (
        <p>No hay {type === 'alumno' ? 'alumnos inscritos' : 'docentes'} para mostrar.</p>
      )}

      {!loading && !error && peopleData.map((person, index) => (
        <CardPerson
          key={person.studentId || index} // Usar un ID único si está disponible
          title={person.fullName || person.userName} // Usar fullName en lugar de userName
          image={person.image}
          type="profile"
        />
      ))}
    </div>
  );
}

export default PeopleList;

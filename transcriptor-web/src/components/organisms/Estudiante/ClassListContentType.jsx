// ClassList.jsx (Versión del Estudiante)
import React, { useEffect, useState } from 'react';
import Card from '../Estudiante/CardTypeContent'; // Asegúrate de que este sea el componente correcto para estudiantes
import styles from '../../../assets/style/Estudiante/ClassListTypeContentE.module.css'; 
import teacherImage from "../../../assets/imgs/Avatar Teacher.png"; // Imagen por defecto del autor

function ClassList({ classId, status, typeFilter }) {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchTranscriptions = async () => {
      const token = getToken();
      if (!token) {
        setError('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      // Usar ruta relativa para aprovechar el proxy de Vite
      const url = `/transcription/all/${encodeURIComponent(classId)}/${encodeURIComponent(status)}`;

      console.log(`[ClassList.jsx] Fetching transcriptions from: ${url}`);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al obtener las transcripciones.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.success) {
          // Filtrado en base a typeFilter
          let filteredTranscriptions = data.data || [];
          if (typeFilter === 'MATERIAL') {
            filteredTranscriptions = filteredTranscriptions.filter(t => t.transcriptionType === 'MATERIAL');
          } else if (typeFilter === 'TRANSCRIPCION') {
            filteredTranscriptions = filteredTranscriptions.filter(t => t.transcriptionType === 'TRANSCRIPCION');
          }

          // Ordenar las transcripciones por fecha (más reciente primero)
          filteredTranscriptions.sort((a, b) => {
            const dateA = new Date(a.transcriptionDate);
            const dateB = new Date(b.transcriptionDate);
            return dateB - dateA; // Orden descendente
          });

          setTranscriptions(filteredTranscriptions);
        } else {
          setError(data.message || 'Error al obtener las transcripciones.');
        }
      } catch (err) {
        console.error('[ClassList.jsx] Error al obtener transcripciones:', err);
        setError('Error de conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptions();
  }, [classId, status, typeFilter]);

  if (loading) {
    return <p className={styles.loading}>Cargando transcripciones...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  if (!transcriptions || transcriptions.length === 0) {
    return <p className={styles.noData}>No hay contenido disponible.</p>;
  }

  return (
    <div className={styles.classList}>
      {transcriptions.map((transcription) => (
        <Card
          key={transcription.transcriptionId}
          transcriptionId={transcription.transcriptionId}
          title={transcription.transcriptionTitle}
          description={transcription.transcriptionDescription}
          date={transcription.transcriptionDate}
          type={transcription.transcriptionType}
          link={transcription.transcriptionUrl}
          fileType={transcription.transcriptionType === 'MATERIAL' ? 'image' : 'pdf'} // Actualizado para manejar PDF
          author={{
            name: `${transcription.userName} ${transcription.userSurname}`,
            image: teacherImage, 
          }}
        />
      ))}
    </div>
  );
}

export default ClassList;

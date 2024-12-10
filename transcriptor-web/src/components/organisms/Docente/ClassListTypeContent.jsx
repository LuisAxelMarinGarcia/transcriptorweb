// ClassListTypeContent.jsx
import React, { useEffect, useState } from 'react';
import Card from '../Docente/CardTypeContent';
import styles from '../../../assets/style/Docente/ClassListTypeContent.module.css'; 
import teacherImage from "../../../assets/imgs/Avatar Teacher.png";

function ClassList({ classId, status }) {
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

      console.log('[ClassListTypeContent] Parámetros recibidos:', { classId, status });

      if (!classId || !status) {
        setError('No se han proporcionado los parámetros necesarios (classId o status).');
        setLoading(false);
        return;
      }

      const url = `/transcription/all/${encodeURIComponent(classId)}/${encodeURIComponent(status)}`;

      console.log(`[ClassListTypeContent.jsx] Fetching transcriptions from: ${url}`);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
          setTranscriptions(data.data);
        } else {
          setError(data.message || 'Error al obtener las transcripciones.');
        }
      } catch (err) {
        console.error('[ClassListTypeContent.jsx] Error al obtener transcripciones:', err);
        setError('Error de conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptions();
  }, [classId, status]);

  const handleDeleteTranscription = async (transcriptionId) => {
    const token = getToken();
    if (!token) {
      alert('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    // Usar ruta relativa como en el ejemplo de HomeTemplate.jsx
    // Nueva ruta según la petición del usuario (sin body, método PUT)
    const url = `/transcription/${encodeURIComponent(transcriptionId)}/ELIMINADO`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          // Igual que en HomeTemplate.jsx
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        // No se envía body, ya que solo se cambia el estado con la URL
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'No se pudo eliminar la transcripción.');
        return;
      }

      // Actualizar el estado local para reflejar el cambio a ELIMINADO
      setTranscriptions((prev) =>
        prev.map((t) =>
          t.transcriptionId === transcriptionId ? { ...t, transcriptionStatus: 'ELIMINADO' } : t
        )
      );
      alert('La transcripción se ha marcado como ELIMINADA.');
    } catch (error) {
      console.error('Error al cambiar estado de la transcripción:', error);
      alert('Error al cambiar estado de la transcripción.');
    }
  };

  if (loading) {
    return <p className={styles.loading}>Cargando transcripciones...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  if (!transcriptions || transcriptions.length === 0) {
    return <p className={styles.noData}>No hay transcripciones disponibles.</p>;
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
          fileType={transcription.transcriptionType === 'MATERIAL' ? 'image' : ''}
          author={{
            name: `${transcription.userName} ${transcription.userSurname}`,
            image: teacherImage,
          }}
          onDelete={() => handleDeleteTranscription(transcription.transcriptionId)}
        />
      ))}
    </div>
  );
}

export default ClassList;

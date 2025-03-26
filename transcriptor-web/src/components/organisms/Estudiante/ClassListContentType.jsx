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

    // 1. Integrar la función convertirFecha
    function convertirFecha(fechaStr) {
      const partes = fechaStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{2}):(\d{2}) (a\.m\.|p\.m\.)/);
      
      if (!partes) {
        console.error(`Formato de fecha inválido: ${fechaStr}`);
        return new Date(0); // Retorna una fecha muy antigua para evitar errores en el sort
      }
      
      const dia = parseInt(partes[1], 10);
      const mes = parseInt(partes[2], 10) - 1; // Meses en Date van de 0 a 11
      const anio = parseInt(partes[3], 10);
      let hora = parseInt(partes[4], 10);
      const minutos = parseInt(partes[5], 10);
      const segundos = parseInt(partes[6], 10);
      const esPM = partes[7].toLowerCase().includes("p.m.");
  
      if (esPM && hora !== 12) hora += 12; // Convertir PM a formato 24 horas
      if (!esPM && hora === 12) hora = 0; // Ajustar 12 AM a 00 horas
  
      return new Date(anio, mes, dia, hora, minutos, segundos);
    }  

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

      //console.log(`[ClassList.jsx] Fetching transcriptions from: ${url}`);

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
          // Filtrado en base a typeFilter AQUI AÑADI LOG
          let filteredTranscriptions = data.data || [];
          //console.log("Transcripciones recibidas:", filteredTranscriptions);
          if (typeFilter === 'MATERIAL') {
            filteredTranscriptions = filteredTranscriptions.filter(t => t.transcriptionType === 'MATERIAL');
          } else if (typeFilter === 'TRANSCRIPCION') {
            filteredTranscriptions = filteredTranscriptions.filter(t => t.transcriptionType === 'TRANSCRIPCION');
          }

          // 3. Ordenar el arreglo por fecha y hora recientes (descendente) utilizando convertirFecha
          filteredTranscriptions.sort((a, b) => convertirFecha(b.transcriptionDate) - convertirFecha(a.transcriptionDate));
          //console.log("Datos ordenados:", filteredTranscriptions);
          //console.log("weyyyyyy")

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
          date={transcription.transcriptionDate.split(',')[0]}
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

// ClassListTypeContent.jsx
import React, { useEffect, useState } from 'react';
import Card from '../Docente/CardTypeContent';
import styles from '../../../assets/style/Docente/ClassListTypeContent.module.css'; 
import teacherImage from "../../../assets/imgs/Avatar Teacher.png";
import dayjs from 'dayjs';


function ClassList({ classId, status, typeFilter = 'all' }) {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('token');

  const newTranscription = {
    classDate: "26-01-25",
    classGrade: "2",
    classGroup: "C",
    classId: "22fc1e48-4098-45dd-bd69-d0d14d00b89a",
    className: "PUPUPU",
    classNumberOfStudents: 1,
    classStatus: "NO ARCHIVADO",
    transcriptionDate: "26/1/2025, 7:14:55 p.m.",
    transcriptionDescription: "JSDKJDSKDS",
    transcriptionId: "dcb4f790-843e-4495-92fe-df47971f0727",
    transcriptionStatus: "DISPONIBLE",
    transcriptionTitle: "Agregado interno",
    transcriptionType: "MATERIAL",
    transcriptionUrl: "http://localhost:5173/docente-crear-material",
    userEmail: "favalde@hotmail.com",
    userId: "c134eba4-4c39-4c45-a43c-ef071889d63b",
    userName: "Fabian",
    userRole: "MAESTRO",
    userSurname: "Valdivia Puchuri"
  };

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

      //console.log('[ClassListTypeContent] Parámetros recibidos:', { classId, status, typeFilter });

      if (!classId || !status) {
        setError('No se han proporcionado los parámetros necesarios (classId o status).');
        setLoading(false);
        return;
      }

      const url = `/transcription/all/${encodeURIComponent(classId)}/${encodeURIComponent(status)}`;

      //console.log(`[ClassListTypeContent.jsx] Fetching transcriptions from: ${url}`);

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
          // Filtrar según typeFilter
          let filteredData = data.data;
          //console.log("Transcripciones recibidas de filteredData:", filteredData);
          if (typeFilter && typeFilter.toUpperCase() !== 'ALL') {
            filteredData = filteredData.filter(item => item.transcriptionType === typeFilter.toUpperCase());
          }
          //console.log("Datos originales en filteredData:", filteredData);

           // 3. Ordenar el arreglo por fecha y hora recientes (descendente) utilizando convertirFecha
           filteredData.sort((a, b) => convertirFecha(b.transcriptionDate) - convertirFecha(a.transcriptionDate));
          //console.log("Datos ordenados:", filteredData);
          //console.log("weyyyyyy")
          filteredData.push(newTranscription)
          

          setTranscriptions(filteredData);
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
  }, [classId, status, typeFilter]);

  const handleDeleteTranscription = async (transcriptionId) => {
    const token = getToken();
    if (!token) {
      alert('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      return;
    }

    const url = `/transcription/${encodeURIComponent(transcriptionId)}/ELIMINADO`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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
          date={transcription.transcriptionDate.split(',')[0]}
          type={transcription.transcriptionType}
          link={transcription.transcriptionUrl}
          fileType={transcription.transcriptionType === 'MATERIAL' ? 'image' : 'pdf'} // Actualizado para manejar PDF
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

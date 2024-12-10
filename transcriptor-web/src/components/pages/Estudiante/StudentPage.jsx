// src/components/pages/Estudiante/StudentPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import StudentTemplate from '../../templates/Estudiante/StudentTemplate';
import StudentView from '../../organisms/StudentView';
import styles from '../../../assets/style/Estudiante/VerTranscripcion.module.css'; // Asegúrate de que esta ruta sea correcta

const StudentPage = () => {
  const { classId } = useParams(); // Obtener classId desde la URL
  const location = useLocation();   // Obtener el estado de la navegación
  const navigate = useNavigate();   // Hook para navegación si es necesario

  // Extraer datos de la clase desde location.state
  const { state } = location;
  
  // Validar que los datos de la clase estén presentes
  if (!state || 
      !state.name || 
      !state.students || 
      !state.teacherName || 
      !state.status) {
    console.error('[StudentPage.jsx] No se proporcionaron todos los datos de la clase en el estado de navegación.');
    return <p className={styles.errorMessage}>Error: No se proporcionaron datos de la clase.</p>;
  }

  const { name, students, teacherName, status } = state;

  // Estados locales
  const [transcript, setTranscript] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Conectar al servidor Socket.IO
    socketRef.current = io('http://localhost:4000');

    // Unirse a la clase específica
    socketRef.current.emit('joinClass', classId);

    // Escuchar el evento 'transcript' para recibir datos de transcripción
    socketRef.current.on('transcript', (data) => {
      setTranscript(data);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [classId]); // Asegurarse de que useEffect se ejecute cuando classId cambie

  return (
    <StudentTemplate>
      <StudentView
        title={`${name} - Grupo`}  // Usar datos del estado
        teacherName={teacherName}  // Usar datos del estado
        studentCount={students}    // Usar datos del estado
        transcriptionText={transcript} // Transcripción recibida vía Socket.IO
      />
    </StudentTemplate>
  );
};

export default StudentPage;

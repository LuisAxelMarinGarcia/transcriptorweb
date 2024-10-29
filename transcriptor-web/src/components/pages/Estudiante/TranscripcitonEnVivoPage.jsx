// StudentPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import StudentTemplate from '../../templates/StudentTemplate';
import StudentView from '../../organisms/StudentView';

const StudentPage = () => {
  const [transcript, setTranscript] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    socketRef.current.on('transcript', (data) => {
      setTranscript(data);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <StudentTemplate>
      <StudentView
        title="7B - Minería de datos"
        teacherName="Horacio Irán Solís Cisneros"
        studentCount={22}
        transcriptionText={transcript}
      />
    </StudentTemplate>
  );
};

export default StudentPage;

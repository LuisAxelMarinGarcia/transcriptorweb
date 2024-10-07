import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function Viewer() {
  const [transcript, setTranscript] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    // Conectar al servidor Socket.IO
    socket.current = io('http://localhost:4000');

    // Escuchar eventos de 'transcript'
    socket.current.on('transcript', (data) => {
      setTranscript(data);
    });

    // Limpiar al desmontar el componente
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Visualizador de Transcripción</h1>
      <div style={styles.transcriptContainer}>
        <p style={styles.transcriptText}>{transcript}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
    marginTop: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  transcriptContainer: {
    marginTop: '16px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
    minHeight: '200px',
  },
  transcriptText: {
    fontSize: '18px',
    color: '#333',
  },
};

export default Viewer;

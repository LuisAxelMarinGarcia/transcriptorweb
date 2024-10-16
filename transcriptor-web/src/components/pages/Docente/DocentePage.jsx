// RecordingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../organisms/HeaderEnVivoDocente';
import Footer from '../../organisms/Footer';
import RecordingView from '../../organisms/RecordingView';
import { io } from 'socket.io-client';

const RecordingPage = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState('2:38:20');

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const socketRef = useRef(null);

  // Nuevas referencias para mantener los valores actualizados
  const isListeningRef = useRef(isListening);
  const isPausedRef = useRef(isPaused);

  // Actualizar las referencias cuando cambian los estados
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    // Conectar al servidor Socket.IO
    socketRef.current = io('http://localhost:4000');

    // Verificar si el navegador soporta la API de reconocimiento de voz
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';

        // Procesar solo los nuevos resultados a partir de event.resultIndex
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscriptRef.current += transcriptPart + ' ';
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const fullTranscript = finalTranscriptRef.current + interimTranscript;
        setTranscript(fullTranscript);

        // Emitir el texto transcrito al servidor
        if (socketRef.current) {
          socketRef.current.emit('transcript', fullTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
      };

      recognitionRef.current.onend = () => {
        if (isListeningRef.current && !isPausedRef.current) {
          // Si el reconocimiento se detuvo inesperadamente, lo reiniciamos
          recognitionRef.current.start();
        } else {
          setIsListening(false);
          console.log('Reconocimiento de voz finalizado');
        }
      };
    } else {
      console.error('Este navegador no soporta el reconocimiento de voz.');
      alert(
        'Tu navegador no soporta la Web Speech API. Por favor, usa Google Chrome o Microsoft Edge.'
      );
    }

    // Limpiar al desmontar el componente
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleRecord = () => {
    if (recognitionRef.current && !isListening && !isPaused) {
      finalTranscriptRef.current = '';
      setTranscript('');
      setIsListening(true);
      isListeningRef.current = true; // Actualizar referencia
      setIsPaused(false);
      isPausedRef.current = false; // Actualizar referencia
      recognitionRef.current.start();
    } else if (recognitionRef.current && isPaused) {
      // Reanudar desde pausa
      setIsListening(true);
      isListeningRef.current = true; // Actualizar referencia
      setIsPaused(false);
      isPausedRef.current = false; // Actualizar referencia
      recognitionRef.current.start();
    }
  };

  const handlePause = () => {
    if (recognitionRef.current && isListening) {
      setIsPaused(true);
      isPausedRef.current = true; // Actualizar referencia
      setIsListening(false);
      isListeningRef.current = false; // Actualizar referencia
      recognitionRef.current.stop();
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
      isListeningRef.current = false; // Actualizar referencia
      setIsPaused(false);
      isPausedRef.current = false; // Actualizar referencia
      finalTranscriptRef.current = '';
      setTranscript('');
    }
  };

  return (
    <div>
      <Header />
      <RecordingView
        title="7B - Minería de datos"
        teacherName="Horacio Irán Solís Cisneros"
        studentCount={30}
        time={time}
        onPause={handlePause}
        onRecord={handleRecord}
        onStop={handleStop}
        isListening={isListening}
        isPaused={isPaused}
      />
      <Footer />
    </div>
  );
};

export default RecordingPage;

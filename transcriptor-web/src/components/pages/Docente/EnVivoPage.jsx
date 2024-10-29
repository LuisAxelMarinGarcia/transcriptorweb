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

  // Referencias para mantener los estados actualizados
  const isListeningRef = useRef(isListening);
  const isPausedRef = useRef(isPaused);

  // Referencias para el waveform
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);
  const canvasRef = useRef(null);

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
      stopAudioProcessing(); // Detener el procesamiento de audio
    };
  }, []);

  // Función para iniciar el procesamiento de audio para el waveform
  const startAudioProcessing = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();

      source.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;

      drawWaveform();
    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
    }
  };

  // Función para detener el procesamiento de audio
  const stopAudioProcessing = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Función para dibujar el waveform
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const bufferLength = analyser.frequencyBinCount;

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = '#fff';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#4CAF50';

      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const handleRecord = () => {
    if (recognitionRef.current && !isListening && !isPaused) {
      // Iniciar nueva transcripción
      finalTranscriptRef.current = '';
      setTranscript('');
      setIsListening(true);
      isListeningRef.current = true;
      setIsPaused(false);
      isPausedRef.current = false;
      recognitionRef.current.start();
      startAudioProcessing(); // Iniciar el waveform
    }
  };

  const handlePause = () => {
    if (recognitionRef.current && isListening) {
      // Pausar
      setIsPaused(true);
      isPausedRef.current = true;
      setIsListening(false);
      isListeningRef.current = false;
      recognitionRef.current.stop();
      stopAudioProcessing(); // Detener el waveform
    } else if (recognitionRef.current && isPaused) {
      // Reanudar
      setIsPaused(false);
      isPausedRef.current = false;
      setIsListening(true);
      isListeningRef.current = true;
      recognitionRef.current.start();
      startAudioProcessing(); // Reanudar el waveform
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
      isListeningRef.current = false;
      setIsPaused(false);
      isPausedRef.current = false;
      finalTranscriptRef.current = '';
      setTranscript('');
      stopAudioProcessing(); // Detener el waveform
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
        canvasRef={canvasRef} // Pasamos el canvasRef a RecordingView
      />
      <Footer />
    </div>
  );
};

export default RecordingPage;

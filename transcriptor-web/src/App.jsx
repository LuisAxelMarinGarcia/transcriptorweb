import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(''); // Mantiene el texto final acumulado

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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

        setTranscript(finalTranscriptRef.current + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
      };

      recognitionRef.current.onend = () => {
        if (isListening && !isPaused) {
          // Si el reconocimiento se detuvo inesperadamente, lo reiniciamos
          recognitionRef.current.start();
        } else {
          setIsListening(false);
          console.log('Reconocimiento de voz finalizado');
        }
      };
    } else {
      console.error('Este navegador no soporta el reconocimiento de voz.');
      alert('Tu navegador no soporta la Web Speech API. Por favor, usa Google Chrome o Microsoft Edge.');
    }

    // Limpiar al desmontar el componente
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []); // Solo una vez al montar el componente

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      finalTranscriptRef.current = ''; // Reiniciar el texto final acumulado
      setTranscript(''); // Reiniciar el texto transcrito al iniciar
      setIsListening(true);
      setIsPaused(false);
      recognitionRef.current.start();
    }
  };

  const pauseListening = () => {
    if (recognitionRef.current && isListening) {
      setIsPaused(true);
      setIsListening(false);
      recognitionRef.current.stop();
    } else if (recognitionRef.current && isPaused) {
      setIsPaused(false);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
      setIsPaused(false);
      finalTranscriptRef.current = ''; // Reiniciar el texto final acumulado
      setTranscript(''); // Reiniciar el texto transcrito al detener
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Transcriptor en Tiempo Real</h1>
      <div style={styles.buttonContainer}>
        <button onClick={startListening} style={styles.button} disabled={isListening || isPaused}>
          Iniciar
        </button>
        <button onClick={pauseListening} style={styles.button} disabled={!isListening && !isPaused}>
          {isPaused ? 'Reanudar' : 'Pausar'}
        </button>
        <button onClick={stopListening} style={styles.button} disabled={!isListening && !isPaused}>
          Detener
        </button>
      </div>
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
  buttonContainer: {
    marginBottom: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 5px',
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

export default App;

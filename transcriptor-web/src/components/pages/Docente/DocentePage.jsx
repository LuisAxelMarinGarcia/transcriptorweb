import React, { useState } from 'react';
import Header from '../../organisms/HeaderEnVivoDocente';
import Footer from '../../organisms/Footer';
import RecordingView from '../../organisms/RecordingView';

const RecordingPage = () => {
  const [time, setTime] = useState("2:38:20");

  const handlePause = () => {
    // Lógica para pausar grabación
  };

  const handleRecord = () => {
    // Lógica para iniciar grabación
  };

  const handleStop = () => {
    // Lógica para detener grabación
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
      />
      <Footer />
    </div>
  );
};

export default RecordingPage;
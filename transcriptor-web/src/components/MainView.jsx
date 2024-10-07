import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './MainView.css';

const MainView = () => {
  return (
    <div className="main-view">
      <Sidebar /> {/* Barra lateral siempre visible */}
      <div className="main-content">
        <Header />

        {/* Sección azul con el título de la clase */}
        <section className="class-info">
          <div className="class-info-content">
            <h1>7B - Minería de datos</h1>
            <div className="participants">
              <img src="/src/assets/users.png" alt="Usuarios" /> 22
            </div>
          </div>
        </section>

        <div className="info-section">
          <div className="name-section">
            <h2>HORACIO IRÁN SOLÍS CISNEROS</h2>
          </div>
          <div className="live-code-section">
            <span>Código del en vivo: O1X23FDSD</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="content">
          <div className="audio-visual">
            <div className="microphone">
              <img src="/src/assets/vecteezy_neumorphic-microphone-icon-neumorphism-ui-button_11893965.png" alt="Micrófono" />
            </div>
            <div className="waveform">
              <img src="/src/assets/waveform.png" alt="Visualización de audio" />
            </div>
          </div>
          <span>Escuchando....</span>
          <span>2:38:20</span>

          <div className="controls">
            <button className="control-btn">
              <img src="/src/assets/boton-de-pausa.png" alt="Pausar" />
            </button>
            <button className="control-btn">
              <img src="/src/assets/boton-de-grabacion.png" alt="Grabar" />
            </button>
            <button className="control-btn">
              <img src="/src/assets/detener.png" alt="Detener" />
            </button>
          </div>
        </div>

        <Footer /> {/* Footer agregado */}
      </div>
    </div>
  );
};

export default MainView;

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="left-section">
        <img src="/src/assets/transcribeme-logo.png" alt="Transcribeme" className="logo" />
      </div>

      <div className="right-section">
        <div className="live-status">
          <button className="live-button">
            <img src="/src/assets/transmision-en-vivo.png" alt="Transmisión en vivo" />
            <span>Transmitiendo en vivo</span>
          </button>
          <img src="/src/assets/avatar.png" alt="Usuario" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;

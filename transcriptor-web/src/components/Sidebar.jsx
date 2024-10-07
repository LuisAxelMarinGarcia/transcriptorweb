import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="menu-icon">
        <img src="/src/assets/hamburguesa.png" alt="Menú" />
      </button>
      <nav className="nav-menu">
        <ul>
          <li>
            <img src="/src/assets/Home.png" alt="Inicio" />
          </li>
          <li>
            <img src="/src/assets/plus.png" alt="Agregar" />
          </li>
          <li>
            <img src="/src/assets/folder.png" alt="Carpeta" />
          </li>
          <li>
            <img src="/src/assets/exit.png" alt="Cerrar sesión" />
          </li>
          <li>
            <img src="/src/assets/Help.png" alt="Ayuda" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

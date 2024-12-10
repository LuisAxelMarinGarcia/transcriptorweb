import React, { useState } from 'react';
import styles from '../../../assets/style/Docente/SidebarGenericoDocente.module.css';
import { Link } from 'react-router-dom'; 

const SideBarGnerico = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Cambia el estado para mostrar/ocultar el texto
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>

            <img src="/src/assets/hamburguesa.png" alt="Menú" onClick={toggleSidebar} className={styles.menuButton}/>
            
            <ul>
                <li>
                    <Link to="/home-docente">
                    <img src="/src/assets/Home.png" alt="Inicio" />
                    
                    </Link >
                </li>
                <li>
                    <Link to="/docente-clases-archivadas">
                    <img src="/src/assets/folder1.png" alt="Clases Archivadas" />
                    
                    </Link>
                </li>
                <li>
                    <Link to="/login-docente">
                    <img src="/src/assets/exit4.png" alt="Cerrar sesión" />
                    
                    </Link>
                </li>
                <li>
                    <a href="/ayuda">
                    <img src="/src/assets/Help.png" alt="Ayuda" />
                    
                    </a>
                </li>
            </ul>

            {isOpen && (
                <div className={styles.expandableSection}>
                    <ul>
                        <li><Link to="/home-docente">Inicio</Link></li>
                        <li><Link to="/docente-clases-archivadas">Clases archivadas</Link></li>
                        <li><Link to="/login-docente">Cerrar sesión</Link></li>
                        <li><a href="/ayuda">Ayuda</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SideBarGnerico;
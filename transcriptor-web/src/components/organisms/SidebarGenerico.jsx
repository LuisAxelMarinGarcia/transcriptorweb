import React, { useState } from 'react';
import styles from '../../assets/style/SidebarGenerico.module.css';

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
                    <a href="/dashboard">
                    <img src="/src/assets/Home.png" alt="Inicio" />
                    
                    </a>
                </li>
                <li>
                    <a href="/clases-archivadas">
                    <img src="/src/assets/folder1.png" alt="Clases Archivadas" />
                    
                    </a>
                </li>
                <li>
                    <a href="/cerrar-sesion">
                    <img src="/src/assets/exit4.png" alt="Cerrar sesión" />
                    
                    </a>
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
                        <li><a href="/dashboard">Inicio</a></li>
                        <li><a href="/clases-archivadas">Clases archivadas</a></li>
                        <li><a href="/cerrar-sesion">Cerrar sesión</a></li>
                        <li><a href="/ayuda">Ayuda</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SideBarGnerico;
import React, { useState } from 'react';
import styles from '../../../assets/style/Estudiante/SidebarGenericoEstudiante.module.css';
import { Link } from 'react-router-dom';

const SideBarGnerico = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Cambia el estado para mostrar/ocultar el texto
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (event) => {
            setIsOpen2(!isOpen2)
        }
    
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''} ${isOpen2 ? styles.ExpandableSB : ''}`}  onClick={handleClick}>

            <img src="/src/assets/hamburguesa.png" alt="Menú" onClick={toggleSidebar} className={styles.menuButton}/>
            
            <ul>
                <li>
                    <Link to="/home-estudiante">
                    <img src="/src/assets/Home.png" alt="Inicio" />
                    
                    </Link>
                </li>
                <li>
                    <Link to="/estudiante-unirme-a-una-clase">
                    <img src="/src/assets/Plus1.png" alt="Unirme a una clase" />
                    
                    </Link>
                </li>
                <li>
                    <Link to="/estudiante-clases-archivadas">
                    <img src="/src/assets/folder1.png" alt="Clases Archivadas" />
                    
                    </Link>
                </li>
                <li>
                    <Link to="/login-estudiante">
                    <img src="/src/assets/exit4.png" alt="Cerrar sesión" />
                    
                    </Link>
                </li>
                <li>
                    <a href="/public/Manual de Usuario (Docente y Alumno).pdf" target="_blank">
                    <img src="/src/assets/Help.png" alt="Ayuda" />
                    
                    </a>
                </li>
            </ul>

            {isOpen && (
                <div className={styles.expandableSection}>
                    <ul>
                        <li><Link to="/home-estudiante">Inicio</Link></li>
                        <li><Link to="/estudiante-unirme-a-una-clase">Unirme a una clase</Link></li>
                        <li><Link to="/estudiante-clases-archivadas">Clases archivadas</Link></li>
                        <li><Link to="/login-estudiante">Cerrar sesión</Link></li>
                        <li><a href="/public/Manual de Usuario (Docente y Alumno).pdf" target="_blank">Ayuda</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SideBarGnerico;
import Footer from '../organisms/Footer';
import styles from '../../assets/style/TemplateLogin.module.css'; 
import LogoTranscriMe from '../../assets/imgs/logo.png';
import UserDeco from '../../assets/imgs/StudentDeco.png';

import LoginFormEstudiante from '../organisms/Estudiante/LoginForm';
import LoginFormDocente from '../organisms//Docente/LoginForm';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const LoginTemplate = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const isAlumno = location.pathname === '/login-estudiante';

    // Maneja la navegación cuando se cambia el formulario
    const handleFormSwitch = (isStudent) => {
        if (isStudent) {
            navigate('/login-estudiante');
        } else {
            navigate('/login-docente');
        }
    };

    
    return (

        <>
            <div className={styles.ContainerCompleto}>

                <div className={styles.ContainerPadre} >
                    <div className={styles.child1}>
                        {isAlumno ? (
                            <LoginFormEstudiante onSwitchForm={() => handleFormSwitch(false)} />
                        ) : (
                            <LoginFormDocente onSwitchForm={() => handleFormSwitch(true)} />
                        )}
                    </div>
                    <div className={styles.child2}>
                        <img src={LogoTranscriMe} alt="" className={styles.ImgLogo} />
                        <img src={UserDeco} alt="" className={styles.ImgUserDeco} />
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
  };
  
  export default LoginTemplate;
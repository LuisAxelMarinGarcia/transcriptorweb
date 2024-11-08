import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplatePersonasClase.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ListaPersonas from '../../organisms/Estudiante/ClassListPersonas';


const HomeTemplate = ({ title, studentCount, teacherName}) => {

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>
                
                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header view="Clase-unirme-a-transcripcion"/>
                    </div>
                    
                    <div className={styles.OtherContainer}>

                        <div className={styles.HeaderClass}>
                            <HeaderDeClase
                                    title={title}
                                    studentCount={studentCount}
                                    teacherName={teacherName}
                            />
                        </div>

                        <div className={styles.SecctionPersons}>
                            {/* Sección de Docente */}
                            <div className={styles.TitlePerson}>
                                <h1>Docente</h1>
                            </div>
                            
                            {/* Sección de Docente */}
                            <ListaPersonas type="docente" />

                            <div className={styles.TitlePerson}>
                                <h1>Alumnos</h1>
                            </div>
                            
                            {/* Sección de Alumnos */}
                            <ListaPersonas type="alumno" />

                        </div>
                        

                    
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default HomeTemplate;
import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplatePersonasClase.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ListaPersonas from '../../organisms/Estudiante/ClassListPersonas';

const HomeTemplate = ({ title, studentCount, teacherName, classId, classGroup, codeClass }) => {
    console.log('[EPersonasClaseTemplate.jsx] Props recibidas:', { title, studentCount, teacherName, classId, classGroup, codeClass });

    return (
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                    <SidebarGenerico />
                </div>

                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header view="Clase-personas" />
                    </div>

                    <div className={styles.OtherContainer}>

                        <div className={styles.HeaderClass}>
                            <HeaderDeClase
                                title={title}
                                studentCount={studentCount}
                                teacherName={teacherName}
                                classGroup={classGroup}
                                codeClass={codeClass}
                            />
                        </div>

                        <div className={styles.SecctionPersons}>
                            {/* Sección de Docentes */}
                            <div className={styles.TitlePerson}>
                                <h1>Docentes</h1>
                            </div>

                            {/* Lista de Docentes */}
                            <ListaPersonas type="docente" classId={classId} teacherName={teacherName} />

                            {/* Sección de Alumnos */}
                            <div className={styles.TitlePerson}>
                                <h1>Alumnos</h1>
                            </div>

                            {/* Lista de Alumnos */}
                            <ListaPersonas type="alumno" classId={classId} />

                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default HomeTemplate;

import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplateHomeClase.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ClassListTypeContent from '../../organisms/Estudiante/ClassListContentType';

const EMaterialDidacticoTemplate = ({ title, studentCount, teacherName, classId, status, classGroup, codeClass }) => {

    //console.log('[EMaterialDidacticoTemplate.jsx] Props recibidos:', { classId, title, studentCount, teacherName, status, classGroup, codeClass });

    return (
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                    <SidebarGenerico />
                </div>
                
                <div className={styles.container}>

                    <div className={styles.HeaderContainer}>
                        <Header
                            view="Clase-unirme-a-transcripcion" // Asegúrate de que este valor coincida con la lógica del modal
                            classId={classId}
                            name={title}
                            students={studentCount}
                            teacherName={teacherName}
                            status={status} // Estado normalizado
                        />
                    </div>
                    
                    <div className={styles.OtherContainer}>

                        <div className={styles.HeaderClass}>
                            <HeaderDeClase
                                title={title}
                                studentCount={studentCount}
                                teacherName={teacherName}
                                classGroup={classGroup} // Opcional
                                codeClass={codeClass}     // Opcional
                            />
                        </div>
                        
                        <div className={styles.ContainerCards}>
                            <ClassListTypeContent 
                                typeFilter="MATERIAL" // Filtrar para mostrar solo materiales
                                classId={classId}     // Pasar classId (UUID)
                                status={status}       // Pasar status normalizado
                            />
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default EMaterialDidacticoTemplate;

import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplateHomeClase.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ClassListTypeContent from '../../organisms/Estudiante/ClassListContentType';


const HomeTemplate = ({ title, studentCount, teacherName}) => {

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>
                
                <div className={styles.container}>
                    <Header view="Clase-unirme-a-transcripcion"/>
                    
                    <div className={styles.OtherContainer}>

                        <div className={styles.HeaderClass}>
                            <HeaderDeClase
                                    title={title}
                                    studentCount={studentCount}
                                    teacherName={teacherName}
                            />
                        </div>
                        
                        <div className={styles.ContainerCards}>
                            <ClassListTypeContent typeFilter="all"/>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default HomeTemplate;
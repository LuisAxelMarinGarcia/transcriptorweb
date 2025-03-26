import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplateHomeClase.module.css'

import Footer from "../../organisms/Footer";

import HeaderDeClase from '../../organisms/Estudiante/HeaderHomeMateria';
import ClassListTypeContent from '../../organisms/Estudiante/ClassListContentType';

const EHomeMateria = ({ title, studentCount, teacherName, classId, status, classStatus }) => {
  //console.log('[EHomeMateria.jsx] Props recibidos:', { title, studentCount, teacherName, classId, status, classStatus });

  return (
    <div className={styles.flex}>
      <div className={styles.SpaceSiderbar}>
        <SidebarGenerico />
      </div>

      <div className={styles.container}>
        <div className={styles.HeaderContainer}>
          <Header
            view="Clase-unirme-a-transcripcion"
            classId={classId}
            name={title}
            students={studentCount}
            teacherName={teacherName}
            status={status}
            classStatus={classStatus}
          />
        </div>

        <div className={styles.OtherContainer}>
          <div className={styles.HeaderClass}>
            <HeaderDeClase
              title={title}
              studentCount={studentCount}
              teacherName={teacherName}
              classStatus={classStatus}
            />
          </div>

          <div className={styles.ContainerCards}>
            <ClassListTypeContent 
              classId={classId}
              status={status}
              typeFilter="all" // Ajustar filtro si es necesario
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default EHomeMateria;
